<template>
  <div>
    <div class="option-area ta-l">
      <div class="option-mask"></div>
      <!-- 问题 -->
      <div class="option-ques pos-r">
        <span class="pos-a option-ques-req">*</span>
        <div class="option-ques-topic pos-a">1</div>
        <div class="option-ques-title ql-editor"
             v-html="itemData.title"></div>
      </div>
      <slot />
      <!-- 下拉框 -->
      <div class="option-layout"
           v-if="itemData.selType === 'select'">
        <el-select v-model="itemData.selValue"
                   placeholder="请选择">
          <el-option v-for="(opt,index) in itemData.options"
                     :key="index"
                     :label="opt.itemName"
                     :value="opt.itemId">
          </el-option>
        </el-select>
      </div>
      <!-- 单选或多项 -->
      <template v-else>
        <!-- 选项横置 -->
        <div class="option-layout"
             v-if="itemData.orderValue !== 'vertical'">
          <el-row :gutter="20"
                  v-for="(item,index) in tempData"
                  :key="index">
            <el-col :span="col"
                    v-for="(opt,index) in item"
                    :key="index">
              <div class="input-area">
                <el-radio v-if="itemData.selType === 'radio'"
                          :label="opt.itemId"
                          v-model="itemData.selValue">{{opt.itemName}}</el-radio>
                <el-checkbox v-if="itemData.selType === 'checkbox'"
                             :label="opt.itemId"
                             v-model="opt.defaultSelect">{{opt.itemName}}</el-checkbox>
                <div class="d-ib"
                     v-if="opt.allowFilling">
                  <el-input class="blank-text"
                            size="mini"
                            v-model="opt.blankText" />
                </div>
                <div class="item-desc">{{opt.explain}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 选项纵置 -->
        <div class="option-layout"
             v-else>
          <el-row :gutter="20">
            <el-col :span="24"
                    v-for="(opt,index) in itemData.options"
                    :key="index">
              <div class="input-area">
                <el-radio v-if="itemData.selType === 'radio'"
                          :label="opt.itemId"
                          v-model="itemData.selValue">{{opt.itemName}}</el-radio>
                <el-checkbox v-if="itemData.selType === 'checkbox'"
                             :label="opt.itemId"
                             v-model="opt.defaultSelect">{{opt.itemName}}</el-checkbox>
                <div class="d-ib"
                     v-if="opt.allowFilling">
                  <el-input class="blank-text"
                            size="mini"
                            v-model="opt.blankText" />
                </div>
                <div class="item-desc">{{opt.explain}}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
    <editor class="pb-15"
            v-model="itemData.title"></editor>
    <el-row class="set-box pb-15"
            :gutter="20">
      <el-col :span="6">
        <el-checkbox v-model="itemData.mustAnswer">必答题</el-checkbox>
      </el-col>
      <el-col :span="6">
        <el-select v-model="itemData.selType"
                   placeholder="请选择">
          <el-option v-for="item in selOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <order-way v-model="itemData.orderValue"
                   v-if="itemData.selType !== 'select'"></order-way>
      </el-col>
    </el-row>
    <el-table :data="itemData.options"
              style="width: 100%">
      <el-table-column label="选项文字">
        <template slot-scope="scope">
          <div id="title-row">
            <el-input size="small"
                      style="display: inline-block;"
                      v-model="scope.row.itemName"
                      placeholder="请输入内容"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="180">
        <template slot-scope="scope">
          <div style="display: inline-block;margin-top: 5px;">
            <el-button type="warning"
                       @click="remove(scope.$index)"
                       size="mini"
                       style="display: inline-block;"
                       icon="el-icon-minus"
                       circle></el-button>
            <el-button type="danger"
                       @click="insert(scope.$index)"
                       size="mini"
                       style="display: inline-block;"
                       icon="el-icon-plus"
                       circle></el-button>
            <el-button size="mini"
                       style="display: inline-block;"
                       @click="moveUp(scope.$index)"
                       icon="el-icon-top"
                       circle></el-button>
            <el-button size="mini"
                       style="display: inline-block;"
                       @click="moveDown(scope.$index)"
                       icon="el-icon-bottom"
                       circle></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="图片"
                       width="80">
        <template slot-scope="scope">
          <i v-if="!scope.row.imgUrl"
             class="el-icon-picture-outline options-img"></i>
          <img v-else
               class="options-img-url"
               :src="scope.row.imgUrl" />
        </template>
      </el-table-column>
      <el-table-column label="说明"
                       v-if="itemData.selType !== 'select'">
        <template slot-scope="scope">
          <el-input v-model="scope.row.explain"
                    size="small"
                    placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="允许填空"
                       width="80"
                       align="center"
                       v-if="itemData.selType !== 'select'">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.allowFilling"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="defaultSel"
                       width="80"
                       align="center"
                       label="默认">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.defaultSelect"
                       @change="selectEven(scope.row)"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="warning "
               style="margin-top:5px;width:100%"
               @click="ifEditor=false">完成编辑</el-button>
  </div>
</template>

<script>
import Editor from './Editor'
import OrderWay from './OrderWay'
export default {
  props: ['value'],
  data () {
    return {
      newOption: {
        itemId: 58,
        itemName: '',
        explain: '',
        allowFilling: false,
        blankText: '',
        defaultSelect: false
      },
      msg: '', // 选项
      col: 12, // 选项横置时，col = 24/每行数量
      selOptions: [{// 题型选择
        value: 'radio',
        label: '单选框'
      }, {
        value: 'checkbox',
        label: '多选框'
      }, {
        value: 'select',
        label: '下拉框'
      }],
      itemData: {},
      tempData: []// 选项临时组合数据
    }
  },
  components: {
    Editor,
    OrderWay
  },
  watch: {
    'itemData.orderValue': function (newVal, oldVal) { // 选项排列方式
      if (newVal !== 'vertical') {
        this.tempData = []
        let tempArr = []
        let self = this
        this.itemData.options.filter((item, index) => {
          tempArr.push(item)
          if ((index > 0 && (index + 1) % newVal === 0) || (index === self.itemData.options.length - 1)) {
            self.tempData.push(tempArr)
            tempArr = []
          }
        })
        this.col = 24 / newVal
      }
    },
    'itemData.selType': function (newVal, oldVal) { // 选择方式
      this.itemData.selValue = ''
      this.itemData.options.filter(item => {
        item.allowFilling = false
        item.defaultSelect = false
      })
    },
    itemData: {
      handler: function (newVal, oldVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  methods: {
    // 获取options中每一项的name
    getOptionText () {
      let options = ''
      let n = this.itemData.options.length
      for (let i = 0; i < n; i++) {
        if (i < n - 1) {
          options += this.itemData.options[i].itemName + '\n'
        } else {
          options += this.itemData.options[i].itemName
        }
      }
      return options
    },

    // 删除选项
    remove (index) {
      let options = this.itemData.options
      if (options.length <= 1) {
        console.log('请至少保留1个选项')
        return
      }
      options.splice(index, 1)
      this.msg = this.getOptionText()
    },

    // 插入选项
    insert (index) {
      let options = this.itemData.options
      options.splice(index + 1, 0, this.newOption)
      this.msg = this.getOptionText()
    },

    // 向上移动选项
    moveUp (index) {
      let options = this.itemData.options
      if (index === 0) {
        return
      }
      this.swapItems(options, index - 1, index)
      this.msg = this.getOptionText()
    },

    // 向下移动选项
    moveDown (index) {
      let options = this.itemData.options
      // let index = options.findIndex(item => item.itemId === id)// 获取当前选项对象在数组里面的索引
      if (index === this.itemData.options.length - 1) {
        return
      }
      this.swapItems(options, index, index + 1)
      this.msg = this.getOptionText()
    },

    // 数组上移下移置顶置底
    swapItems (arr, indexPrev, indexNext, direction) { // arr:数组，indexPrev:前一个索引,indexNext:后一个索引,direction:描述
      let tempOption = arr[indexPrev]// 前一个
      this.$set(arr, indexPrev, arr[indexNext])
      this.$set(arr, indexNext, tempOption)
    },

    selectEven (obj) { // 是否默认选中
      if (this.itemData.selType !== 'checkbox') {
        // 题型为单选框或下拉框时，只能设1个默认选中状态
        if (obj.defaultSelect) {
          this.itemData.selValue = obj.itemId
          let options = this.itemData.options
          options.findIndex(item => {
            if (item.itemId !== obj.itemId) { item.defaultSelect = false }
          })
        } else {
          this.itemData.selValue = ''
        }
      }
    }
  },
  mounted () {
    console.log(this.value)
    this.itemData = this.value
  }
}
</script>

<style scoped>
.option-area {
  position: relative;
  padding: 15px;
}
.option-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 9;
  cursor: move;
}
.option-ques {
  padding-left: 15px;
}
.option-ques-req {
  color: red;
  font-weight: bold;
  left: -10px;
  top: 15px;
}
.option-ques-topic {
  left: 0;
  top: 12px;
  width: 30px;
}
.option-ques-title {
  min-height: 46px;
  word-break: break-word;
  /* 去除文字上下的空隙 */
  line-height: 1;
}
.input-area {
  line-height: 32px;
}
.input-area .el-radio {
  margin-right: 5px;
}
.options-img {
  font-size: 20px;
}
.options-img-url {
  height: 20px;
}
.item-desc {
  color: #b1b1b1;
  font-size: 14px;
  padding-left: 25px;
}
</style>
