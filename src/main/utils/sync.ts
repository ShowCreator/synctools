/*
 * @Author: sfy
 * @Date: 2023-02-04 18:31:09
 * @LastEditors: sfy
 * @LastEditTime: 2023-02-05 11:45:39
 * @FilePath: /synctools-master/src/main/utils/sync.ts
 * @Description: update here
 */
import { BrowserWindow } from 'electron'
import fs from 'fs-extra'
import cmd from 'node-cmd'
import path from 'path'

const createName = 'lcp-asset'
const copyName = 'bui-static'

export const syncCode = async (window: BrowserWindow) => {
  window.webContents.send('msgReceivedVersion', `开始执行脚本，请耐心等待2-3分钟`)

  const projectPath = path.resolve('__dirname', '../')
  try {
    await fs.remove(`${projectPath}/${createName}`)
    await fs.remove(`${projectPath}/${copyName}`)
    window.webContents.send('msgReceivedVersion', `删除当前目录${createName}-${copyName}成功`)
  } catch {
    window.webContents.send('msgReceivedVersion', `删除当前目录${createName}-${copyName}失败`)
    return
  }

  try {
    window.webContents.send('msgReceivedVersion', `开始克隆${copyName}`)
    const result = cmd.runSync(`
    git clone -b auto http://gitlab.boulderaitech.com/bui/bui-static.git  
    `)
    if (result.err) {
      window.webContents.send('msgReceivedVersion', `克隆远程仓库${copyName}到当前目录失败`)
      return
    }
    window.webContents.send('msgReceivedVersion', `克隆远程仓库${copyName}到当前目录成功`)
  } catch {
    window.webContents.send('msgReceivedVersion', `克隆远程仓库${copyName}到当前目录失败`)
    return
  }

  try {
    window.webContents.send('msgReceivedVersion', `开始克隆${createName}并装包`)
    const result = cmd.runSync(`
    git clone http://gitlab.boulderaitech.com/bui/lcp-asset.git  
    cd ./${createName}
    npm run bootstrap
    `)
    if (result.err) {
      window.webContents.send('msgReceivedVersion', `克隆远程仓库${createName}到当前目录装包失败`)
      return
    }
    window.webContents.send('msgReceivedVersion', `克隆远程仓库${createName}到当前目录装包成功`)
  } catch {
    window.webContents.send('msgReceivedVersion', `克隆远程仓库${createName}到当前目录失败`)
    return
  }

  try {
    window.webContents.send('msgReceivedVersion', `开始打包${createName}`)
    const result = cmd.runSync(`
    cd ./${createName}
    npm run build
    `)
    if (result.err) {
      window.webContents.send('msgReceivedVersion', `克隆远程仓库${createName}到当前目录打包失败`)
      return
    }
    window.webContents.send('msgReceivedVersion', `打包${createName}到当前目录成功`)
  } catch {
    window.webContents.send('msgReceivedVersion', `打包${createName}到当前目录失败`)
    return
  }

  try {
    window.webContents.send('msgReceivedVersion', `开始复制资源包`)
    const LcpProPath = `${projectPath}/${copyName}/static/lcp_assets/lcp-pro/1.0.0`
    await fs.remove(LcpProPath)
    fs.copySync(`${projectPath}/${createName}/packages/lcp-pro/dist`, LcpProPath)
    window.webContents.send('msgReceivedVersion', `复制成功`)
  } catch {
    window.webContents.send('msgReceivedVersion', `资产包复制失败`)
    return
  }

  try {
    window.webContents.send('msgReceivedVersion', `开始上传到远程仓库。。。。`)
    const result = cmd.runSync(`
    cd ./${copyName}
    git init
    git add .
    git commit -m autoUpdata
    git push -f http://gitlab.boulderaitech.com/bui/bui-static.git head
  `)
    if (result.err) {
      window.webContents.send('msgReceivedVersion', `上传到远程仓库失败`)
      return
    }
    window.webContents.send('msgReceivedVersion', `上传到远程仓库成功！！`)
  } catch {
    window.webContents.send('msgReceivedVersion', `上传到远程仓库失败`)
    return
  }

  try {
    await fs.remove(`${projectPath}/${createName}`)
    await fs.remove(`${projectPath}/${copyName}`)
    window.webContents.send('msgReceivedVersion', `删除当前目录${createName}-${copyName}成功`)
  } catch {
    window.webContents.send('msgReceivedVersion', `删除当前目录${createName}-${copyName}失败`)
    return
  }

  window.webContents.send('msgReceivedVersion', '同步成功结束！！')
}
