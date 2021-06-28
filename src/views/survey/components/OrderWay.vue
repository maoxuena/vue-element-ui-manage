<template>
  <div class="order-way">
    <label class="order-way-text">排列方向:</label>
    <div class="order-way-value">
      <el-select v-model="orderByValue"
                 @change="emitData"
                 size="mini"
                 placeholder="请选择">
        <el-option-group v-for="group in options"
                         :key="group.label"
                         :label="group.label">
          <el-option v-for="item in group.options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-option-group>
      </el-select>
    </div>
  </div>
</template>

<script>

export default {
  props: ['value'],
  data () {
    return {
      options: [{
        label: '',
        options: [{
          value: 'vertical',
          label: '纵向排列'
        }]
      }, {
        label: '横向排列', // horizontal
        options: [{
          value: '2',
          label: '每行2列'
        }, {
          value: '3',
          label: '每行3列'
        }, {
          value: '4',
          label: '每行4列'
        }, {
          value: '6',
          label: '每行6列'
        }]
      }],
      orderByValue: this.value
    }
  },
  watch: {
    value (newVal) {
      this.orderByValue = newVal
    },
    orderByValue (newVal) {
      // 通知父组件更新值
      this.$emit('input', newVal)
    }
  },
  methods: {
    emitData: function (event) {
      console.log(event)
      this.$emit('input', event)
    }
  }
}
</script>

<style>
.order-way {
  position: relative;
  padding-left: 80px;
  font-size: 14px;
}
.order-way-text {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  line-height: 32px;
  color: #606266;
}
</style>
