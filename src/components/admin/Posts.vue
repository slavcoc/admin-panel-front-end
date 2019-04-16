<template lang="pug">
  section.p60-top.p60-bot.p60-side(style='width:80%;float:right;' v-if="visible")
      p.texture.p30-bot Lorem ipsum doler
      v-layout.justify-center.stretch(row, wrap v-if='visible')
        Post(v-for='post in news' :key='post.id' :data='post' @event='initiateData')
</template>

<script>
import Post from '@/components/admin/Post'
import http from '@/instance'
import helpers from '@/helpers'

export default {
  created () {
    this.initiateData()
  },
  data () {
    return {
      headline: 'All Posts',
      news: null,
      visible: true,
      url: null
    }
  },
  methods: {
    initiateData () {
      this.visible = false
      http.data.getData(0, 15)
        .then(response => {
          this.news = response.data.content
          this.news.forEach(element => {
            element.url = `${http.imageUrl}${element.filename}`
            element.date = helpers.formatDate(element.date)
          })
          this.visible = true
        })
    }
  },
  components: {
    Post
  }
}
</script>
