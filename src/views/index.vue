<template>
  <div class="common-layout">
    <el-container>
      <el-header class="sky_Header">
        <span>电商后台管理系统</span>
        <el-button type="info" @click="tui">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height: 100vh;background-color: #333744;">
          <el-menu default-active="2" class="el-menu-vertical-demo"  router>
            <el-sub-menu
              :index="item.path"
              v-for="(item, index) in menus"
              :key="index"
              style="background-color: #333744;"
            >
              <template #title>
                <span style="color: white;">{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="/admin"
                  v-for="(ele, ind) in item.children"
                  :key="ind"
                >
                  {{ ele.authName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main> <router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getcebian } from "../http/api";
const store = useStore();
const router = useRouter();
const route = useRoute();
const data = reactive({});
const menus = ref([]);
getcebian().then((res) => {
  console.log(res);
  menus.value = res.data.data;
});
const tui = ()=>{
    localStorage.removeItem("token")
    router.push('/')
}
</script>

<style lang='scss'>
.sky_Header {
  width: 100%;
  height: 60px;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
</style>
