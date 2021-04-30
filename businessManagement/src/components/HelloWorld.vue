<template>
  <div>用户列表</div>
</template>

<script>
import axios from "axios";
import { configRequest } from "../api/account/login";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  mounted() {},
  created() {},
};
</script>
