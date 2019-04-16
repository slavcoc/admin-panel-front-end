<template lang="pug">
  section.p60-top.p60-bot.p60-side(style='width:80%;float:right;' v-if='visible')
      p.texture.p30-bot Create Post
      v-layout.justify-center.stretch(row, wrap)
        v-flex.my-2(md9='', xs12='' offset-md1)
          v-text-field(label='Title', solo='', v-model='title')
        v-flex.my-2(md9='', xs12='' offset-md1)
          v-text-field(label='Short Desc', solo='', counter maxlength="100" v-model='description')
        v-flex.my-2(md9='', xs12='' offset-md1)
          v-textarea(label='Content', solo='', v-model='content')
        v-flex.my-2(md9 xs12 offset-md1)
          label File
            input#file(type='file', ref='file', v-on:change='handleFileUpload()')
        v-flex.my-2(md9='', xs12='' offset-md1)
          v-btn(primary @click='publish') Publish
</template>

<script>
import http from '@/instance'

export default {
  created () {
    this.init()
  },
  data () {
    return {
      headline: 'All Posts',
      news: null,
      title: '',
      description: '',
      content: '',
      file: '',
      date: '',
      visible: false
    }
  },
  methods: {
    publish () {
      if (this.title && this.description && this.content) {
        this.register()
      } else {
        console.error('error')
      }
    },
    register () {
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('content', this.content)

      http.data.postData(formData)
        .then(function () {
          this.init()
        }.bind(this))
    },
    init () {
      this.visible = false
      this.title = ''
      this.description = ''
      this.content = ''
      this.visible = true
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    }
  }
}
</script>
