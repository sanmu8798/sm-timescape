<template>
  <div class="page-square">
    <div class="square-header">
      <h1 class="square-title">广场</h1>
      <p class="square-subtitle">探索旅行者的精彩瞬间</p>
    </div>

    <div class="feed-list">
      <div
        v-for="item in state.feedItems"
        :key="item.id"
        class="feed-card"
        @click="goToDetail(item.id)"
      >
        <div class="feed-header">
          <div class="feed-user">
            <div class="user-avatar">
              <img v-if="item.avatar" :src="item.avatar" :alt="item.username" />
              <User v-else :size="18" />
            </div>
            <div class="user-meta">
              <span class="username">{{ item.username }}</span>
              <span class="post-time">{{ item.formattedTime }}</span>
            </div>
          </div>
          <div class="location-tag">
            <MapPin :size="12" />
            <span>{{ item.cityName }}</span>
          </div>
        </div>

        <div class="feed-body">
          <p class="feed-text">{{ item.content }}</p>

          <div v-if="item.images?.length" class="feed-images" :class="'image-count-' + Math.min(item.images.length, 3)">
            <div v-for="(img, idx) in item.images.slice(0, 9)" :key="idx" class="image-item">
              <img :src="img" :alt="item.targetName" loading="lazy" />
            </div>
          </div>

          <div v-if="item.targetName" class="feed-target">
            <Sparkles :size="12" />
            <span>{{ item.targetName }}</span>
          </div>
        </div>

        <div class="feed-footer">
          <div class="action-item" :class="{ liked: item.isLiked }" @click.stop="toggleLike(item)">
            <Heart :size="18" :fill="item.isLiked ? 'var(--accent-red)' : 'none'" :color="item.isLiked ? 'var(--accent-red)' : 'var(--text-secondary)'" />
            <span>{{ item.likeCount }}</span>
          </div>
          <div class="action-item">
            <MessageCircle :size="18" />
            <span>{{ item.commentCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, MapPin, Heart, MessageCircle, Sparkles } from 'lucide-vue-next'
import { mockCheckIns } from '@/mock/checkin'
import { mockUsers } from '@/mock/user'

const router = useRouter()

const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return days + '天前'
  return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}

const getUserById = (userId) => {
  return mockUsers.find((u) => u.id === userId) || { username: '匿名用户' }
}

const state = reactive({
  feedItems: mockCheckIns.map((item) => {
    const user = getUserById(item.userId)
    return {
      ...item,
      username: user.username,
      avatar: user.avatar,
      formattedTime: formatTime(item.createTime),
      likeCount: Math.floor(Math.random() * 200) + 10,
      commentCount: Math.floor(Math.random() * 50) + 2,
      isLiked: false
    }
  })
})

const toggleLike = (item) => {
  item.isLiked = !item.isLiked
  item.likeCount += item.isLiked ? 1 : -1
}

const goToDetail = (id) => {
  router.push({ name: 'SquareDetail', params: { id } })
}
</script>

<style lang="less" scoped>
.page-square {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 24px;

  .square-header {
    padding: 20px var(--spacing-md) 16px;

    .square-title {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 4px;
    }

    .square-subtitle {
      font-size: 13px;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .feed-list {
    padding: 0 var(--spacing-md);

    .feed-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.98);
        background: var(--bg-secondary);
      }

      .feed-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;

        .feed-user {
          display: flex;
          align-items: center;
          gap: 10px;

          .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            background: var(--bg-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            flex-shrink: 0;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .user-meta {
            .username {
              display: block;
              font-size: 14px;
              font-weight: 600;
              color: var(--text-primary);
            }

            .post-time {
              font-size: 12px;
              color: var(--text-tertiary);
            }
          }
        }

        .location-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: var(--bg-secondary);
          border-radius: 20px;
          color: var(--color-primary);
          font-size: 12px;
          font-weight: 500;
        }
      }

      .feed-body {
        .feed-text {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-primary);
          margin: 0 0 12px;
        }

        .feed-images {
          display: grid;
          gap: 6px;
          margin-bottom: 12px;

          .image-item {
            overflow: hidden;
            border-radius: var(--radius-md);

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          &.image-count-1 {
            grid-template-columns: 1fr;
            max-height: 240px;
          }

          &.image-count-2 {
            grid-template-columns: repeat(2, 1fr);

            .image-item {
              aspect-ratio: 1;
            }
          }

          &.image-count-3 {
            grid-template-columns: repeat(3, 1fr);

            .image-item {
              aspect-ratio: 1;
            }
          }
        }

        .feed-target {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: rgba(240, 214, 138, 0.2);
          border-radius: 12px;
          color: var(--accent-gold);
          font-size: 12px;
          margin-bottom: 12px;
        }
      }

      .feed-footer {
        display: flex;
        align-items: center;
        gap: 20px;
        padding-top: 12px;
        border-top: 1px solid var(--border-color);

        .action-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 13px;
          cursor: pointer;
          transition: color 0.2s ease;

          &.liked {
            color: var(--accent-red);
          }

          span {
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
