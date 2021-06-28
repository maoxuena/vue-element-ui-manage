<template>
  <div class="header-nav"
       :style="{'background-color':menuBg,'color':menuText}">
    <h3 class="headet-title">******管理后台</h3>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect"
                   trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar"
               src="@/assets/logo.png">
          <svg-icon class="caret-bottom"
                    :style="{'color':menuText}"
                    icon-class="arrow-down" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span class="block"
                  @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'header-nav',
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState({
      menuBg: state => state.settings.menuBg,
      menuText: state => state.settings.menuText
    })
  },
  methods: {
    // 退出
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 60px;

  .headet-title {
    line-height: 60px;
    padding: 0 30px;
    display: inline-block;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.avatar-container {
        margin-right: 30px;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 50px;

        .avatar-wrapper {
          position: relative;
          height: 50px;
          padding: 5px;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 20px;
          }
        }
      }

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
