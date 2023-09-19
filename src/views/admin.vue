<template>
  <div class="">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <div style="display: flex">
        <el-form-item>
          <el-input
            v-model="params.query"
            style="width: 400px"
            placeholder="请输入搜索内容"
          />
        </el-form-item>
        <el-button style="margin-left: 20px" @click="sou">搜索</el-button>
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      </div>
    </el-form>

    <!-- 用户数据 -->
    <el-table :data="listk" style="width: 100%">
      <el-table-column prop="id" label="#" />
      <el-table-column prop="username" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="create_time" label="电话" />
      <el-table-column prop="role_name" label="角色" />
      <el-table-column prop="mg_state" label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.mg_state" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            @click="bian(scope.row), (dialogVisible1 = true)"
            >修改</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加模态框 -->
    <el-dialog v-model="dialogVisible" title="添加模态框" width="30%">
      <span>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm.mobile" />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef), (dialogVisible = false)"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑模态框 -->
    <el-dialog v-model="dialogVisible1" title="编辑模态框" width="30%">
      <span>
        <el-form
          ref="ruleFormRef1"
          :model="ruleForm1"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm1.username" disabled />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm1.email" />
          </el-form-item>
          <el-form-item label="电话" prop="create_time">
            <el-input v-model="ruleForm1.create_time" disabled />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm1(ruleFormRef1), (dialogVisible1 = false)"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-pagination
      v-model:current-page="currentPage1"
      :page-size="100"
      layout="prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getusers, gettian, getshan, getbian } from "../http/api";
import { ElMessage, ElMessageBox } from "element-plus";
const store = useStore();
const router = useRouter();
const currentPage1 = ref(1)
const ruleFormRef = ref([]);
const ruleFormRef1 = ref([]);
const dialogVisible = ref(false);
const dialogVisible1 = ref(false);
const route = useRoute();
const data = reactive({});
const handleSizeChange = (e)=>{}
const handleCurrentChange = (e)=>{
  params.pagenum=e
  getlistFn();
}
const params = reactive({
  query: "",
  pagenum: 1,
  pagesize: 10,
});
const listk = ref([]);
const getlistFn = () => {
  getusers(params).then((res) => {
    console.log(res);
    listk.value = res.data.data.users;
  });
};
getlistFn();
//搜索
const sou = () => {
  getlistFn();
};
const ruleForm = reactive({
  username: "",
  password: "",
  email: "",
  mobile: "",
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
  ],
  mobile: [
    { required: true, message: "请输入电话", trigger: "blur" },
    { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
  ],
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      gettian(ruleForm).then((res) => {
        console.log(res);
        getlistFn();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
//删除
const del = (id) => {
  console.log(id);
  ElMessageBox.confirm("确定要删除吗?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      getshan(id).then((res) => {
        getlistFn();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
//编辑
const ruleForm1 = reactive({
  username: "",
  password: "",
  email: "",
  create_time: "",
});
const bian = (row) => {
  ruleForm1.id = row.id;
  ruleForm1.username = row.username;
  ruleForm1.email = row.email;
  ruleForm1.create_time = row.create_time;
};

const submitForm1 = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      getbian(ruleForm1).then((res) => {
        console.log(res);
        getlistFn();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang='scss'>
</style>
