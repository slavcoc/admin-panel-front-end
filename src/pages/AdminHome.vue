<template lang="pug">
  section(style='min-height:90vh;')
    Navigation(:user='userName' @onPage='changePage' )
    .flex.justify-center.align-items.column
    div(v-if='currentPage === 0')
      h2 Welcome to your admin panel
    div(v-else-if='currentPage === 1')
      Posts
    div(v-else='currentPage === 2')
      CreatePost
</template>

<script>
import http from '@/instance'
import Navigation from '@/components/admin/Navigation'
import Posts from '@/components/admin/Posts'
import CreatePost from '@/components/admin/CreatePost'

export default {
  created () {
    this.initiate()
  },
  data () {
    return {
      posts: null,
      userName: null,
      currentPage: 0
    }
  },
  methods: {
    changePage (e) {
      this.currentPage = e
    },
    initiate () {
      http.data.getUsername()
        .then((response) => {
          this.userName = response.data
        })
    }
  },
  components: {
    Navigation,
    Posts,
    CreatePost
  }
}
</script>
