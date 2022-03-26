/*
  ZaDark – Zalo Dark Mode
  Microsoft Edge Extension
  Made by NCDAi Studio
*/

;(function (window) {
  window.zadark = window.zadark || {}

  window.zadark.browser = {
    name: 'Edge',

    initClassNames: () => {
      document.body.classList.add('zadark', 'zadark-browser-ext', 'zadark-edge')
    },

    getManifest: () => {
      return chrome.runtime.getManifest()
    },

    getExtensionSettings: () => {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get({
          themeMode: 'single',
          userTheme: 'dark_dimmed',
          darkTheme: 'dark_dimmed',
          isReceiveUpdateNoti: true
        }, (items) => {
          resolve(items)
        })
      })
    },

    saveExtensionSettings: (items) => {
      return chrome.storage.sync.set(items)
    },

    executeScript: (tabId, file) => {
      chrome.tabs.executeScript(tabId, { file })
    },

    getZaloTabs: async () => {
      return new Promise((resolve) => {
        chrome.tabs.query({
          url: ['*://chat.zalo.me/*'],
          currentWindow: true
        }, (tabs) => {
          resolve(tabs)
        })
      })
    },

    createTab: ({ url }) => {
      chrome.tabs.create({ url })
    }
  }
})(window)
