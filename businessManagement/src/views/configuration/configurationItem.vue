<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane
      :label="item.title"
      :name="item.name"
      v-for="(item, index) in topMenus"
      v-bind:key="item.title + index"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import multiLanguage from "./components/multiLanguage.vue";
export default defineComponent({
  name: "App",
  components: { multiLanguage },
  data() {},
  setup() {
    function handleClick(tab, event) {
      activeName.value = tab.props.name;
    }
    let Component = ref("multiLanguage");
    let activeName = ref("multiLanguage");
    let topMenus = ref([
      {
        title: "多语言设置",
        name: "multiLanguage",
      },
      {
        title: "其他项待定",
        name: "",
      },
    ]);
    return {
      topMenus,
      handleClick,
      activeName,
      Component,
    };
  },
});
</script>
<style >
</style>