<template>
  <div class="page-home tabber-page">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-pattern" />

      <!-- Nav Header -->
      <div class="nav-header">
        <div class="logo">
          <div class="logo-icon">
            <Flag :size="20" />
          </div>
          <div>
            <div class="logo-text">点亮中国</div>
            <div class="logo-sub">LIGHT UP CHINA</div>
          </div>
        </div>
        <div class="nav-actions">
          <div class="avatar-sm" @click="goToProfile">
            <div class="avatar-inner">
              <img v-if="user?.avatar" :src="user.avatar" />
              <User v-else :size="20" />
            </div>
             <div class="avatar-name">
              <template v-if="user?.id">
                <div>{{ user.username }}</div>
                <div class="num-text">ID: {{ user.id }}</div>
              </template>
              <template v-else>
                  <div>未登录</div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="hero-content">
        <div class="greeting">{{ state.greeting }}</div>
        <div class="hero-title">
          已点亮 <span class="highlight">{{ state.visitedCities }}</span> 个省份<br>
          继续探索你的旅途徽章
        </div>

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-number">{{ state.visitedCities }}</div>
            <div class="stat-label">点亮城市</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ state.badgeCount }}</div>
            <div class="stat-label">成就徽章</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ state.activityCount }}</div>
            <div class="stat-label">发表动态</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">

      <!-- Quick Actions -->
      <div class="quick-actions">
        <div class="quick-action" @click="goToCitiesLit">
          <div class="quick-action-icon red">
            <Globe :size="22" />
          </div>
          <span class="quick-action-label">点亮地图</span>
        </div>
        <div class="quick-action" @click="goToBadges">
          <div class="quick-action-icon gold">
            <Trophy :size="22" />
          </div>
          <span class="quick-action-label">成就墙</span>
        </div>
        <div class="quick-action" @click="goToFoodList">
          <div class="quick-action-icon cinnabar">
            <Utensils :size="22" />
          </div>
          <span class="quick-action-label">美食图鉴</span>
        </div>
        <div class="quick-action" @click="goToFootprints">
          <div class="quick-action-icon purple">
            <Footprints :size="22" />
          </div>
          <span class="quick-action-label">旅行足迹</span>
        </div>
      </div>

      <!-- Map Progress Component -->
      <MapCard
          :provinces="state.provinces"
          :progress-percent="state.mapProgress"
          title="我的探索地图"
          :subtitle="`已解锁 ${state.visitedCities}/34 省份`"
          :badge-text="`Lv.${state.level} ${state.levelTitle}`"
          only-light
          @click="goToCitiesLit"
      />

      <!-- Promo Banner -->
      <div class="promo-banner" @click="goToTopic">
        <div class="promo-text">
          <div class="promo-title">
            <Globe :size="16" />
            丝绸之路专题上线
          </div>
          <div class="promo-desc">沿着古丝路探索12座城市</div>
        </div>
        <div class="promo-btn">去探索</div>
      </div>

      <!-- Featured Destinations -->
      <div class="section-header">
        <div class="section-title">
          <Sparkles :size="20" />
          热门目的地
        </div>
        <div class="section-more" @click="goToCityList">
          查看全部
          <ChevronRight :size="14" />
        </div>
      </div>
      <div class="destinations-scroll">
        <div
            v-for="(city, id) in state.featuredCities"
            :key="city.id"
            class="dest-card"
            @click="goToCityDetail(city.id)"
        >
          <img :src="city.image" :alt="city.name" class="dest-img" loading="lazy" />
          <div class="dest-overlay">
            <div class="dest-info">
              <div class="dest-name">{{ city.name }}</div>
              <div class="desc">{{ city.desc }}</div>
              <div class="dest-meta">
                <div class="rating">
                  <Star :size="12" />
                  {{ city.rating }}
                </div>
                <div class="checkins">{{ city.checkIns }}次打卡</div>
              </div>
              <div class="dest-tags">
                <span v-for="tag in city.tags" :key="tag" class="dest-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Food Discovery -->
      <div class="section-header">
        <div class="section-title">
          <Utensils :size="20" />
          美食发现
        </div>
        <div class="section-more" @click="goToFoodList">
          更多美食
          <ChevronRight :size="14" />
        </div>
      </div>
      <div class="food-list">
        <div
            v-for="(food, id) in state.foodItems"
            :key="food.id"
            class="food-item"
            @click="goToFoodDetail(food.id)"
        >
          <img :src="food.image" :alt="food.name" class="food-img" loading="lazy" />
          <div class="food-content">
            <div class="food-header">
              <div class="food-name">{{ food.name }}</div>
              <div class="food-status-badge" :class="food.status">{{ food.statusText }}</div>
            </div>
            <div class="food-origin">{{ food.origin }}</div>
            <div class="food-meta">
              <span class="food-rating">
                <Star :size="12" />
                {{ food.rating }}
              </span>
              <span class="food-checkins">{{ food.checkIns }}次打卡</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Footprints -->
      <div class="section-header">
        <div class="section-title">
          <Footprints :size="20" />
          最近印迹
        </div>
        <div class="section-more" @click="goToFootprints">
          查看全部
          <ChevronRight :size="14" />
        </div>
      </div>
      <div class="footprints-list">
        <div
            v-for="(item, id) in state.footprints"
            :key="item.id"
            class="footprint-item"
        >
          <div class="footprint-left">
            <div class="footprint-connector" />
            <div class="footprint-node"></div>
            <div class="footprint-month" v-if="showMonthLabel(id)">{{ formatMonth(item.time) }}</div>
          </div>
          <div class="footprint-card" @click="goToFootprintDetail(item.id)">
            <img :src="item.image" :alt="item.name" class="footprint-img" loading="lazy" />
            <div class="footprint-info">
              <div class="footprint-name">{{ item.name }}</div>
              <div class="footprint-city">{{ item.city }}</div>
              <div class="footprint-time">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Flag, Bell, User, Globe, Trophy, Utensils, Footprints,Sparkles, ChevronRight, Star } from 'lucide-vue-next'
