<template>
  <div id="app">
    <topo />
    <router-view />
  </div>
</template>

<script>
import Topo from "./components/Topo.vue";
export default {
  name: "App",
  components: {
    Topo
  }
};
</script>

<style>
body {
  zoom: 90%;
}
</style>
