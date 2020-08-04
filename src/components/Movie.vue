<template>
  <v-container v-if="loading">
    <div class="text-xs-ce">
      <v-progress-circular
      indeterminate
      :size="150"
      :width="8"
      color="green"
      >
      </v-progress-circular>
    </div>
  </v-container>
  <v-container v-else>
      <v-layout wrap>
          <v-flex xs12 mr-1 ml-1>
            <v-card>
              <v-img :src="singleMovie.Poster" aspect-ratio="2">
              </v-img>
              <v-card-title primary-title>
                <div>
                  <h2 class="headline mb-0">{{singleMovie.Title}}-- {{singleMovie.Year}}</h2>
                  <p>{{singleMovie.Plot}}</p>
                  <h3>Actors: </h3>{{singleMovie.Actors}}
                  <h4>Awards:</h4> {{singleMovie.Awards}}
                  <p>Genrs: {{singleMovie.Genrs}}</p>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn rounded color="green" dark  @click="back">返回</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }"><v-btn v-on="on" class="my-2 green" dark>看评分</v-btn></template>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>评级</v-card-title>
                <v-card-text>
                  <table style="width:100%" border="1">
                    <tr>
                      <th>Source</th>
                      <th>Ratings</th>
                    </tr>
                    <tr v-for="(rating, index) in this.ratings" :key="index">
                        <td align="center">{{ratings[index].Source}}</td>
                        <td align="center"><v-rating :half-increments="true" :value="ratings[index].Value"></v-rating></td>
                    </tr>
                  </table>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" tile dark @click="dialog = false">
                    ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'movie',
  props: ['id'],
  data () {
    return {
      singleMovie: '',
      dialog: false,
      loading: true,
      rating: ''
    }
  },
  mounted () {
    axios.get('http://www.omdbapi.com/?apikey=7b93999a&i=' + this.id + '&Content-Type=application/json')
      .then(res => {
        this.singleMovie = res.data
        this.ratings = this.singleMovie.Ratings
        this.ratings.forEach(function (ele) {
          ele.Value = parseFloat(ele.Value.split(/\/|%/)[0])
          ele.Value = ele.Value <= 10 ? ele.value / 2 : ele.Value / 20
        })
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem
}

</style>
