<template>
  <div class="app-container">
    <router-view />
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TabBar from "@/components/TabBar.vue";

const route = useRoute();

const HIDE_TAB_BAR_NAMES = ["Login", "Register"];

const showTabBar = computed(() => {
  return !HIDE_TAB_BAR_NAMES.includes(route.name);
});
</script>

<style lang="less" scoped>
.app-container {
  height: 100%;
  position: relative;
}
</style>