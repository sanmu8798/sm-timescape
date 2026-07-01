<template>
	<div class="page-check-in-record">
		<!-- Header -->
		<div class="record-header">
			<div class="record-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="record-title">足迹时间线</div>
			<div class="record-action" @click="goCheckIn">
				<Plus :size="20" />
			</div>
		</div>

		<!-- Profile Summary -->
		<div class="record-profile">
			<div class="record-avatar">
				<img :src="user.avatar" :alt="user.nickname" />
			</div>
			<div class="record-user-info">
				<h2 class="record-nickname">{{ user.nickname }}</h2>
				<p class="record-level">{{ user.level_title }} Lv.{{ user.level }}</p>
			</div>
		</div>

		<!-- Stats -->
		<div class="record-stats">
			<div class="stat-card">
				<div class="stat-value">{{ checkins.length }}</div>
				<div class="stat-label">打卡</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ visitedCities.length }}</div>
				<div class="stat-label">城市</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ totalLikes }}</div>
				<div class="stat-label">获赞</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ unlockedBadges.length }}</div>
				<div class="stat-label">徽章</div>
			</div>
		</div>

		<!-- Timeline -->
		<div class="record-timeline">
			<div class="timeline-title">
				<Clock :size="16" />
				<span>旅行足迹</span>
			</div>

			<div class="timeline-list">
				<div v-for="item in checkins" :key="item.id" class="timeline-item">
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
		<div v-if="!checkins.length" class="record-empty">
			<MapPin :size="48" />
			<p>还没有打卡记录</p>
			<button class="record-start-btn" @click="goCheckIn">去打卡</button>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { ChevronLeft, Plus, Clock, MapPin, Heart } from "lucide-vue-next"
import { useBaseStore } from "@/stores/base"
import { getCheckinsByUser } from "@/mock/checkins"
import { getCityById } from "@/mock/destinations"
import { badges } from "@/mock/badges"

const router = useRouter()
const baseStore = useBaseStore()
const user = computed(() => baseStore.user || {})

const checkins = computed(() => getCheckinsByUser(user.value.id).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
const visitedCities = computed(() => [...new Set(checkins.value.map((item) => item.city_id))])
const totalLikes = computed(() => checkins.value.reduce((sum, item) => sum + (item.like_count || 0), 0))
const unlockedBadges = computed(() => badges.filter((item) => item.progress >= 1))

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
.page-check-in-record {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	padding-bottom: 30px;
	position: relative;
	overflow-x: hidden;

	.record-header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: var(--bg-primary);
		border-bottom: 1px solid var(--border-color);

		.record-back,
		.record-action {
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

		.record-title {
			font-size: 16px;
			font-weight: 700;
		}
	}

	.record-profile {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 24px 20px 20px;

		.record-avatar {
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

		.record-user-info {
			.record-nickname {
				font-size: 20px;
				font-weight: 700;
				margin-bottom: 6px;
			}

			.record-level {
				font-size: 12px;
				color: var(--text-tertiary);
			}
		}
	}

	.record-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		padding: 0 20px;
		margin-bottom: 28px;

		.stat-card {
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-lg);
			padding: 14px 8px;
			text-align: center;

			.stat-value {
				font-size: 18px;
				font-weight: 800;
				color: var(--accent-gold);
				margin-bottom: 4px;
			}

			.stat-label {
				font-size: 11px;
				color: var(--text-tertiary);
			}
		}
	}

	.record-timeline {
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

	.record-empty {
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

		.record-start-btn {
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
