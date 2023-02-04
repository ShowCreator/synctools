/*
 * @Author: sfy
 * @Date: 2023-02-04 18:14:29
 * @LastEditors: sfy
 * @LastEditTime: 2023-02-04 18:14:30
 * @FilePath: /synctools-master/src/renderer/index.d.ts
 * @Description: update here
 */
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
