<template lang="pug">
  v-footer(height='auto', color='grey darken-3')
    v-layout(justify-center, row, wrap)
      v-flex(color='#222',justify-center, py-2, text-xs-center, white--text, xs12)
        | ©2018 —
        strong Bestisoft
</template>

<script>
export default {
  data () {
    return {
      links: [
        'About us',
        'Solutions',
        'Latest Jobs',
        'Why us',
        'Contact Us'
      ]
    }
  }
}
</script>
