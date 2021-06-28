const getters = {// 对state中的数据进行加工处理
  sidebar: state => state.app.sidebar,
  token: state => state.user.token
}
export default getters
