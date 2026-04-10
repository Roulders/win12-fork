import { createStore } from 'vuex'

export default createStore({
  state: {
    isDarkMode: false,
    currentApp: null,
    runningApps: [],
    user: {
      name: 'User'
    }
  },
  getters: {
    isDarkMode: state => state.isDarkMode,
    currentApp: state => state.currentApp,
    runningApps: state => state.runningApps,
    user: state => state.user
  },
  mutations: {
    setDarkMode(state, value) {
      state.isDarkMode = value
    },
    setCurrentApp(state, app) {
      state.currentApp = app
    },
    addRunningApp(state, app) {
      if (!state.runningApps.includes(app)) {
        state.runningApps.push(app)
      }
    },
    removeRunningApp(state, app) {
      state.runningApps = state.runningApps.filter(item => item !== app)
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    toggleDarkMode({ commit, state }) {
      commit('setDarkMode', !state.isDarkMode)
    },
    openApp({ commit }, app) {
      commit('setCurrentApp', app)
      commit('addRunningApp', app)
    },
    closeApp({ commit, state }, app) {
      if (state.currentApp === app) {
        commit('setCurrentApp', null)
      }
      commit('removeRunningApp', app)
    }
  }
})