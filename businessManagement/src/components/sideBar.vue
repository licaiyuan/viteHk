<template>
  <div>
    sideBar
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
  setup() {},
  mounted() {},
  created() {},
};
</script>
