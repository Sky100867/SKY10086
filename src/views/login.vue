<template>
  <div class="" style="background-color: #2d4c6a; height: 100vh">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <div style="height: 220px"></div>
      <div
        style="
          width: 350px;
          height: 250px;
          margin: 0 auto;
          background-color: white;
          padding: 40px;
          text-align: center;
        "
      >
        <span><img src="../assets//logo.png" alt="" style="width: 100px; height: 100px;" /></span>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getlogin } from "../http/api";
const store = useStore();
const router = useRouter();
const route = useRoute();
const data = reactive({});
const ruleFormRef = ref([])
const ruleForm = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "输入用户名最小5最大10", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 10, message: "输入密码最小5最大10", trigger: "blur" },
  ],
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      getlogin(ruleForm).then((res) => {
        console.log(res);
        if(res.status==200){
            localStorage.setItem("token",res.data.data.token)
            router.push("/index")
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang='scss'>
</style>
