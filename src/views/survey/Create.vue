<template>
  <el-container>
    <el-aside width="200px">
      <el-tabs>
        <el-tab-pane label="题型选择">
          <el-tree default-expand-all
                   :data="data1"
                   :props="defaultProps"
                   @node-click="handleNodeClick"
                   :render-content="renderContent">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="问卷大纲">配置管理</el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main>
      <h4>{{title}}</h4>
      <Select v-model="items[index]"
              v-for="(item,index) in items"
              :key="index"></Select>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import { getRandomInt } from '@/utils'
import Select from './components/Select'

export default {
  name: 'qestionnaire',
  data () {
    return {
      items: [],
      data1: [{
        icon: '',
        label: '选择题',
        children: [{
          icon: 'radio',
          label: '单选'
        }, {
          icon: 'checkbox',
          label: '多选'
        }, {
          icon: 'select',
          label: '下拉框'
        }]
      }, {
        icon: '',
        label: '填空题',
        children: [{
          icon: 'completion',
          label: '单项填空'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tempData: {
        id: null,
        title: '标题', // 标题
        selValue: '', // 单选框及下拉框选中的值
        mutiSelValue: [], // 多选框选中的值
        selType: '', // 选择类型，radio:单选，checkbox:多选，select:下拉框
        orderValue: 'vertical', // vertical:选项纵向，2、3、4、6:选项横向
        mustAnswer: true, // 是否为必答题
        options: [{// 选项
          itemId: 1, // 单选框属性的值
          itemName: '选项一', // 选项文字
          imgUrl: '',
          explain: '', // 说明
          allowFilling: false, // 是否允许填空
          blankText: '', // 允许填空的填空文本
          defaultSelect: false// 是否默认选中
        }, {
          itemId: 1,
          itemName: '选项二',
          imgUrl: '',
          explain: '',
          allowFilling: false,
          blankText: '',
          defaultSelect: false
        }]
      }
    }
  },
  components: {
    Select
  },
  computed: {
    ...mapState({
      title: state => state.survey.title
    })
  },
  watch: {
    items: {
      handler: function (newVal, oldVal) {
        console.log(111, newVal)
      },
      deep: true
    }
  },
  methods: {
    renderContent (h, { node, data, store }) {
      if (data.icon) {
        return (
          <span class="custom-tree-node">
            <svg-icon style="width:14px;height:14px;vertical-align:baseline;margin-right:5px;" icon-class={data.icon} />
            <span>{data.label}</span>
          </span>
        )
      } else {
        return (
          <span class="custom-tree-node">
            <span>{data.label}</span>
          </span>
        )
      }
    },
    handleNodeClick (data) {
      const id = getRandomInt(100000, 999999)
      let obj = { ...this.tempData, id: id, selType: data.icon }
      this.items.push(obj)
      console.log(0, this.items)
    }
  },
  mounted () {
    window.onbeforeunload = function (e) {
      e = e || window.event
      if (e) {
        e.returnValue = '关闭提示'
      }
      return '关闭提示'
    }
  },
  beforeDestory () {
    window.onbeforeunload = null
  }
}
</script>

<style lang="scss" scoped>
</style>
