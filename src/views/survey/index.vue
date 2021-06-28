<template>
  <div class="home">
    <span @click="dialogVisible=true"> + 创建问卷</span>
    <el-dialog title="创建调查问卷"
               :visible.sync="dialogVisible"
               width="30%"
               center>
      <el-input v-model="title"
                placeholder="请输入标题"></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="handleCreate(title)">立即创建</el-button>
      </span>
    </el-dialog>
    <dl v-for="(item,index) in list"
        :key="item.id"
        class="survey-item">
      <dt class="item-top clearfix">
        <div class="fl item-tit">
          <router-link to="/survey/edit"
                       title="item.title">{{item.title}}
          </router-link>
        </div>
        <div class="fr">
          <div class="fl item-id">ID:{{item.id}}</div>
          <div class="fl item-draft"><i class="nopublic"></i>{{item.isPublic?'已发布':'未发布'}}</div>
          <div class="fl item-sheet">答卷:<a href="javascript:void(0);"
               class="runing-num">{{item.num}}</a></div>
          <div class="fl item-date">{{item.date}}</div>
        </div>
      </dt>
      <dd class="item-bottom clearfix">
        <div class="operation-box fr">
          <el-tag type="info"
                  effect="plain"
                  @click="handleUpdate(item.id)">
            编辑
          </el-tag>
          <el-tag type="info"
                  effect="plain"
                  @click="handleRemove(index)">
            删除
          </el-tag>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>

export default {
  name: 'survey',
  data () {
    return {
      dialogVisible: false, // 创建调查问卷对话框
      title: '', // 问卷标题
      list: [{
        id: 52678959,
        title: '************排行榜*********************',
        isPublic: 0, // 0未发布，1已发布
        num: 0,
        date: '12月18日 12:40'
      }]
    }
  },
  components: {
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    centerDialogVisible () {

    },
    handleCreate () {
      this.dialogVisible = false
      console.log(this.title)
      this.$store.dispatch('survey/changeSurvey', {
        key: 'title',
        value: this.title
      })
      console.log(this.$store.state)
      this.$router.push('/survey/create')
    },
    handleUpdate (id) {
      this.$router.push(`/survey/edit/${id}`)
    },
    handleRemove (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.survey-item {
  background: #fff;
  border-radius: 2px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px 0px #f0f0f0;
  border: 1px solid #e6e6e6;

  .item-top {
    padding: 13px 24px 0;
    font-size: 16px;
    height: 35px;
    line-height: 22px;
    color: #262626;

    .item-tit {
      overflow: hidden;
      max-width: 60%;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 7px;
      color: #1f1f1f;
    }
  }

  .item-bot {
    margin: 13px 24px 0;
    height: 36px;
    line-height: 36px;
    padding: 18px 0 18px;
    border-top: 1px solid #f5f5f5;
  }
}
</style>
