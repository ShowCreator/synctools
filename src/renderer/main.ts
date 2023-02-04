/*
 * @Author: sfy
 * @Date: 2023-02-04 17:26:02
 * @LastEditors: sfy
 * @LastEditTime: 2023-02-04 18:12:00
 * @FilePath: /synctools-master/src/renderer/main.ts
 * @Description: update here
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/renderer/App.vue'
import router from '@/renderer/router'
import vuetify from '@/renderer/plugins/vuetify'

// Add API key defined in contextBridge to window object type
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    mainApi?: any
  }
}

const app = createApp(App)

app.use(vuetify).use(router).use(createPinia())

app.mount('#app')
