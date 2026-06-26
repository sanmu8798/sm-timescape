<template>
  <nav class="tab-bar">
    <div class="tab-bar-inner">
      <router-link
        v-for="tab in tabs"
        :key="tab.name"
        :to="{ name: tab.name }"
        class="tab-item"
        :class="{ 'tab-item--active': isActive(tab.name) }"
      >
        <div class="tab-icon-wrapper">
          <component
            :is="tab.icon"
            :size="tab.isCenter ? 28 : 22"
            :color="tab.isCenter ? '#fff' : isActive(tab.path) ? '#1a1a2e' : '#94a3b8'"
            :stroke-width="tab.isCenter ? 2.5 : 1.8"
          />
        </div>
        <span class="tab-label">{{ tab.label }}</span>
      </router-link>
    </div>
    <button class="tab-center" @click="goCheckIn">
      <div class="tab-center-glow" />
      <Plus :size="28" :color="'#fff'" :stroke-width="2.5" />
    </button>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Home, Map, Plus, Users, User } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const tabs = [
  { label: "首页", name: "Index", icon: Home, isCenter: false },
  { label: "发现", name: "Discover", icon: Map, isCenter: false },
  { label: "广场", name: "Square", icon: Users, isCenter: false },
  { label: "我的", name: "Profile", icon: User, isCenter: false },
];

const isActive = computed(() => {
  return (name) => {
    return route.name === name;
  };
});

const goCheckIn = () => {
  alert('打卡功能开发中，敬请期待');
};
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom, 0);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);

  .tab-bar-inner {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 52px;
    padding: 0 6px;
    position: relative;

    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      gap: 2px;
      height: 100%;
      text-decoration: none;
      position: relative;
      transition: all 0.25s ease;

      &:active {
        transform: scale(0.92);
      }

      .tab-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.25s ease;
        padding: 4px;
        border-radius: 8px;
      }

      .tab-label {
        font-size: 10px;
        font-weight: 500;
        color: var(--text-tertiary);
        transition: color 0.25s ease;
        white-space: nowrap;
        line-height: 1;
      }

      &--active {
        .tab-label {
          color: var(--color-primary);
          font-weight: 700;
        }

        .tab-icon-wrapper {
          background: var(--bg-card);
          box-shadow: 0 2px 8px var(--shadow-color);
        }
      }
    }
  }

  .tab-center {
    position: absolute;
    left: 50%;
    top: -18px;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, var(--accent-cinnabar) 0%, var(--accent-yellow) 50%, var(--accent-cinnabar) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 2px 10px rgba(226, 85, 61, 0.35),
      0 1px 4px rgba(240, 214, 138, 0.25);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:active {
      transform: translateX(-50%) scale(0.9);
    }

    .tab-center-glow {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-cinnabar) 0%, var(--accent-yellow) 50%, var(--accent-cinnabar) 100%);
      opacity: 0.25;
      animation: centerPulse 2.5s ease-in-out infinite;
      z-index: -1;
    }
  }
}

@keyframes centerPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>