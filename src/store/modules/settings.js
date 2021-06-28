import Cookies from 'js-cookie'
import variablesEle from '@/styles/element-variables.scss'
import variables from '@/styles/variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: Cookies.get('theme') || variablesEle.theme,
  menuText: Cookies.get('menuText') || variables.menuText,
  menuBg: Cookies.get('menuBg') || variables.menuBg,
  menuHover: variables.menuHover,
  subMenuBg: variables.subMenuBg,
  subMenuHover: variables.subMenuHover,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      Cookies.set(key, value)
    }
  }
}

const actions = {// 异步操作时使用(可以写接口，跟后台结合)
  // 使用：this.$store.dispatch('settings/changeSetting')
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true, // 为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state,
  mutations,
  actions
}
