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
      <v-carousel cycle hide-delimiters show-arrows-on-hover style="height:80vh;background: #000;" >
        <v-carousel-item v-for="(slide, i) in images" :key="i" hide-delimiters >
          <div style="top:0;white-space: nowrap; background: #000;">
            <span v-for="(l, k) in images" :key="k" style="background: #fff; border-radius: 1vh; width:7vh; height:7vh; margin:3.5vh;display: inline-block;" >
            </span>
          </div>
          <v-sheet>
            <v-row style="height:calc(59vh - 50px)" align="center" justify="center" >
             <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
          <div style="bottom:0;white-space: nowrap; background: #000;">
            <span v-for="(l, k) in images" :key="k" style="background: #fff; border-radius: 1vh; width:7vh; height:7vh; margin:3.5vh;display: inline-block;" >
            </span>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      images: [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32 ]
    }
  },
};
</script>
