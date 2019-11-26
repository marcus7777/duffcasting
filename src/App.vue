<template>
  <v-app v-if="open">
    <v-app-bar flat app height="100">
      <v-img max-width=300 height=60 src="@/assets/MureenDuffCasting.svg" title="Maureen Duff ~ Casting" />

      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <router-link v-for="(l, k) in menu" :key="k" :to="toPath(l.menu)">{{l.menu}}</router-link>
      </div>
    </v-app-bar>

    <v-content>
      <v-carousel v-if='$route.path !== "/cv"' cycle hide-delimiters show-arrows-on-hover style="height:320px;background: #FFF;" >
        <v-carousel-item reverse-transition="fade-transition" transition="fade-transition" v-for="(slide, i) in inSlideShow(cv)" :key="i" hide-delimiters >
          <v-img contain height=320 :src="slide" />
        </v-carousel-item>
      </v-carousel>
      <v-card-text>
        <div v-html="getPage($route.path)" />
      </v-card-text>
      <div v-if='$route.path === "/cv"'>
        <div style="margin:10px" v-for="(Category, i) in Categories" :key="i" >
          <h2>{{Category}}</h2>
          <v-sheet dark>
            <v-data-table :headers="cvHeaders" :items="cvfilter(cv,Category)" :items-per-page="allImportant(cvfilter(cv,Category))">
              <template v-slot:item.Link="{ item }">
                <a class="imdb" v-if="item.Link" :href="item.Link" target="imdb" :title="item.name">IMDb</a>
              </template>
            </v-data-table>
          </v-sheet>
        </div>
      </div>
    </v-content>
    <v-footer v-bind="localAttrs" padless >
      <v-card dark flat tile width="100%" class="lighten-1 text-center">
        <v-card-text>
          <a href="https://www.pushtable.com/dashboard">Content Management</a> |
          <a href="https://console.firebase.google.com">Hosting</a> |
          <a href="https://github.com/marcus7777/duffcasting">Source Code</a>
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text">
           © {{ new Date().getFullYear() }} ~ <strong>Maureen Duff</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods: {
    cvfilter(cv, cat) {
      return cv.reduce((a, p) => {
        if (p && p.Categories && p.Categories.replace(/^\d+/g,"") === cat) {
          a.push(p)
        }
        return a
      }, [])
    },
    inSlideShow(cv) {
      return cv.reduce((a, p) => {
        if (p.Slide_Show) {
          if (p.Poster_1) {
            a.push(p.Poster_1)
          }
          if (p.Poster_2) {
            a.push(p.Poster_2)
          }
          if (p.Poster_3) {
            a.push(p.Poster_3)
          }
        }
        return a
      }, [])
    },
    allImportant(cv) {
      return cv.reduce((a, p, i) => {
        if (p.Important) {
          a = Math.max(a,(i+1))
        }
        return a
      }, 5)
    },
    toPath(name) {
      return name.replace(" ","-").toLowerCase()
    },
    getPage(path) {
      if (this.loadedData && this.loadedData.pages) {
        return Object.keys(this.loadedData.pages).reduce((a, page) => {
          if ("/" + this.toPath(this.loadedData.pages[page].name) === path && this.loadedData.pages[page].content ) {
            a = this.loadedData.pages[page].content
          }
          return a
        }, "")
      } else {
        return ""
      }
    },
  },
  computed: {
    Categories: function (){
      if (this.cv) {
        return Object.keys(this.cv.reduce((a, p) => {
          a[p.Categories] = 1
          return a
        }, {})).sort().map(p => p.replace(/^\d+/g,""))
      } else {
        return []
      }
    },
    menu: function () {
      if (this.loadedData && this.loadedData.pages) {
        return Object.keys(this.loadedData.pages).map(k => {
          return this.loadedData.pages[k]
        }).sort((a, b) => {
          return +a.priority < +b.priority
        }).reduce((a, b) => {
          if (b.menu) {
            a.push(b)
          }
          return a
        },[])
      } else {
        return []
      }
    },
    cv: function () {
      if (this.loadedData) {
        return Object.keys(this.loadedData.cv).map(k => {
          return this.loadedData.cv[k]
        }).sort((a, b) => {
          return +a.Year < +b.Year
        })
      } else {
        return []
      }
    },
  },
  data() {
    this.getData(data => {
      this.loadedData = data
    })
    let open = true
    if (window.location.hash === "#open") {
      open = true
    }
    return {
      open,
      pages: [],
      data: {},
      cvHeaders: [
        {text:"Project",value:"name"},
        {text:"Director", value:"Director"},
        {text:"Producer", value:"Producer"},
        {text:"Actors", value:"Actors"},
        {text:"", value:"Link"},
        {text:"",value:"Notes"},
      ],
    }
  },
};
</script>
