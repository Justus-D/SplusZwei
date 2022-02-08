import createPersistedState from 'vuex-persistedstate'

// Storing data in local storage
// advantage: in comparison to cookies, local storage is not transmitted to server with each request
// and can therefore be much bigger than cookies
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'localSpluseins',
      paths: [
        'splus.customSchedules',
        'splus.favoriteSchedules',
        'splus.subscribedTimetable'
      ]
    })(store)
    store.commit('splus/removeOudatedTables')
  })
  // todo store dispatch remove Old Timetable here?
}
