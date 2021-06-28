<template>
  <div>
    <span @click="changeTheme('theme1')">风格1</span>
    <span @click="changeTheme('theme2')">风格2</span>
    <span @click="changeTheme('theme3')">风格3</span>
  </div>
</template>

<script>
export default {
  name: 'change-theme',
  data () {
    return {
    }
  },
  methods: {
    changeTheme (theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
    }
  }
}
</script>

<style lang="scss">
//颜色，字体，背景的配置文件
$font-color-theme: #fff; //字体颜色
$font-color-theme1: #fff; //字体颜色
$font-color-theme2: #fff; //字体颜色
$font-color-theme3: #fff; //字体颜色

$bg-base-color-theme: #304156; //背景主题颜色-默认
$bg-base-hover-color-theme: #263445; //背景主题颜色hover-默认
$bg-dark-color-theme: #1f2d3d; //背景主题颜色加深-默认
$bg-dark-hover-color-theme: #001528; //背景主题颜色加深hover-默认

$bg-base-color-theme1: #ff9101; //背景主题颜色-1
$bg-base-hover-color-theme1: #ff7d01; //背景主题颜色hover-1
$bg-dark-color-theme1: #ff7200; //背景主题颜色加深-1
$bg-dark-hover-color-theme1: #f37006; //背景主题颜色加深hover-1

$bg-base-color-theme2: #7bb2b5; //背景主题颜色-2
$bg-base-hover-color-theme2: #679698; //背景主题颜色hover-2
$bg-dark-color-theme2: #3f6769; //背景主题颜色加深-2
$bg-dark-hover-color-theme2: #325758; //背景主题颜色加深hover-2

$bg-base-color-theme3: #304156; //背景主题颜色-3
$bg-base-hover-color-theme3: #263445; //背景主题颜色hover-3
$bg-dark-color-theme3: #1f2d3d; //背景主题颜色加深-3
$bg-dark-hover-color-theme3: #001528; //背景主题颜色加深hover-3

/*通过该函数设置字体颜色，后期方便统一管理；*/
@mixin font_color($color) {
  color: $color;
  [data-theme="theme1"] & {
    color: $font-color-theme1;
  }
  [data-theme="theme2"] & {
    color: $font-color-theme2;
  }
  [data-theme="theme3"] & {
    color: $font-color-theme3;
  }
}
/*通过该函数设置主题颜色，后期方便统一管理；*/
@mixin bg_color($color, $type) {
  background-color: $color;
  [data-theme="theme1"] & {
    @if $type==base {
      background-color: $bg-base-color-theme1;
    } @else if $type==basehover {
      background-color: $bg-base-hover-color-theme1;
    } @else if $type==dark {
      background-color: $bg-dark-color-theme1;
    } @else if $type==darkhover {
      background-color: $bg-dark-hover-color-theme1;
    }
  }
  [data-theme="theme2"] & {
    @if $type==base {
      background-color: $bg-base-color-theme2;
    } @else if $type==basehover {
      background-color: $bg-base-hover-color-theme2;
    } @else if $type==dark {
      background-color: $bg-dark-color-theme2;
    } @else if $type==darkhover {
      background-color: $bg-dark-hover-color-theme2;
    }
  }
  [data-theme="theme3"] & {
    @if $type==base {
      background-color: $bg-base-color-theme3;
    } @else if $type==basehover {
      background-color: $bg-base-hover-color-theme3;
    } @else if $type==dark {
      background-color: $bg-dark-color-theme3;
    } @else if $type==darkhover {
      background-color: $bg-dark-hover-color-theme3;
    }
  }
}

/*************header**********/
.header-nav {
  @include bg_color($bg-base-color-theme, "base");
  @include font_color($font-color-theme);
}
/*************menu**********/
// menu-first：一级菜单样式
// menu-second：二级菜单样式
.menu-first,
.el-menu-vertical,
.el-submenu__title,
.el-submenu__title i,
.menu-second {
  @include font_color($font-color-theme);
}

.left-nav,
.el-menu-vertical {
  @include bg_color($bg-base-color-theme, "base");
}

.menu-first:hover,
.menu-first .el-submenu__title:hover {
  @include bg_color($bg-base-hover-color-theme, "basehover");
}

.menu-second {
  @include bg_color($bg-dark-color-theme, "dark");
}

.menu-second:hover {
  @include bg_color($bg-dark-hover-color-theme, "darkhover");
}
</style>
