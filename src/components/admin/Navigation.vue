<template lang="pug">
  v-navigation-drawer(permanent='',fixed, style='width:20%;')
    v-toolbar(flat='')
      v-list
        v-list-tile
          v-list-tile-title.title
            | User: {{user}}
    v-divider
    v-list.pt-0(dense='')
      v-list-tile(v-for='item in items', :key='item.title', @click='selectPage(item.id)')
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.title }}
</template>

<script>
import http from '@/instance'
import helpers from '@/helpers'

export default {
  props: {
    user: String
  },
  created () {
    this.userName = this.user
  },
  data () {
    return {
      userName: '',
      items: [
        { id: 0, title: 'Home', icon: 'dashboard' },
        { id: 1, title: 'All Posts', icon: 'question_answer' },
        { id: 2, title: 'Create Post', icon: 'question_answer' },
        { id: 3, title: 'Logout', icon: 'question_answer' }
      ],
      right: null
    }
  },
  methods: {
    selectPage (id) {
      if (id === 3) {
        http.auth.logout()
          .then(response => {
            helpers.deleteCookie('access_token')
            this.$router.push({ path: 'login' })
          })
      }
      this.$emit('onPage', id)
    }
  }
}
</script>
