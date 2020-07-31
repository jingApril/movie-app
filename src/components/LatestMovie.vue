<template>
    <v-container v-if="loading">
        <div class="text-xs-center">
            <v-progress-circular
                indeterminate
                :size="100"
                :width="6"
                color="green"
            >
            </v-progress-circular>
        </div>
    </v-container>
    <v-container v-else grid-list-xl>
        <v-layout wrap>
            <v-flex xs4 v-for="(item, index) in wholeResponse" :key="index" mb-2>
                <v-card>
                    <v-img :src="item.Poster" aspect-ratio="1"></v-img>
                    <v-card-title primary-title>
                        <div>
                            <h2>{{item.Title}}</h2>
                            <div>年：{{item.Year}}</div>
                            <div>类型：{{item.Type}}</div>
                            <div>IMDB-id: {{item.imdbID}}</div>
                        </div>
                    </v-card-title>
                    <v-card-actions class="justify-center">
                        <v-btn flat color="green" @click="singleMovie(item.imdbID)">
                            View
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'latest-movie',
  data () {
    return {
      wholeResponse: [],
      loading: true
    }
  },
  mounted () {
    axios.get('http://www.omdbapi.com/?s=Indiana&apikey=7b93999a&page=1&type=movie&Content-Type=application/json')
      .then(res => {
        this.wholeResponse = res.data.Search
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
