/*
 * @Author: sfy
 * @Date: 2023-02-04 17:26:02
 * @LastEditors: sfy
 * @LastEditTime: 2023-02-04 23:39:41
 * @FilePath: /synctools-master/src/main/IPCs.ts
 * @Description: update here
 */
import { BrowserWindow, ipcMain } from 'electron'
import { syncCode } from './utils/sync'

/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(window: BrowserWindow) {
    // Open url via web browser
    ipcMain.on('makeSync', async (event, val) => {
      syncCode(window)
    })
  }
}
