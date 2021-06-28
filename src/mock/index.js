import Mock from 'mockjs'
import { loginUsers } from '@/mockdata/user'
import { menuList } from '@/mockdata/menu'
const base = '/api'
// 登录
Mock.mock(`${base}/login`, 'post', (data) => {
  // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
  const { username, password } = JSON.parse(data.body)
  if (username === 'admin' && password === 'admin') {
    return {
      data: loginUsers,
      message: '登录成功',
      result: true
    }
  } else {
    return {
      data: null,
      result: false,
      message: '用户名或密码错误'
    }
  }
})
// 退出
Mock.mock(`${base}/logout`, 'post', () => {
  return {
    data: '',
    message: '退出成功',
    result: true
  }
})
// 获取全部菜单
Mock.mock(`${base}/getMenu`, 'get', (data) => {
  return {
    data: menuList,
    message: '获取菜单成功',
    result: true
  }
})