import MapCard from '@/components/MapCard.vue'
import { mockHomeData } from '@/mock/home'
import { useUserStore } from "@/stores/index";

const router = useRouter()

const state = reactive({
  ...mockHomeData,
  greeting: "你好，旅行者",
})

const userStore = useUserStore();
const user = computed(() => userStore.user)

onMounted(() => {
  getGreeting()
})

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) {
    state.greeting = '早安，旅行者'
  } else if (hour < 18) {
    state.greeting = '午安，旅行者'
  } else {
    state.greeting = '晚安，旅行者'
  }
}

const goToProfile = () => {
  if (!user.value) {
    router.push({ name: 'Login' })
    return
  }
  router.push({ name: 'Profile' })
}
const goToCityList = () => router.push({ name: 'Cities' })
const goToCityDetail = (id) => router.push({ name: 'CityDetail', params: { id } })
const goToCitiesLit = () => router.push({ name: 'CitiesLit' })
const goToBadges = () => router.push({ name: 'Badges' })
const goToTopic = () => router.push({ name: 'Topic', params: { id: '1' } })
const goToFoodList = () => router.push({ name: 'Food' })
const goToFoodDetail = (id) => router.push({ name: 'FoodDetail', params: { id } })
const goToFootprints = () => router.push({ name: 'Footprints' })
const goToFootprintDetail = (id) => router.push({ name: 'FootprintDetail', params: { id } })

