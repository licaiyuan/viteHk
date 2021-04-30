<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {},
});
</script>
<style >
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
}
html {
  width: 100%;
  height: 100%;
}
</style>