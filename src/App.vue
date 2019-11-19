<template>
  <v-app>
    <v-app-bar app >
      <div class="d-flex align-center">
        <v-toolbar-title>Maureen Duff ~ Casting</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn>Info</v-btn>
        <v-btn>CV</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <v-carousel cycle hide-delimiters show-arrows-on-hover style="height:170px;background: #000;" >
        <v-carousel-item v-for="(slide, i) in inSlideShow(cv)" :key="i" hide-delimiters >
          <div style="top:0;white-space: nowrap; background: #000;">
            <span v-for="(l, k) in holes" :key="k" style="background: #fff; border-radius: 5px; width:15px; height:15px; margin:11px 15px 0 0 ;display: inline-block;" >
            </span>
          </div>
          <v-sheet>
            <v-row style="height:100px" align="center" justify="center" >
             <div class="display-3">{{ slide.name }}</div>
            </v-row>
          </v-sheet>
          <div style="bottom:0;white-space: nowrap; background: #000;">
            <span v-for="(l, k) in holes" :key="k" style="background: #fff; border-radius: 5px; width:15px; height:15px; margin:11px 15px 0 0 ;display: inline-block;" >
            </span>
          </div>
        </v-carousel-item>
      </v-carousel>

      <div style="margin:10px"  v-for="(Category, i) in Categories" :key="i" >
        <h2>{{Category}}</h2>
        <v-sheet dark>
          <v-data-table :headers="cvHeaders" :items="cvfilter(cv,Category)" :items-per-page="allImportant(cvfilter(cv,Category))">
            <template v-slot:item.Link="{ item }">
              <a class="imdb" v-if="item.Link" :href="item.Link" target="imdb" :title="item.name">IMDb</a>
            </template>
          </v-data-table>
        </v-sheet>
      </div>
    </v-content>
    <v-footer  v-bind="localAttrs" padless >
      <v-card dark flat tile width="100%" class="lighten-1 text-center"
      >
        <v-card-text>
          <a href="https://www.pushtable.com/dashboard">Content Management</a> |
          <a href="https://console.firebase.google.com">Hosting</a> |
          <a href="https://github.com/marcus7777/duffcasting">Source Code</a>
        </v-card-text>

        <v-divider></v-divider>

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
        if (p.Categories.replace(/^\d+/g,"") === cat) {
          a.push(p)
        }
        return a
      }, [])
    },
    inSlideShow(cv) {
      return cv.reduce((a, p) => {
        if (p.Slide_Show) {
          a.push(p)
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
  },
  data() {
    this.getData(data => {
      this.data = data
      this.cv = Object.keys(data.cv).map(k => {
        return data.cv[k]
      }).sort((a, b) => {
        return +a.Year < +b.Year
      })
      this.Categories = Object.keys(this.cv.reduce((a, p) => {
        a[p.Categories] = 1
        return a
      }, {})).sort().map(p => p.replace(/^\d+/g,""))

    })
    return {
      data: {},
      cv: [],
      Categories: [],
      cvHeaders: [
        {text:"Project",value:"name"},
        {text:"Director", value:"Director"},
        {text:"Producer", value:"Producer"},
        {text:"Actors", value:"Actors"},
        {text:"", value:"Link"},
        {text:"",value:"Notes"},
      ],
      holes: Array(99),
    }
  },
};
</script>
