<template lang="pug">
  v-flex.my-2(md4='', xs12='')
    v-card(hover color='white' height='100%', width='100%')
      v-img.p10(:src='post.url' height='200')
      v-card-title.layout.justify-center(primary-title='' style="display:block;")
        h3.headline.mb-0 {{post.title}}
      v-card-text.fs13.p10-top.m20-bot {{post.description}}
      p(class='grey--text').m60-bot {{post.date}}
      div.p15-bot(style='')
        v-dialog(v-model="dialog" width="600" persistent)
          v-btn(flat outline color="blue" slot="activator") Edit
          v-card
            v-card-title(class="headline lighten-2" primary-title)
              v-text-field(v-model='post.title' :label='post.title' solo )
            v-card-text
              v-text-field(label='post.description', solo='', counter maxlength="100" v-model='post.description')
              v-textarea(:label='post.content', solo='', v-model='post.content')
            div(v-if="showPreview")
              v-img.p10(:src='imagePreview' height='200')
            div(v-else)
              v-img.p10(:src='post.url' height='200')
            v-flex.my-2(md9 xs12 offset-md1)
              label Choose new image
                input#file(type='file', ref='file', v-on:change='handleFileUpload(post.id)')
            v-divider
            v-card-actions
            v-spacer
            v-btn(color="primary" flat @click="save(post.id)") Save
            v-btn(color="primary" flat @click="cancel()") Cancel
        v-btn(flat outline color="blue" @click="dialog2 = true") Delete
        v-dialog(v-model='dialog2', max-width='500px')
          v-card
            v-card-title.headline.grey.lighten-2(primary-title='')
              | Permanent delete
            v-card-text
              | By clicking the button below you will permanently delete this post!
            v-divider
            v-card-actions
              v-spacer
              v-btn(color='primary', flat='', @click='dialog2 = false')
                | Cancel
              v-btn(color='primary', flat='', @click='deleteIt(post.id)')
                | I accept
</template>

<script>
import http from '@/instance'

export default {
  props: {
    data: Object
  },
  created () {
    this.init()
  },
  data () {
    return {
      dialog: false,
      dialog2: false,
      cachedFields: null,
      post: null,
      file: '',
      showPreview: false,
      imagePreview: false
    }
  },
  methods: {
    init () {
      this.post = JSON.parse(JSON.stringify(this.data))
      this.cachedFields = JSON.parse(JSON.stringify(this.post))
    },
    deleteIt (id) {
      http.data.deleteData(id)
        .then(response => {
          this.$emit('event')
          this.dialog2 = false
        })
    },
    save (id) {
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('title', this.post.title)
      formData.append('content', this.post.content)
      formData.append('description', this.post.description)

      http.data.updateData(id, formData)
        .then(function () {
          this.$emit('event', this.file.id)
          this.dialog = false
        }.bind(this))
    },
    cancel () {
      this.post = this.cachedFields
      this.dialog = false
    },
    handleFileUpload (id) {
      this.file = this.$refs.file.files[0]
      let reader = new FileReader()

      reader.addEventListener('load', function () {
        this.showPreview = true
        this.imagePreview = reader.result
      }.bind(this), false)

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    }
  }
}
</script>
