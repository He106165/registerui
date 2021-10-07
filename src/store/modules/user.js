import {proLogin, logout, getInfo, logoutZW} from '@/api/login/proLogin'
import { getToken, setToken, removeToken, removeTokenDoMain, removeCookie, setCMSLoginName } from '@/utils/auth'
import { orgLogin, orglogout } from '@/api/login/orgLogin'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import md5 from 'js-md5'
import Cookies from "js-cookie";

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 个人用户登录
    proLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = encrypt(userInfo.password)
      const uuid = userInfo.uuid
      const code = userInfo.code
      const joinsysCode = userInfo.joinsysCode
      return new Promise((resolve, reject) => {
        proLogin(username, password, uuid, joinsysCode).then(res => {
          setToken(res.token)
          setCMSLoginName(res.name)

          // const time = res.expire / 1000
          // setTokenByTime(res.token,time)
          commit('SET_TOKEN', res.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 机构用户登录
    OrgLogin({ commit }, userInfo) {
      const username = userInfo.username2.trim()
      const password = encrypt(userInfo.password2)
      const uuid = userInfo.uuid
      const deptName = userInfo.deptName
      const joinsysCode = userInfo.joinsysCode
      //console.info(userInfo)
      return new Promise((resolve, reject) => {
        orgLogin(username, password, uuid, deptName, joinsysCode).then(res => {
          setToken(res.token)
          // setTokenByTime(res.token,res.expire)
          commit('SET_TOKEN', res.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(res => {
          const user = res.user
          const avatar = user.avatar == '' ? require('@/assets/image/profile.jpg') : process.env.VUE_APP_BASE_API + user.avatar
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          // 清除登陆信息
          removeToken()
          removeCookie('lookBackAddr')
          removeCookie('joinsysCode')
          removeCookie('CMSLoginName')
          // 退出调用政务平台的退出接口
          // logoutZW()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
