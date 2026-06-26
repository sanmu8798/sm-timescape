<template>
  <div class="page-profile">
    <div class="profile-hero">
      <div class="profile-hero-bg" />
      <div class="profile-hero-content">
        <div class="profile-avatar">
          <img v-if="user?.avatar" :src="user.avatar" :alt="user.username" />
          <User v-else :size="40" />
        </div>
        <div class="profile-info">
          <h1 class="profile-name">{{ user?.username || '游客' }}</h1>
          <p class="profile-id">ID: {{ user?.id || '--' }}</p>
        </div>
      </div>
    </div>

    <div class="profile-stats">
      <div class="stat-box">
        <span class="stat-value">{{ state.checkIns.length }}</span>
        <span class="stat-label">打卡</span>
      </div>
      <div class="stat-box">
        <span class="stat-value">{{ state.visitedCities }}</span>
        <span class="stat-label">城市</span>
      </div>
      <div class="stat-box">
        <span class="stat-value">0</span>
        <span class="stat-label">徽章</span>
      </div>
    </div>

    <div class="profile-menu">
      <div class="menu-group">
        <div class="menu-item" @click="goToCheckIns">
          <div class="menu-icon">
            <Camera :size="20" />
          </div>
          <span class="menu-text">我的打卡</span>
          <ChevronRight :size="18" class="menu-arrow" />
        </div>
        <div class="menu-item" @click="goToCitiesLit">
          <div class="menu-icon">
            <Globe :size="20" />
          </div>
          <span class="menu-text">点亮城市</span>
          <ChevronRight :size="18" class="menu-arrow" />
        </div>
        <div class="menu-item" @click="goToBadges">
          <div class="menu-icon">
            <Award :size="20" />
          </div>
          <span class="menu-text">成就徽章</span>
          <ChevronRight :size="18" class="menu-arrow" />
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="goToFavorites">
          <div class="menu-icon">
            <Star :size="20" />
          </div>
          <span class="menu-text">我的收藏</span>
          <ChevronRight :size="18" class="menu-arrow" />
        </div>
        <div class="menu-item" @click="goToSettings">
          <div class="menu-icon">
            <Settings :size="20" />
          </div>
          <span class="menu-text">设置</span>
          <ChevronRight :size="18" class="menu-arrow" />
        </div>
        <div class="menu-item" @click="goToAbout">
          <div class="menu-icon">
            <Info :size="20" />
          </div>
          <span class="menu-text">关于我们</span>
          <ChevronRight :size="18" class="menu-arrow" />
        </div>
      </div>
    </div>

    <button v-if="user" class="logout-btn" @click="handleLogout">
      <LogOut :size="18" />
      <span>退出登录</span>
    </button>
    <button v-else class="logout-btn login-btn" @click="goToLogin">
      <span>去登录</span>
    </button>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  User, Camera, Star, Settings, Info, Award, ChevronRight, LogOut, Globe
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/index'
import { mockCheckIns } from '@/mock/checkin'

const router = useRouter()
const userStore = useUserStore()

const user = computed(() => userStore.user)

const state = reactive({
  checkIns: [],
  visitedCities: 0
})

onMounted(() => {
  if (!user.value) return
  state.checkIns = mockCheckIns.filter(c => c.userId === user.value.id)
  const uniqueCities = new Set(state.checkIns.map(c => c.cityName))
  state.visitedCities = uniqueCities.size
})

const handleLogout = () => {
  userStore.logout()
  router.push({ name: 'Login' })
}

const goToLogin = () => router.push({ name: 'Login' })
const goToCheckIns = () => router.push({ name: 'Profile' })
const goToCitiesLit = () => router.push({ name: 'CitiesLit' })
const goToBadges = () => router.push({ name: 'Badges' })
const goToFavorites = () => console.log('Navigate to: favorites')
const goToSettings = () => console.log('Navigate to: settings')
const goToAbout = () => console.log('Navigate to: about')
</script>

<style lang="less" scoped>
.page-profile {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 40px;

  .profile-hero {
    position: relative;
    padding: 60px var(--spacing-md) 40px;
    background: var(--linear-gradient);
    border-radius: 0 0 32px 32px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -40%;
      right: -20%;
      width: 260px;
      height: 260px;
      background: var(--radial-gradient);
      border-radius: 50%;
      opacity: 0.6;
    }

    .profile-hero-bg {
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23d4a843' stroke-width='0.4' opacity='0.3'/%3E%3Ccircle cx='50' cy='50' r='35' fill='none' stroke='%23d4a843' stroke-width='0.4' opacity='0.3'/%3E%3Ccircle cx='50' cy='50' r='25' fill='none' stroke='%23d4a843' stroke-width='0.4' opacity='0.3'/%3E%3C/svg%3E");
      opacity: 0.15;
    }

    .profile-hero-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 18px;

      .profile-avatar {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid rgba(255, 255, 255, 0.25);
        background: var(--bg-overlay);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .profile-info {
        .profile-name {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
        }

        .profile-id {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }
      }
    }
  }

  .profile-stats {
    display: flex;
    margin: -24px var(--spacing-md) 24px;
    padding: 20px 0;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    box-shadow: 0 4px 20px var(--shadow-color);
    position: relative;
    z-index: 2;

    .stat-box {
      flex: 1;
      text-align: center;

      &:not(:last-child) {
        border-right: 1px solid var(--border-color);
      }

      .stat-value {
        display: block;
        font-size: 24px;
        font-weight: 800;
        color: var(--color-primary);
        margin-bottom: 2px;
      }

      .stat-label {
        font-size: 12px;
        color: var(--text-secondary);
      }
    }
  }

  .profile-menu {
    padding: 0 var(--spacing-md);

    .menu-group {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      margin-bottom: 12px;
      overflow: hidden;

      .menu-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px;
        cursor: pointer;
        transition: background 0.2s ease;

        &:not(:last-child) {
          border-bottom: 1px solid var(--border-color);
        }

        &:active {
          background: var(--bg-secondary);
        }

        .menu-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
        }

        .menu-text {
          flex: 1;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .menu-arrow {
          color: var(--text-tertiary);
        }
      }
    }
  }

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: calc(100% - var(--spacing-md) * 2);
    margin: 32px var(--spacing-md) 0;
    padding: 15px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--accent-red);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:active {
      background: rgba(194, 59, 34, 0.05);
    }

    &.login-btn {
      color: var(--color-primary);
    }
  }
}
</style>
