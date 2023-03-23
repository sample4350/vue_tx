import { getItem, setItem } from '@/utils/auth'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOKEN_KEY = 'TX_USER'
const MAIL_KEY = 'TX_MAIL'
const NICKNAME_KEY = 'TX_NICKNAME'
const PASSWD_KEY = 'TX_PASSWD'
const CHECK_KEY = 'TX_CHECK'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    mail: getItem(MAIL_KEY),
    nickname: getItem(NICKNAME_KEY),
    passwd: getItem(PASSWD_KEY),
    check: getItem(CHECK_KEY)
  },
  getters: {
  },
  mutations: {
    // 保存token到本地
    setUser (state, data) {
      state.user = data
      // 请求获取的token备份到本地
      setItem(TOKEN_KEY, state.user)
    },
    setMail(state, data) {
      state.mail = data
      setItem(MAIL_KEY, state.mail)
    },
    setNickName(state, data) {
      state.nickname = data
      setItem(NICKNAME_KEY, state.nickname)
    },
    setPasswd(state, data) {
      state.passwd = data
      setItem(PASSWD_KEY, state.passwd)
    },
    setSave(state, data) {
      state.check = data
      setItem(CHECK_KEY, state.check)
    }
  },
  actions: {
  },
  modules: {
  }
})
