import createPersistedState from 'vuex-persistedstate';

const Cookies = require('js-cookie');
const cookie = require('cookie');

// This stores the state in cookies, which can be accessed on server side.
// That is useful for universal mode rendering
export default ({ store, req }) => {
  createPersistedState({
    paths: [
      'ui.isDark',
      'ui.sidenavIsOpen',
      'news.faculty',
      'splus.storedSemester'
    ],
    storage: {
      getItem: (key) => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          const parsedCookies = cookie.parse(req.headers.cookie ?? '');
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => {
        if (process.client) Cookies.set(key, value, { expires: 2 * 365, secure: false })
      },
      removeItem: key => {
        if (process.client) Cookies.remove(key)
      }
    }
  })(store);
};
