import { mockUsers } from '@/mock/user'

export const login = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.phone === data.phone && u.password === data.password)
      if (user) {
        resolve({ code: 200, data: user, message: '登录成功' })
      } else {
        reject({ code: 400, message: '手机号或密码错误' })
      }
    }, 300)
  })
}

export const register = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        username: data.username,
        phone: data.phone,
        password: data.password,
        avatar: ''
      }
      mockUsers.push(newUser)
      resolve({ code: 200, data: newUser, message: '注册成功' })
    }, 300)
  })
}
