<template>
	<div class="page-my-posts">
		<!-- Header -->
		<div class="posts-header">
			<div class="posts-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="posts-title">我的动态</div>
			<div class="posts-action" @click="goCheckIn">
				<Plus :size="20" />
			</div>
		</div>

		<!-- Profile Summary -->
		<div class="posts-profile">
			<div class="posts-avatar">
				<img :src="user.avatar" :alt="user.nickname" />
			</div>
			<div class="posts-user-info">
				<h2 class="posts-nickname">{{ user.nickname }}</h2>
				<p class="posts-level">{{ user.level_title }} Lv.{{ user.level }} · 共 {{ posts.length }} 篇动态</p>
			</div>
		</div>

		<!-- Timeline -->
		<div class="posts-timeline">
			<div class="timeline-title">
				<Clock :size="16" />
				<span>发布的动态</span>
			</div>

			<div class="timeline-list">
				<div v-for="item in posts" :key="item.id" class="timeline-item">
					<div class="timeline-left">
						<div class="timeline-dot" />
						<div class="timeline-line" />
					</div>
					<div class="timeline-card" @click="goTarget(item)">
						<div class="timeline-header">
							<div class="timeline-meta">
								<span class="timeline-date">{{ formatDate(item.create_time) }}</span>
								<span class="timeline-city">{{ getCityName(item.city_id) }}</span>
							</div>
							<div class="timeline-type">{{ getTypeText(item.target_type) }}</div>
						</div>
						<h3 class="timeline-target">{{ item.target_name }}</h3>
						<p class="timeline-content">{{ item.content }}</p>

						<div v-if="item.images?.length" class="timeline-images">
							<div v-for="(img, idx) in item.images.slice(0, 3)" :key="idx" class="timeline-image">
								<img :src="img" :alt="`图片${idx + 1}`" />
							</div>
							<div v-if="item.images.length > 3" class="timeline-more">+{{ item.images.length - 3 }}</div>
						</div>

						<div class="timeline-footer">
							<div class="timeline-location">
								<MapPin :size="12" />
								<span>{{ item.location }}</span>
							</div>
							<div class="timeline-likes">
								<Heart :size="12" />
								<span>{{ item.like_count }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-if="!posts.length" class="posts-empty">
			<FileText :size="48" />
			<p>还没有发布动态</p>
			<button class="posts-start-btn" @click="goCheckIn">去打卡</button>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { ChevronLeft, Plus, Clock, MapPin, Heart, FileText } from "lucide-vue-next"
import { useBaseStore } from "@/stores/base"
import { getCheckinsByUser } from "@/mock/checkins"
import { getCityById } from "@/mock/destinations"

const router = useRouter()
const baseStore = useBaseStore()
const user = computed(() => baseStore.user || {})

const posts = computed(() => getCheckinsByUser(user.value.id).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))

function getCityName(cityId) {
	return getCityById(cityId)?.name || ""
}

function getTypeText(type) {
	const map = { city: "城市", attraction: "景点", food: "美食", custom: "风俗" }
	return map[type] || "打卡"
}

function formatDate(timeStr) {
	if (!timeStr) return ""
	const date = new Date(timeStr.replace(/-/g, "/"))
	return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
}

function goTarget(item) {
	const routeMap = {
		city: "PageCityDetail",
		attraction: "PageDestinationDetail",
		food: "PageFoodDetail",
		custom: "PageCustomDetail",
	}
	const name = routeMap[item.target_type]
	if (name) {
		router.push({ name, params: { id: item.target_id } })
	}
}

function goCheckIn() {
	router.push({ name: "PageCheckIn" })
}
</script>

<style lang="less" scoped>
.page-my-posts {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	padding-bottom: 30px;
	position: relative;
	overflow-x: hidden;

	.posts-header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: var(--bg-primary);
		border-bottom: 1px solid var(--border-color);

		.posts-back,
		.posts-action {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: var(--bg-glass);
			border: 1px solid var(--border-color);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			color: var(--text-primary);
		}

		.posts-title {
			font-size: 16px;
			font-weight: 700;
		}
	}

	.posts-profile {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 24px 20px 20px;

		.posts-avatar {
			width: 64px;
			height: 64px;
			border-radius: 50%;
			padding: 2px;
			background: linear-gradient(135deg, var(--accent-gold), var(--accent-purple), var(--accent-blue));

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				object-fit: cover;
			}
		}

		.posts-user-info {
			.posts-nickname {
				font-size: 20px;
				font-weight: 700;
				margin-bottom: 6px;
			}

			.posts-level {
				font-size: 12px;
				color: var(--text-tertiary);
			}
		}
	}

	.posts-timeline {
		padding: 0 20px;

		.timeline-title {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 16px;
			font-weight: 700;
			margin-bottom: 18px;
			color: var(--text-primary);

			svg {
				color: var(--accent-gold);
			}
		}

		.timeline-list {
			display: flex;
			flex-direction: column;
			gap: 0;
		}

		.timeline-item {
			display: flex;
			gap: 14px;

			&:last-child {
				.timeline-line {
					display: none;
				}
			}

			.timeline-left {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 20px;
				flex-shrink: 0;

				.timeline-dot {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background: var(--accent-gold);
					box-shadow: 0 0 0 4px rgba(212, 168, 67, 0.15);
					margin-top: 18px;
				}

				.timeline-line {
					flex: 1;
					width: 1px;
					background: var(--border-color);
					margin-top: 8px;
				}
			}

			.timeline-card {
				flex: 1;
				background: var(--bg-card);
				border: 1px solid var(--border-color);
				border-radius: var(--radius-xl);
				padding: 16px;
				margin-bottom: 16px;
				cursor: pointer;

				.timeline-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 10px;

					.timeline-meta {
						display: flex;
						align-items: center;
						gap: 8px;
						font-size: 12px;
						color: var(--text-tertiary);

						.timeline-city {
							padding: 2px 8px;
							border-radius: 10px;
							background: rgba(212, 168, 67, 0.1);
							color: var(--accent-gold);
						}
					}

					.timeline-type {
						font-size: 11px;
						color: var(--text-tertiary);
						padding: 3px 8px;
						border-radius: 10px;
						background: var(--bg-glass);
					}
				}

				.timeline-target {
					font-size: 15px;
					font-weight: 700;
					margin-bottom: 8px;
				}

				.timeline-content {
					font-size: 13px;
					color: var(--text-secondary);
					line-height: 1.6;
					margin-bottom: 12px;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.timeline-images {
					display: flex;
					gap: 8px;
					margin-bottom: 12px;

					.timeline-image {
						width: 80px;
						height: 80px;
						border-radius: var(--radius-md);
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}

					.timeline-more {
						width: 80px;
						height: 80px;
						border-radius: var(--radius-md);
						background: var(--bg-glass);
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						font-weight: 700;
						color: var(--text-secondary);
					}
				}

				.timeline-footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 11px;
					color: var(--text-tertiary);

					.timeline-location {
						display: flex;
						align-items: center;
						gap: 4px;
						max-width: 70%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.timeline-likes {
						display: flex;
						align-items: center;
						gap: 4px;
					}
				}
			}
		}
	}

	.posts-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		color: var(--text-tertiary);

		svg {
			margin-bottom: 16px;
			color: var(--text-tertiary);
		}

		p {
			font-size: 14px;
			margin-bottom: 20px;
		}

		.posts-start-btn {
			padding: 12px 32px;
			border: none;
			border-radius: var(--radius-md);
			background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
			color: #fff;
			font-size: 14px;
			font-weight: 700;
			cursor: pointer;
		}
	}
}
</style>