const formatMonth = (time) => {
  const date = new Date(time)
  return date.toLocaleDateString('zh-CN', { month: '2-digit' }).replace(/^\//, '')
}

const showMonthLabel = (idx) => {
  if (idx === 0) return true
  const current = state.footprints[idx].time
  const prev = state.footprints[idx - 1].time
  const currDate = new Date(current)
  const prevDate = new Date(prev)
  // 同时比较年份和月份，只有当年月都相同时才不显示
  return currDate.getFullYear() !== prevDate.getFullYear() || currDate.getMonth() !== prevDate.getMonth()
}
</script>

<style lang="less" scoped>
.page-home {
  background: var(--bg-primary);
  position: relative;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.1;
    pointer-events: none;
    z-index: 1000;
  }

  .hero {
    // background: linear-gradient(165deg, #1a0f0a 0%, #2d1810 35%, #4a1e12 70%, #c23b22 100%);
    background: var(--linear-gradient);
    padding: 0 var(--spacing-md) 30px;
    position: relative;
    overflow: hidden;
    border-radius: 0 0 32px 32px;

    &::before {
      content: '';
      position: absolute;
      top: -60%;
      right: -30%;
      width: 400px;
      height: 400px;
      background: var(--radial-gradient);
      border-radius: 50%;
      animation: floatGlow 6s ease-in-out infinite;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -20%;
      left: -20%;
      width: 300px;
      height: 300px;
      background: var(--radial-gradient-light);
      border-radius: 50%;
      animation: floatGlow 8s ease-in-out infinite reverse;
    }

    .hero-pattern {
      position: absolute;
      top: 0;
      right: 0;
      width: 180px;
      height: 180px;
      opacity: 0.06;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23d4a843' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='35' fill='none' stroke='%23d4a843' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='25' fill='none' stroke='%23d4a843' stroke-width='0.5'/%3E%3Cpath d='M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M82 18 L18 82' stroke='%23d4a843' stroke-width='0.3'/%3E%3C/svg%3E");
      animation: rotateSlowly 60s linear infinite;
    }

    .nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      position: relative;
      z-index: 5;

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;

        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--accent-gold), #e2553d);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 2px 12px var(--bg-overlay);
        }

        .logo-text {
          font-weight: 700;
          font-size: 20px;
          color: #fff;
          letter-spacing: 2px;
        }

        .logo-sub {
          font-size: 10px;
          color: var(--accent-yellow);
          font-weight: 300;
          letter-spacing: 1px;
          margin-top: -2px;
        }
      }

      .nav-actions {
        display: flex;
        gap: 12px;
        align-items: center;
        color: #fff;

        .avatar-sm {
         display: flex;
         align-items: center;
         gap: 4px;

          .avatar-inner {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          overflow: hidden;
           border: 2px solid var(--color-primary-light);
            background: linear-gradient(135deg, var(--accent-yellow), var(--accent-gold));
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .avatar-name{
            .num-text{
              font-size: 10px;
              font-weight: 300;
              color: var(--accent-yellow);
            }
          }
        }
      }
    }

    .hero-content {
      position: relative;
      z-index: 5;
      padding-top: 8px;

      .greeting {
        color: rgba(255,255,255,0.6);
        font-size: 13px;
        font-weight: 300;
        margin-bottom: 4px;
      }

      .hero-title {
        font-size: 26px;
        font-weight: 700;
        color: #fff;
        line-height: 1.3;
        margin-bottom: 20px;

        .highlight {
          background: linear-gradient(90deg, var(--accent-gold), var(--accent-yellow));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      .stats-row {
        display: flex;
        gap: 0;
        background: rgba(255,255,255,0.08);
        border-radius: var(--radius-lg);
        border: 1px solid rgba(255,255,255,0.06);
        backdrop-filter: blur(10px);
        overflow: hidden;

        .stat-item {
          flex: 1;
          text-align: center;
          padding: 14px 8px;
          position: relative;

          &:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 20%;
            height: 60%;
            width: 1px;
            background: rgba(255,255,255,0.1);
          }

          .stat-number {
            font-size: 22px;
            font-weight: 700;
            color: var(--accent-yellow);
          }

          .stat-label {
            font-size: 11px;
            color: rgba(255,255,255,0.5);
            margin-top: 2px;
          }
        }
      }
    }
  }

  .main-content {
    padding: 20px var(--spacing-md) 0 var(--spacing-md);

    .quick-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;

      .quick-action {
        flex: 1;
        background: var(--bg-card);
        border-radius: var(--radius-lg);
        padding: 5px 8px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:active {
          transform: scale(0.95);
        }

        .quick-action-icon {
          width: 44px;
          height: 44px;
          margin: 0 auto 6px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;

          &.red { background: linear-gradient(135deg, var(--accent-yellow), #e2553d); color: #fff; }
          &.gold { background: linear-gradient(135deg, var(--accent-gold), var(--accent-yellow)); color: #fff; }
          &.cinnabar { background: linear-gradient(135deg, #e2553d, #ff7f50); color: #fff; }
          &.purple { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; }
        }

        .quick-action-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
        }
      }
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .section-title {
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-primary);

        svg {
          color: var(--accent-cinnabar);
        }
      }

      .section-more {
        font-size: 12px;
        color: var(--text-tertiary);
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
      }
    }

    .promo-banner {
      background: linear-gradient(135deg, #2a7a5e, var(--accent-green));
      border-radius: var(--radius-md);
      padding: 16px 18px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: transform 0.3s ease;
      position: relative;
      overflow: hidden;

      &:active {
        transform: scale(0.98);
      }

      &::before {
        content: '';
        position: absolute;
        top: -30%;
        right: -10%;
        width: 120px;
        height: 120px;
        background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
        border-radius: 50%;
      }

      .promo-text {
        z-index: 2;

        .promo-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .promo-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.7);
        }
      }

      .promo-btn {
        background: rgba(255,255,255,0.2);
        color: #fff;
        border: 1px solid rgba(255,255,255,0.3);
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        z-index: 2;
        white-space: nowrap;
      }
    }

    .destinations-scroll {
      display: flex;
      gap: 14px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 20px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;

      .dest-card {
        min-width: 200px;
        height: 140px;
        border-radius: var(--radius-xl);
        overflow: hidden;
        position: relative;
        cursor: pointer;
        transition: transform 0.3s ease;
        scroll-snap-align: start;
        flex-shrink: 0;
        box-shadow: var(--shadow-card);

        &:active {
          transform: scale(0.96);
        }

        .dest-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .dest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 100%);
          display: flex;
          align-items: flex-end;
          padding: 12px;

          .dest-info {
            position: relative;
            z-index: 2;

            .dest-name {
              font-size: 16px;
              font-weight: 700;
              color: #fff;
              margin-bottom: 3px;
            }

            .desc {
              font-size: 11px;
              color: rgba(255,255,255,0.7);
              margin-bottom: 8px;
            }

            .dest-meta {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 8px;

              .rating {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 12px;
                font-weight: 600;
                color: #fbbf24;
              }

              .checkins {
                font-size: 10px;
                color: rgba(255,255,255,0.6);
              }
            }

            .dest-tags {
              display: flex;
              gap: 4px;
              flex-wrap: wrap;

              .dest-tag {
                font-size: 9px;
                padding: 3px 8px;
                background: rgba(255,255,255,0.15);
                backdrop-filter: blur(8px);
                border-radius: 20px;
                color: #fff;
                border: 1px solid rgba(255,255,255,0.1);
              }
            }
          }
        }
      }
    }

    .badges-scroll {
      display: flex;
      gap: 14px;
      overflow-x: auto;
      padding-bottom: 4px;
      margin-bottom: 20px;
      -webkit-overflow-scrolling: touch;

      .badge-item {
        text-align: center;
        flex-shrink: 0;
        width: 72px;
        cursor: pointer;

        .badge-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.3s ease;

          &.unlocked {
            background: linear-gradient(135deg, #fdf3d7, #f5e4b5);
            border: 2px solid var(--accent-gold);
            box-shadow: 0 4px 16px rgba(212,168,67,0.25);
            color: var(--accent-gold);
          }

          &.locked {
            background: #f0ebe3;
            border: 2px dashed rgba(0,0,0,0.1);
            color: var(--text-tertiary);
            opacity: 0.5;
          }

          .lock {
            position: absolute;
            bottom: -2px;
            right: -2px;
            background: #fff;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          }
        }

        &:active .badge-icon {
          transform: scale(0.9);
        }

        .badge-name {
          font-size: 10px;
          color: var(--text-secondary);
          font-weight: 500;
          line-height: 1.3;
        }
      }
    }

    .food-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;

      .food-item {
        display: flex;
        align-items: center;
        gap: 14px;
        background: var(--bg-card);
        border-radius: var(--radius-lg);
        padding: 14px;
        box-shadow: var(--shadow-card);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid var(--border-color-light);

        &:active {
          transform: scale(0.98);
          box-shadow: var(--shadow-sm);
        }

        .food-img {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-md);
          object-fit: cover;
          flex-shrink: 0;
        }

        .food-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;

          .food-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .food-name {
              font-size: 16px;
              font-weight: 700;
              color: var(--text-primary);
            }

            .food-status-badge {
              font-size: 10px;
              padding: 4px 10px;
              border-radius: 20px;
              font-weight: 600;

              &.done {
                background: linear-gradient(135deg, rgba(42,122,94,0.12), rgba(42,122,94,0.06));
                color: var(--accent-jade);
                border: 1px solid rgba(42,122,94,0.15);
              }

              &.new {
                background: linear-gradient(135deg, rgba(194,59,34,0.1), rgba(194,59,34,0.05));
                color: var(--accent-red);
                border: 1px solid rgba(194,59,34,0.12);
              }
            }
          }

          .food-origin {
            font-size: 12px;
            color: var(--text-secondary);
          }

          .food-meta {
            display: flex;
            align-items: center;
            gap: 12px;

            .food-rating {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              font-weight: 600;
              color: #fbbf24;
            }

            .food-checkins {
              font-size: 11px;
              color: var(--text-tertiary);
            }
          }
        }
      }
    }

    .footprints-list {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      .footprint-item {
        display: flex;
        position: relative;

        .footprint-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 32px;
          flex-shrink: 0;
          padding: 10px 0 0;
          margin-left: -5px;

          .footprint-connector {
            position: absolute;
            top: 28px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: calc(100% + 12px);
            background: linear-gradient(to bottom, var(--accent-gold), rgba(212,168,67,0.08));
          }

          .footprint-node {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--bg-card);
            border: 2px solid var(--accent-gold);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-gold);
            position: relative;
            z-index: 2;
            box-shadow: 0 0 0 4px rgba(212,168,67,0.08);
          }

          .footprint-month {
            font-size: 12px;
            color: var(--text-secondary);
            position: absolute;
            top: 20px;
            transform: translateY(-50%);
            left: 25px;
            width: 100%;
            text-align: center;
            line-height: 1.3;
            z-index: 1;
          }
        }

        &:last-child {
          .footprint-left {
            .footprint-connector {
              height: calc(50% + 12px);
            }
          }
        }

        .footprint-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 12px 16px;
          margin: 8px 0 8px 30px;
          box-shadow: var(--shadow-card);
          border: 1px solid var(--border-color-light);
          cursor: pointer;
          transition: all 0.3s ease;

          &:active {
            transform: scale(0.98);
            box-shadow: var(--shadow-sm);
          }

          .footprint-img {
            width: 56px;
            height: 56px;
            border-radius: var(--radius-md);
            object-fit: cover;
            flex-shrink: 0;
          }

          .footprint-info {
            flex: 1;
            min-width: 0;

            .footprint-name {
              font-size: 14px;
              font-weight: 700;
              color: var(--text-primary);
              margin-bottom: 3px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .footprint-city {
              font-size: 12px;
              color: var(--text-secondary);
              margin-bottom: 2px;
            }

            .footprint-time {
              font-size: 11px;
              color: var(--text-tertiary);
            }
          }
        }
      }
    }
  }
}

@keyframes floatGlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.1); }
}

@keyframes rotateSlowly {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>