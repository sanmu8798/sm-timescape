<template>
  <div class="map-card" @click="handleClick">
    <div class="map-card-header">
      <div>
        <div class="map-card-title">
          <MapPinned style="line-height: 24px;" :size="16" />
          {{ title }}
        </div>
        <div class="map-card-sub">{{ subtitle }}</div>
      </div>
      <div v-if="badgeText" class="map-card-badge">{{ badgeText }}</div>
    </div>
    <div class="province-grid">
      <div
        v-for="(province, idx) in displayProvinces"
        :key="idx"
        class="province-item"
        :class="{ lit: province.lit, hidden: province.hidden }"
      >
        <div class="province-dot" :class="{ lit: province.lit }">
          <img 
            :src="province.lit ? activeBadge : inactiveBadge" 
            :alt="province.abbr"
            class="badge-img"
          />
        </div>
        <div class="province-name">
          {{ province.name }}<span class="province-abbr">【{{ province.abbr }}】</span>
        </div>
      </div>
    </div>
    <div class="map-progress-bar">
      <div class="map-progress-fill" :style="{ width: progressPercent + '%' }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MapPinned } from 'lucide-vue-next'
import activeBadge from '@/assets/images/beijing-badge-active.png'
import inactiveBadge from '@/assets/images/beijing-badge.png'

const props = defineProps({
  provinces: {
    type: Array,
    default: () => []
  },
  progressPercent: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: '我的探索地图'
  },
  subtitle: {
    type: String,
    default: ''
  },
  badgeText: {
    type: String,
    default: ''
  },
  onlyLight: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const displayProvinces = computed(() => {
  if (!props.onlyLight) return props.provinces
  return props.provinces.filter(p => p.lit)
})

const handleClick = () => {
  emit('click')
}
</script>

<style lang="less" scoped>
.map-card {
  background: linear-gradient(145deg, #1a0f0a, #2d1810);
  border-radius: var(--radius-xl);
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }

  .map-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    position: relative;
    z-index: 2;

    .map-card-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;

      svg {
        color: var(--accent-gold);
      }
    }

    .map-card-sub {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
    }

    .map-card-badge {
      background: linear-gradient(135deg, var(--color-primary-light), var(--accent-gold));
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      color: #fff;
    }
  }

  .province-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px 6px;
    margin-bottom: 16px;
    position: relative;
    z-index: 2;

    .province-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      .province-dot {
        aspect-ratio: 1;
        width: 100%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        cursor: pointer;
        overflow: hidden;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.06);

        .badge-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        &.lit {
          animation: pulse 3s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(212,168,67,0.2);
        }
      }

      .province-name {
        font-size: 8px;
        font-weight: 500;
        color: rgba(255,255,255,0.3);
        text-align: center;
        line-height: 1.2;
        white-space: nowrap;

        .province-abbr {
          opacity: 0.5;
        }
      }

      &.lit .province-name {
        color: var(--accent-gold);

        .province-abbr {
          opacity: 0.7;
        }
      }

      &.hidden {
        opacity: 0;
        pointer-events: none;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
      }
    }
  }

  .map-progress-bar {
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    z-index: 2;

    .map-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-gold), var(--accent-cinnabar));
      border-radius: 2px;
      position: relative;
      transition: width 1s ease;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: -3px;
        width: 10px;
        height: 10px;
        background: var(--accent-gold);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--shadow-color);
        animation: dotPulse 2s ease-in-out infinite;
      }
    }
  }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(212,168,67,0.2); }
  50% { box-shadow: 0 0 20px rgba(212,168,67,0.4); }
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
}
</style>