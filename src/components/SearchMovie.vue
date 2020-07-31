<template>
    <v-container v-if="loading">
        <div class="text-xs-center">
            <v-progress-circular>
                indeterminate
                :size="150"
                :width="8"
                color="green"
            </v-progress-circular>
        </div>
    </v-container>
    <v-container v-else grid-list-xl>
        <v-layout wrap>
            <v-flex xs4 mb-2
                v-for="(item, index) in movieResponse" :key="index">
                <v-card>
                    <v-img :src="item.Poster" aspect-ratio="1"></v-img>
                    <v-card-title>
                        <div>
                            <h2>{{item.Title}}</h2>
                            <div>Year: {{item.Year}}</div>
                            <div>Type: {{item.Type}}</div>
                            <div>IMDB-id: {{item.imdbID}}</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn round color="green" @click="singleMovie(item.imdbID)">
                            View
                        </v-btn>
                        <v-btn round color="green">Visit site</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'search-movie',
  props: ['name'],
  data () {
    return {
      movieResponse: [],
      loading: true,
      noData: false
    }
  },
  mounted () {
    const url = 'http://www.omdbapi.com/?apikey=7b93999a&Content-Type=application/json' + '&s=' + this.name
    axios.get(url)
      .then(res => {
        if( res.Response === 'True') {
          this.movieResponse = res.data.Search
          this.loading = false
          this.noData = false
        } else {
          this.loading = false
          this.noData = true
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  },
  watch: {
    name(value) {
       const url = 'http://www.omdbapi.com/?apikey=7b93999a&Content-Type=application/json' + '&s=' + value
    axios.get(url)
      .then(res => {
          if( res.Response === 'True') {
          this.movieResponse = res.data.Search
          this.loading = false
          this.noData = false
        } else {
          this.loading = false
          this.noData = true
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
    .v-progress-circular {
        margin: 1rem;
    }
</style>
