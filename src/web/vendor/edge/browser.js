/*
  ZaDark – Zalo Dark Mode
  Microsoft Edge Extension
  Made by Quaric

  ! This file must use VanillaJS
*/

;(function (window) {
  window.zadark = window.zadark || {}

  window.zadark.browser = {
    name: 'Edge',

    initClassNames: () => {
      document.body.classList.add('zadark', 'zadark-web', 'zadark-edge')
    },

    getManifest: () => {
      return chrome.runtime.getManifest()
    },

    getExtensionSettings: () => {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get({
          theme: 'dark',
          font: 'open-sans'
        }, (items) => {
          resolve(items)
        })
      })
    },

    saveExtensionSettings: (items) => {
      return chrome.storage.sync.set(items)
    },

    getZaloTabs: async () => {
      const tabs = await chrome.tabs.query({
        url: ['*://chat.zalo.me/*'],
        currentWindow: true
      })
      return tabs
    },

    getEnabledBlockingRuleIds: async () => {
      const rulesetIds = await chrome.declarativeNetRequest.getEnabledRulesets()
      return rulesetIds
    },

    updateEnabledBlockingRuleIds: ({ enableRuleIds = [], disableRuleIds = [] }) => {
      return chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: enableRuleIds,
        disableRulesetIds: disableRuleIds
      })
    },

    sendMessage2Tab: async function (tabId, action, payload) {
      if (!tabId) {
        return
      }

      await chrome.tabs.sendMessage(tabId, {
        action,
        payload
      })
    },

    sendMessage2ZaloTabs: async function (action, payload) {
      const tabs = await this.getZaloTabs()
      tabs.forEach((tab) => {
        this.sendMessage2Tab(tab.id, action, payload)
      })
    }
  }
})(window)
