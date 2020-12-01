<template>
  <m-icon :type="`icon-${type}`" />
</template>

<script>
import { Icon } from 'ant-design-vue'
// const iconURL = '/assets/js/icon.js'
const iconURL = '//at.alicdn.com/t/font_1689170_szy81mb0ce.js'
const MIcon = Icon.createFromIconfontCN({
  scriptUrl: iconURL
})

export default {
  components: {
    MIcon
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>
