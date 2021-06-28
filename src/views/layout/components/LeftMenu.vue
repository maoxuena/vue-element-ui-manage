<template>
  <div class="left-nav"
       :style="{'background-color':menuBg}"
       :class="!sidebar.opened?'':'open'">
    <hamburger :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />
    <el-scrollbar style="height:100%">
      <el-menu class="el-menu-vertical"
               unique-opened
               :collapse-transition="false"
               router
               :background-color="menuBg"
               :text-color="menuText"
               :collapse="isCollapse">
        <template v-for="item in menuList">
          <!-- 一级菜单 -->
          <el-submenu v-if="!!item.children"
                      :index="
                      item.id+''"
                      :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <!-- 有子菜单 -->
            <template slot="title">
              <!-- 图标 -->
              <svg-icon :icon-class="item.icons" />
              <!-- 文本 -->
              <span slot="title">{{item.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item class="menu-second"
                          v-for="child in item.children"
                          :key="child.id"
                          :index="child.path">
              <template slot="title">
                <!-- 图标 -->
                <svg-icon :icon-class="child.icons" />
                <!-- 文本 -->
                <span slot="title">{{child.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 无子菜单 -->
          <el-menu-item v-else
                        class="menu-first"
                        :index="item.path"
                        :key="item.id">
            <!-- 图标 -->
            <svg-icon :icon-class="item.icons" />
            <!-- 文本 -->
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
export default {
  props: ['value'],
  data () {
    return {
      menuList: []
    }
  },
  components: {
    Hamburger
  },
  watch: {
    value: {
      handler (newVal, oldVal) {
        this.menuList = newVal
      },
      // 代表在wacth里声明了value这个方法之后立即先去执行handler方法
      // immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapState({
      menuText: state => state.settings.menuText,
      menuBg: state => state.settings.menuBg,
      menuHover: state => state.settings.menuHover,
      subMenuBg: state => state.settings.subMenuBg,
      subMenuHover: state => state.settings.subMenuHover
    }),
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    // 切换菜单折叠与展开
    toggleSideBar () {
      console.log(1)
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.left-nav {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 65px;
  transition: width 0.5s;

  &.open {
    width: 210px;

    .collapse {
      transform: rotate(180deg);
    }
  }

  .hamburger-container {
    position: absolute;
    right: -20px;
    top: 7px;
    line-height: 16px;
    cursor: pointer;
  }

  .collapse {
    position: absolute;
    top: 0;
    right: -30px;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}
</style>
