<template>
  <div class="wrap">
    <header-nav></header-nav>
    <div class="container"
         :class="classObj">
      <!-- 左边菜单 -->
      <left-menu v-model="menuList"></left-menu>
      <div class="main">
        <div class="tags-wrapper">
          <breadcrumb id="breadcrumb-container"
                      class="breadcrumb-container" />
        </div>
        <div class="app-main">
          <transition name="fade-transform"
                      mode="out-in">
            <!-- 动态判断 -->
            <!-- <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive> -->
            <router-view />
          </transition>
        </div>
        <settings v-if="showSettings">
        </settings>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav'
import LeftMenu from './components/LeftMenu'
import Breadcrumb from '@/components/Breadcrumb'
import Settings from './components/Settings'
import { getMenu } from '@/api'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'layout',
  data () {
    return {
      menuList: []
    }
  },
  components: {
    HeaderNav,
    LeftMenu,
    Breadcrumb,
    Settings
  },
  computed: {
    // ...mapState(["token"]),
    // 返回{token：this.$store.state.count}
    // 因为 modules 下的属性使用了命名空间 所以不能使用数组方式的 magic
    ...mapState({
      token: state => state.user.token,
      showSettings: state => state.settings.showSettings
    }),
    // cachedViews () {
    //   // 获取缓存的路由列表
    //   return this.$store.getters.keepAlive
    // },
    // key () {
    //   return this.$route.path
    // },
    ...mapGetters(['sidebar']),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      }
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      getMenu().then(res => {
        if (res.result) {
          this.menuList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  height: 100%;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
    transition: all 0.5s;

    &.hideSidebar {
      padding-left: 65px;
    }

    &.openSidebar {
      padding-left: 210px;
    }

    .tags-wrapper {
      padding: 5px 20px;
      height: 30px;
      -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
        0 0 3px 0 rgba(0, 0, 0, 0.04);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    }

    .main {
      overflow-x: hidden;

      .app-main {
        padding: 20px;
      }
    }
  }
}
</style>
