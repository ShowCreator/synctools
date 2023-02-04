<!--
 * @Author: sfy
 * @Date: 2023-02-04 18:10:07
 * @LastEditors: sfy
 * @LastEditTime: 2023-02-04 23:48:53
 * @FilePath: /synctools-master/src/renderer/pages/Home/Home.vue
 * @Description: update here
-->
<template>
  <div>
    <v-btn elevation="2" @click="onSyncClick"> 一键同步资源包</v-btn>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title v-for="(item, index) in processList" :key="index">{{
          item
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { makeSync } from '@/renderer/utils'
export default defineComponent({
  setup() {
    const processList = ref<string[]>([])
    onMounted((): void => {
      // Get application version from package.json version string (Using IPC communication)
      window.mainApi.receive('msgReceivedVersion', (message: string) => {
        console.log(message, 'message')
        processList.value?.push(message)
      })
    })
    const onSyncClick = async () => {
      await makeSync()
    }

    return {
      processList,
      onSyncClick
    }
  }
})
</script>
