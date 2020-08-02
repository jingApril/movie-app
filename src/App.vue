<template>
  <v-app>
    <v-toolbar dark>
      <v-toolbar-title class="haedline text-uppercase">
          <router-link to='/' tag='span' style='cursor: pointer'>主页面</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field label="电影名字" value="searchString"></v-text-field>
      </v-flex>
      <v-btn text :disabled="!dataAvailable" @click="searchMovie"> <span class="mr-2">搜索 </span></v-btn>
    </v-toolbar>
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      searchString: ''
    }
  },
  computed: {
    dataAvailable () {
      return this.searchString !== null && this.searchString !== ''
    }
  },
  methods: {
    searchMovie () {
      this.$router.push('/search/' + this.searchString)
      this.searchString = ''
    }
  }
}
</script>
