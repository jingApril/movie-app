<template>
<v-container v-if="loading">

</v-container>
  <v-container v-else>
      <v-layout row wrap>
          <v-flex xs12>
              <h2>欢迎来到单个电影组件</h2>
              <div>{{ singleMovie}}</div>
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
      singleMovie: ''
    }
  },
  mounted () {
    axios.get('http://www.omdbapi.com/?apikey=7b93999a&i=tt0209163&Content-Type=application/json')
      .then(res => {
        this.singleMovie = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
