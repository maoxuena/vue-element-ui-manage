<template>
  <right-panel>
    <div class="drawer-container">
      <div>
        <h3 class="drawer-title">页面风格设置</h3>
        <div class="drawer-item">
          <span>主题颜色</span>
          <theme-picker class="color-picker"
                        @change="themeChange" />
        </div>
        <div class="drawer-item">
          <span>菜单颜色</span>
          <el-color-picker v-model="menuBgVal"
                           class="theme-picker color-picker"
                           :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
                           popper-class="theme-picker-dropdown"
                           @change="menuBgChange"></el-color-picker>
        </div>
        <!-- <div class="drawer-item">
        <span>主菜单颜色鼠标上移</span>
        <el-color-picker v-model="menuHoverVal"
                         class="theme-picker color-picker"
                         :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
                         popper-class="theme-picker-dropdown"
                         @change="menuHoverChange"></el-color-picker>
      </div>
      <div class="drawer-item">
        <span>子菜单颜色</span>
        <el-color-picker v-model="subMenuBgVal"
                         class="theme-picker color-picker"
                         :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
                         popper-class="theme-picker-dropdown"
                         @change="subMenuBgChange"></el-color-picker>
      </div>
      <div class="drawer-item">
        <span>子菜单颜色鼠标上移</span>
        <el-color-picker v-model="subMenuHoverVal"
                         class="theme-picker color-picker"
                         :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
                         popper-class="theme-picker-dropdown"
                         @change="subMenuHoverChange"></el-color-picker>
      </div> -->

        <div class="drawer-item">
          <span>菜单文字颜色</span>
          <el-color-picker v-model="menuTextVal"
                           class="theme-picker color-picker"
                           :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
                           popper-class="theme-picker-dropdown"
                           @change="menuTextChange"></el-color-picker>
        </div>
      </div>
    </div>
  </right-panel>
</template>

<script>

import RightPanel from '@/components/RightPanel'
import ThemePicker from '@/components/ThemePicker'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      menuTextVal: '',
      menuBgVal: '',
      menuHoverVal: '',
      subMenuBgVal: '',
      subMenuHoverVal: ''
    }
  },
  components: {
    ThemePicker,
    RightPanel
  },
  computed: {
    ...mapState({
      menuText: state => state.settings.menuText,
      menuBg: state => state.settings.menuBg,
      menuHover: state => state.settings.menuHover,
      subMenuBg: state => state.settings.subMenuBg,
      subMenuHover: state => state.settings.subMenuHover
    })
  },
  watch: {
    menuText: {
      handler: function (val, oldVal) {
        this.menuTextVal = val
      },
      immediate: true
    },
    menuBg: {
      handler: function (val, oldVal) {
        this.menuBgVal = val
      },
      immediate: true
    },
    menuHover: {
      handler: function (val, oldVal) {
        this.menuHoverVal = val
      },
      immediate: true
    },
    subMenuBg: {
      handler: function (val, oldVal) {
        this.subMenuBgVal = val
      },
      immediate: true
    },
    subMenuHover: {
      handler: function (val, oldVal) {
        this.subMenuHoverVal = val
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('settings', ['changeSetting']),
    themeChange (val) {
      this.changeSetting({
        key: 'theme',
        value: val
      })
      // this.$store.dispatch('settings/changeSetting', {
      //   key: 'theme',
      //   value: val
      // })
    },
    menuBgChange (val) {
      this.changeSetting({
        key: 'menuBg',
        value: val
      })
    },
    menuHoverChange (val) {
      this.changeSetting({
        key: 'menuHover',
        value: val
      })
    },
    subMenuBgChange (val) {
      this.changeSetting({
        key: 'subMenuBg',
        value: val
      })
    },
    subMenuHoverChange (val) {
      this.changeSetting({
        key: 'subMenuHover',
        value: val
      })
    },
    menuTextChange (val) {
      this.changeSetting({
        key: 'menuText',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;

    .color-picker {
      float: right;
      height: 26px;
      margin: -3px 8px 0 0;
    }
  }

  .drawer-switch {
    float: right;
  }
  .theme-picker-dropdown {
    z-index: 99999 !important;
  }

  .theme-picker .el-color-picker__trigger {
    height: 26px !important;
    width: 26px !important;
    padding: 2px;
  }

  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
}
</style>
