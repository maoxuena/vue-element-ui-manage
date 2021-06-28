import axios from '@/http' // 封装的axios实例
// import qs from 'qs'

const base = '/api'

// export const login = params => { return axios.post(`${base}/login`, qs.stringify(params)).then(res => res.data) }
// 测试
export const test = params => { return axios.get(`${base}/search/hotwords`, params).then(res => res.data) }
// 登录
export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data) }
// 退出
export const logout = params => { return axios.post(`${base}/logout`, params).then(res => res.data) }
// 获取用户信息
export const getUserInfo = params => { return axios.get(`${base}/getUserInfo`, params).then(res => res.data) }
// 获取全部菜单
export const getMenu = params => { return axios.get(`${base}/getMenu`, params).then(res => res.data) }
