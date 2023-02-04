/*
 * @Author: sfy
 * @Date: 2023-02-04 17:26:02
 * @LastEditors: sfy
 * @LastEditTime: 2023-02-04 21:10:40
 * @FilePath: /synctools-master/src/preload/index.ts
 * @Description: update here
 */
import { contextBridge, ipcRenderer } from 'electron'

// Whitelist of valid channels used for IPC communication (Send message from Renderer to Main)
const mainAvailChannels = ['msgRequestGetVersion', 'makeSync']
const rendererAvailChannels = ['msgReceivedVersion']

contextBridge.exposeInMainWorld('mainApi', {
  send: (channel, data) => {
    if (mainAvailChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, cbFunc) => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => cbFunc(...args))
    }
  }
})
