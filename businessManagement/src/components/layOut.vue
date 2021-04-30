<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        :label="item.title"
        :name="item.title"
        v-for="(item, index) in topMenus"
        v-bind:key="item.title + index"
      ></el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
export default {
  name: "layOut",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  setup() {
    const topMenus = ref([
      {
        title: "花开APP",
        content: [
          {
            secondaryHeading: "用户",
            title: "用户中心",
            content: [
              {
                title: "账户管理",
                content: [
                  { title: "用户列表", path: "" },
                  { title: "用户分群", path: "" },
                  { title: "用户标签", path: "" },
                ],
              },
              {
                title: "用户处罚",
                content: [
                  { title: "封禁管理", path: "" },
                  { title: "罚款管理", path: "" },
                  { title: "敏感事件", path: "" },
                ],
              },
              {
                title: "忠诚度管理",
                content: [
                  { title: "等级管理", path: "" },
                  { title: "特权管理", path: "" },
                  { title: "任务管理", path: "" },
                ],
              },
            ],
          },
        ],
      },
      { title: "富贵APP", content: {} },
      { title: "推广与公会", content: {} },
      { title: "系统设置", content: {} },
    ]);
    return {
      topMenus,
    };
  },
  mounted() {},
  created() {
   
  },
};
</script>
