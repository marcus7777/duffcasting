<template>
  <v-app>
    <v-app-bar flat app height="110" style="z-index:1000">
      <router-link to="/" style="height: 110px;width: 300px;" >
        <v-img max-width=300 height=110 src="@/assets/MureenDuffCasting.svg" title="Maureen Duff ~ Casting" />
      </router-link>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <router-link style="font-size: calc(2vmin + 5px);" v-for="(l, k) in menu" :key="k" :to="toPath(l.menu)">{{l.menu}}</router-link>
      </div>
    </v-app-bar>
    <v-content>
      <slider animation="fade" height="57vmin" v-if='($route.path !== "/cv" && $route.path !== "/projects")' :speed="5000" :interval="10000" style="height:57vmin;background: #FFF;" >
        <slider-item width="100%" height="57vmin" v-for="(slide, i) in inSlideShow(cv)" :key="i" hide-delimiters >
          <div style="padding:3px 10px;margin:50vmin 20px 10px;font-size: 3.5vmin;position: absolute;z-index: 100;background: #ffffffa7;">
            <h2> {{slide.title}} </h2>
          </div>
          <v-img :src="slide.pic" contain height="57vmin" style="margin:auto" />
        </slider-item>
      </slider>
      <div v-if='$route.path === "/"'>
        <v-img max-width=100% contain height=30vmin src="@/assets/MureenDuffCasting.svg" title="Maureen Duff ~ Casting" />
      </div>
      <v-card-text style="text-align:justify;max-width:960px;padding-top:50px;margin: auto">
        <v-row v-if="getPageRight($route.path)">
          <v-col sm="6" xs="12">
            <div id="text" v-html="getPage($route.path)" />
          </v-col>
          <v-col sm="6" xs="12">
            <div id="textRight" v-html="getPageRight($route.path)" />
          </v-col>
        </v-row>

        <div v-if="!getPageRight($route.path)" id="text" v-html="getPage($route.path)" />
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
      <div v-if='$route.path === "/projects"'>
        <h2>Projects</h2>
        <v-container class="grey lighten-5">
          <v-row class="mb-6">
            <v-col v-for="(project, k) in projects(cv)" :key="k" sm="4" xs="6" >
              <v-img :title="project.name" height="300" :src="project.Poster_For_Project_Page" />
            </v-col>
          </v-row>
	</v-container>
      </div>

    </v-content>
    <v-footer v-bind="localAttrs" padless >
      <v-card dark flat tile width="100%" class="lighten-1 text-center">
        <v-card-text>
          <a href="https://www.pushtable.com/dashboard">Content</a> |
          <a href="https://console.firebase.google.com">Hosted</a> |
          <a href="https://github.com/marcus7777/duffcasting">Code</a> |
          <span v-for="(l, k) in footer" :key="k"><span v-if="k"> | </span>
            <router-link :to="toPath(l.name)">{{l.name}}</router-link>
          </span>
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
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
  name: 'App',
  components: {
    Slider,
    SliderItem,
  },
  methods: {
    cvfilter(cv, cat) {
      return cv.reduce((a, p) => {
        if (p && p.Categories && p.Categories.replace(/^\d+/g,"") === cat) {
          a.push(p)
        }
        return a
      }, [])
    },
    projects(cv) {
      return cv.reduce((a, p) => {
        if (p && p.Project_page) {
          a.push(p)
        }
        return a
      }, [])
    },
    inSlideShow(cv) {
      return cv.reduce((a, p) => {
        if (p.Slide_Show) {
          if (p.Poster_1) {
            let title = p.Poster_1_title || "99"
            a.push({pic: p.Poster_1, title})
          }
          if (p.Poster_2) {
            let title = p.Poster_2_title || "99"
            a.push({pic: p.Poster_2, title})
          }
          if (p.Poster_3) {
            let title = p.Poster_3_title || "99"
            a.push({pic: p.Poster_3, title})
          }
        }
        return a
      }, []).sort((a, b) => {
        return +((a.title).split(" ")[0]) > +((b.title).split(" ")[0])
      }).map(a => {
        return {
          pic: a.pic,
          title: a.title.replace(/^\d+/g,"")
        }
      })
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
    getPageRight(path) {
      if (this.loadedData && this.loadedData.pages) {
        return Object.keys(this.loadedData.pages).reduce((a, page) => {
          if ("/" + this.toPath(this.loadedData.pages[page].name) === path && this.loadedData.pages[page].content_right ) {
            a = this.loadedData.pages[page].content_right
          }
          return a
        }, "")
      } else {
        return ""
      }
    },
  },
  watch: { 
    cv: function (cv){
      if (cv) {
        this.Categories =  Object.keys(cv.reduce((a, p) => {
          a[p.Categories] = 1
          return a
        }, {})).sort().map(p => p.replace(/^\d+/g,""))
      } else {
        this.Categories = []
      }
    },
    loadedData: function (loadedData) {
      if (loadedData && loadedData.pages) {
        const pages = Object.keys(loadedData.pages).map(k => {
          return loadedData.pages[k]
        }).sort((a, b) => {
          return +a.priority < +b.priority
        })
        this.menu = pages.reduce((a, b) => {
          if (b.menu) {
            a.push(b)
          }
          return a
        },[])
        this.footer = pages.reduce((a, b) => {
          if (!b.menu) {
            a.push(b)
          }
          return a
        },[])
      }
      if (loadedData && loadedData.cv) {
        this.cv = Object.keys(loadedData.cv).map(k => {
          return loadedData.cv[k]
        }).sort((a, b) => {
          return +a.Year < +b.Year
        })
      }
    },
  },
  data() {
    this.getData(data => {
      this.loadedData = data
    })
    return {
      cv: [],
      menu: [],
      pages: [],
      footer: [],
      loadedData: {},
      Categories: [],
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
