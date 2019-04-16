<template lang="pug">
  .flex.justify-center.align-items.column
    .w50.p60-bot
      h1 Insert your login information
    .w30
      v-text-field(v-model="userName" label="Username")
    .w30.p20-bot
      v-text-field(v-model="password" label="Password" type="password")
    .w30.p60-bot
      v-btn(color="info" @click="register" ) Login
</template>

<script>
import http from '@/instance'
import helpers from '@/helpers'

export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    register () {
      const params = new URLSearchParams()
      params.append('grant_type', 'password')
      // bs-admin
      // bs123$
      params.append('username', this.userName)
      params.append('password', this.password)

      http.auth.userLogin(params)
        .then(response => {
          document.cookie = 'access_token=' + response.data.access_token + ';path/'
          http.auth.tokenStore(helpers.getCookie('access_token'))
          this.$router.push({ path: 'admin' })
        })
    }
  }
}
</script>
