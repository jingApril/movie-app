<template>
    <v-container v-if="loading">
        <div class="text-center">
            <v-progress-circular>
                indeterminate
                :size="150"
                :width="8"
                color="green"
            </v-progress-circular>
        </div>
    </v-container>
    <v-container v-else-if="noData">
      <div class="text-center">
         <h2>Sorry，数据库无法找到 {{this.name}} 电影</h2>
      </div>
    </v-container>
    <v-container v-else grid-list-xl>
      <v-layout wrap>
          <v-flex xs4
            v-for="(item, index) in movieResponse"
            :key="index"
            mb-2>
            <v-card>
              <v-img
                :src="item.Poster"
                aspect-ratio="1"
              ></v-img>

              <v-card-title primary-title>
                <div>
                  <h2>{{item.Title}}</h2>
                  <div>Year: {{item.Year}}</div>
                  <div>Type: {{item.Type}}</div>
                  <div>IMDB-id: {{item.imdbID}}</div>
                </div>
              </v-card-title>

              <v-card-actions class="justify-center">
                <v-btn rounded
                  color="green"
                   @click="singleMovie(item.imdbID)"
                  >View</v-btn>
              </v-card-actions>

            </v-card>
          </v-flex>
      </v-layout>
        <v-pagination
          v-model="pagination.page"
          :length=" pagination.total  "
           @input="onPageChange"
        ></v-pagination>
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
      noData: false,
      pagination: {
        page: 1,
        total: 0,
        perPage: 10
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    },
    getUsers () {
      const url = 'http://www.omdbapi.com/?apikey=7b93999a&Content-Type=application/json' + '&s=' + this.name + '&page=' + this.pagination.page
      // const url = 'http://www.omdbapi.com/?apikey=7b93999a&Content-Type=application/json' + '&s=' + this.name
      axios.get(url).then(res => {
        if (res.data.Response === 'True') {
          this.movieResponse = res.data.Search
          this.loading = false
          this.noData = false
          this.pagination.total = parseInt(res.data.totalResults / 10)
          console.log(this.pagination.total)
        } else {
          this.loading = false
          this.noData = true
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    onPageChange () {
      this.getUsers()
    }
  },
  watch: {
    // name(value) {
    //   this.getUsers(value)
    // }

  }
}
</script>

<style lang="scss" scoped>
    .v-progress-circular {
        margin: 1rem;
    }
</style>
