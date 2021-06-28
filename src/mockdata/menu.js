const menuList = [
  {
    'id': 10010,
    'name': '首页',
    'icons': 'dashboard',
    'path': '/home'
  },
  {
    'id': 10020,
    'name': '用户管理',
    'icons': 'peoples',
    'children': [
      {
        'id': 10021,
        'name': '用户设置',
        'icons': 'list',
        'path': '/user/list'
      }
    ]
  },
  {
    'id': 10030,
    'name': '问卷管理',
    'icons': 'form',
    'children': [
      {
        'id': 10031,
        'name': '问卷设计',
        'icons': 'list',
        'path': '/survey/list'
      }
    ]
  },
  {
    'id': 10040,
    'name': '图标',
    'icons': 'icon',
    'path': '/settings/list'
  }
]
export { menuList }
