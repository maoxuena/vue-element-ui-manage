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
      <Select v-model="Data.Title"></Select>
    </el-main>
  </el-container>
</template>

<script>
import Select from './components/Select'

export default {
  name: 'qestionnaire',
  data () {
    return {
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
      Data: {
        Title: '222'
      }
    }
  },
  components: {
    Select
  },
  methods: {
    renderContent (h, { node, data, store }) {
      if (data.icon) {
        return (
          <span class="custom-tree-node">
            <svg-icon style="width:14px;height:14px;vertical-align: baseline;margin-right:5px;" icon-class={data.icon} />
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
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
