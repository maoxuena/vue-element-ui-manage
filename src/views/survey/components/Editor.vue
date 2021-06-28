<template>
  <div>
    <vue-editor v-model="content"
                @input="getHtml()"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: ['value'],
  data () {
    return {
      content: this.value
    }
  },
  components: {
    VueEditor
  },
  methods: {
    getHtml () {
      // 通知父组件值更新，这里必须用input发送数据，发送的数据会被父级v-model="itemData.Title"接受到，再被value=itemData.Title传回来。
      this.$emit('input', this.content)
    }
  },
  watch: {
    value (newVal) {
      this.content = newVal
    },
    content (newVal) {
      // 通知父组件值更新
      this.$emit('input', newVal)
    }
  }
}
</script>

<style scoped>
</style>
