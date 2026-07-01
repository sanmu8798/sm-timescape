<template>
	<div class="page-city-detail">
		<!-- Header -->
		<div class="detail-header">
			<div class="detail-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="detail-title">城市详情</div>
			<div class="detail-action" @click="handleShare">
				<Share2 :size="18" />
			</div>
		</div>

		<!-- Hero -->
		<div class="city-hero">
			<img class="city-hero-img" :src="city?.cover_image" :alt="city?.name" />
			<div class="city-hero-mask" />
			<div class="city-hero-content">
				<div class="city-hero-province">{{ city?.province }}</div>
				<h1 class="city-hero-name">{{ city?.name }}</h1>
				<div class="city-hero-tags">
					<span v-for="(tag, idx) in city?.tags" :key="idx" class="city-hero-tag">{{ tag }}</span>
				</div>
				<div class="city-hero-meta">
					<span class="city-hero-rating"><Star :size="12" fill="currentColor" /> {{ city?.rating }}</span>
					<span class="city-hero-checkins">{{ city?.check_ins }} 人打卡</span>
				</div>
			</div>
		</div>

		<!-- Stats -->
		<div class="city-stats">
			<div class="stat-card">
				<div class="stat-value">{{ attractions.length }}</div>
				<div class="stat-label">景点</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ foods.length }}</div>
				<div class="stat-label">美食</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ customs.length }}</div>
				<div class="stat-label">风俗</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ cityBadges.length }}</div>
				<div class="stat-label">徽章</div>
			</div>
		</div>

		<!-- Story -->
		<div class="detail-section">
			<div class="section-title">
				<MapPinned :size="16" />
				<span>城市故事</span>
			</div>
			<div class="city-story rich-text" v-html="city?.story" />
		</div>

		<!-- Comments -->
		<div class="detail-section">
			<div class="section-title">
				<MessageCircle :size="16" />
				<span>城市评价</span>
				<span class="section-count">({{ commentCount }})</span>
			</div>
			<div class="comment-list">
				<div v-for="item in comments.slice(0, 3)" :key="item.id" class="comment-item">
					<img class="comment-avatar" :src="item.avatar" :alt="item.username" />
					<div class="comment-body">
						<div class="comment-header">
							<span class="comment-user">{{ item.username }}</span>
							<span class="comment-rating"><Star :size="10" fill="currentColor" /> {{ item.rating }}</span>
						</div>
						<p class="comment-content">{{ item.content }}</p>
						<div class="comment-footer">
							<span class="comment-time">{{ item.create_time }}</span>
							<span class="comment-likes"><Heart :size="10" /> {{ item.like_count }}</span>
						</div>
					</div>
				</div>
			</div>
			<button v-if="comments.length > 3" class="view-more-btn" @click="goComments">查看全部评价</button>
		</div>

		<!-- Attractions -->
		<div class="detail-section">
			<div class="section-title">
				<Mountain :size="16" />
				<span>必游景点</span>
			</div>
			<div class="card-list">
				<div v-for="item in attractions" :key="item.id" class="card-item" @click="goAttraction(item.id)">
					<img class="card-img" :src="item.image" :alt="item.name" />
					<div class="card-body">
						<h3 class="card-name">{{ item.name }}</h3>
						<p class="card-summary">{{ item.summary }}</p>
						<div class="card-footer">
							<span class="card-rating"><Star :size="10" fill="currentColor" /> {{ item.rating }}</span>
							<span class="card-arrow"><ChevronRight :size="14" /></span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Foods -->
		<div class="detail-section">
			<div class="section-title">
				<UtensilsCrossed :size="16" />
				<span>地道美食</span>
			</div>
			<div class="card-list horizontal">
				<div v-for="item in foods" :key="item.id" class="card-item horizontal" @click="goFood(item.id)">
					<img class="card-img" :src="item.image" :alt="item.name" />
					<div class="card-body">
						<h3 class="card-name">{{ item.name }}</h3>
						<p class="card-summary">{{ item.summary }}</p>
						<div class="card-footer">
							<span class="card-rating"><Star :size="10" fill="currentColor" /> {{ item.rating }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Customs -->
		<div class="detail-section">
			<div class="section-title">
				<Sparkles :size="16" />
				<span>特色风俗</span>
			</div>
			<div class="custom-list">
				<div v-for="item in customs" :key="item.id" class="custom-item" @click="goCustom(item.id)">
					<div class="custom-icon">
						<Sparkles :size="18" />
					</div>
					<div class="custom-body">
						<h3 class="custom-name">{{ item.name }}</h3>
						<p class="custom-summary">{{ item.summary }}</p>
					</div>
					<div class="custom-arrow"><ChevronRight :size="16" /></div>
				</div>
			</div>
		</div>

		<!-- Badges -->
		<div class="detail-section">
			<div class="section-title">
				<Award :size="16" />
				<span>城市徽章</span>
			</div>
			<div class="badge-list">
				<div v-for="item in cityBadges" :key="item.id" class="badge-card" @click="goBadge(item.id)">
					<div class="badge-icon">{{ item.icon }}</div>
					<div class="badge-info">
						<h3 class="badge-name">{{ item.name }}</h3>
						<p class="badge-condition">{{ item.condition }}</p>
					</div>
					<div class="badge-progress">
						<div class="progress-ring">
							<div
								class="progress-fill"
								:style="{ background: `conic-gradient(var(--accent-gold) ${item.progress * 360}deg, rgba(255,255,255,0.08) 0deg)` }"
							/>
							<div class="progress-inner">{{ Math.round(item.progress * 100) }}%</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- CheckIn CTA -->
		<div class="detail-footer">
			<button class="checkin-btn" @click="goCheckIn">
				<MapPin :size="18" />
				<span>打卡这座城市</span>
			</button>
			<button class="comment-btn" @click="goComments">
				<MessageSquare :size="18" />
				<span>写评价</span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
	ChevronLeft,
	Share2,
	Star,
	MapPinned,
	Mountain,
	UtensilsCrossed,
	Sparkles,
	Award,
	ChevronRight,
	MapPin,
	MessageCircle,
	MessageSquare,
	Heart,
} from "lucide-vue-next"
import { getCityById, getAttractionsByCityId, getFoodsByCityId, getCustomsByCityId } from "@/mock/destinations"
import { getBadgesByCityId } from "@/mock/badges"
import { getCommentsByTarget } from "@/mock/comments"

const route = useRoute()
const router = useRouter()

const cityId = computed(() => route.params.id)
const city = computed(() => getCityById(cityId.value))
const attractions = computed(() => getAttractionsByCityId(cityId.value))
const foods = computed(() => getFoodsByCityId(cityId.value))
const customs = computed(() => getCustomsByCityId(cityId.value))
const comments = computed(() => getCommentsByTarget("city", cityId.value))
const commentCount = computed(() => comments.value.length)
const cityBadges = computed(() => getBadgesByCityId(cityId.value).filter((item) => item.progress > 0 || item.id <= 6))

function goAttraction(id) {
	router.push({ name: "PageDestinationDetail", params: { id } })
}

function goFood(id) {
	router.push({ name: "PageFoodDetail", params: { id } })
}

function goCustom(id) {
	router.push({ name: "PageCustomDetail", params: { id } })
}

function goBadge(id) {
	router.push({ name: "PageBadges", query: { id } })
}

function goComments() {
	router.push({ name: "PageComments", query: { type: "city", target_id: cityId.value } })
}

function goCheckIn() {
	router.push({ name: "PageCheckIn", query: { city_id: cityId.value, type: "city", target_id: cityId.value } })
}

function handleShare() {
	// TODO: implement share
}
</script>

<style lang="less" scoped>
.page-city-detail {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	padding-bottom: 100px;
	position: relative;
	overflow-x: hidden;

	.detail-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		max-width: 430px;
		margin: 0 auto;
		color: #fff;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), transparent);

		.detail-back,
		.detail-action {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.12);
			backdrop-filter: blur(10px);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}

		.detail-title {
			font-size: 16px;
			font-weight: 600;
		}
	}

	.city-hero {
		position: relative;
		height: 320px;
		overflow: hidden;

		.city-hero-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.city-hero-mask {
			position: absolute;
			inset: 0;
			background: linear-gradient(to top, rgba(14, 14, 26, 1) 0%, rgba(14, 14, 26, 0.4) 50%, rgba(14, 14, 26, 0.1) 100%);
		}

		.city-hero-content {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 24px 20px;

			.city-hero-province {
				font-size: 12px;
				color: var(--accent-gold);
				letter-spacing: 2px;
				margin-bottom: 6px;
			}

			.city-hero-name {
				font-size: 32px;
				font-weight: 900;
				margin-bottom: 12px;
				font-family: "Noto Serif SC", serif;
			}

			.city-hero-tags {
				display: flex;
				gap: 8px;
				margin-bottom: 12px;

				.city-hero-tag {
					padding: 4px 10px;
					border-radius: 20px;
					font-size: 11px;
					background: rgba(255, 255, 255, 0.1);
					border: 1px solid rgba(255, 255, 255, 0.15);
					color: var(--text-secondary);
				}
			}

			.city-hero-meta {
				display: flex;
				align-items: center;
				gap: 12px;
				font-size: 12px;
				color: var(--text-secondary);

				.city-hero-rating {
					display: flex;
					align-items: center;
					gap: 4px;
					color: var(--accent-gold);
				}
			}
		}
	}

	.city-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		padding: 0 20px;
		margin-top: -20px;
		position: relative;
		z-index: 2;

		.stat-card {
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-lg);
			padding: 14px 8px;
			text-align: center;
			backdrop-filter: blur(10px);

			.stat-value {
				font-size: 20px;
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

	.detail-section {
		padding: 28px 20px 0;

		.section-title {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 16px;
			font-weight: 700;
			margin-bottom: 14px;
			color: var(--text-primary);

			svg {
				color: var(--accent-gold);
			}
		}
	}

	.city-story {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: 20px;
		line-height: 1.8;
		font-size: 14px;
		color: var(--text-secondary);
	}

	.section-count {
		font-size: 12px;
		color: var(--text-tertiary);
		font-weight: 500;
		margin-left: 4px;
	}

	.comment-list {
		display: flex;
		flex-direction: column;
		gap: 12px;

		.comment-item {
			display: flex;
			gap: 12px;
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-xl);
			padding: 14px;

			.comment-avatar {
				width: 38px;
				height: 38px;
				border-radius: 50%;
				object-fit: cover;
				flex-shrink: 0;
			}

			.comment-body {
				flex: 1;
				min-width: 0;

				.comment-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 6px;

					.comment-user {
						font-size: 13px;
						font-weight: 600;
					}

					.comment-rating {
						display: flex;
						align-items: center;
						gap: 4px;
						font-size: 11px;
						color: var(--accent-gold);
					}
				}

				.comment-content {
					font-size: 13px;
					color: var(--text-secondary);
					line-height: 1.6;
					margin-bottom: 8px;
				}

				.comment-footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 11px;
					color: var(--text-tertiary);

					.comment-likes {
						display: flex;
						align-items: center;
						gap: 4px;
					}
				}
			}
		}
	}

	.view-more-btn {
		width: 100%;
		margin-top: 14px;
		padding: 12px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-color);
		background: var(--bg-card);
		color: var(--text-secondary);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
	}

	.card-list {
		display: flex;
		flex-direction: column;
		gap: 12px;

		&.horizontal {
			flex-direction: row;
			overflow-x: auto;
			padding-bottom: 6px;

			&::-webkit-scrollbar {
				display: none;
			}

			.card-item.horizontal {
				width: 260px;
				flex-shrink: 0;
				flex-direction: column;

				.card-img {
					width: 100%;
					height: 140px;
				}
			}
		}

		.card-item {
			display: flex;
			gap: 14px;
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-xl);
			padding: 14px;
			cursor: pointer;

			.card-img {
				width: 90px;
				height: 90px;
				border-radius: var(--radius-md);
				object-fit: cover;
				flex-shrink: 0;
			}

			.card-body {
				flex: 1;
				min-width: 0;
				display: flex;
				flex-direction: column;

				.card-name {
					font-size: 15px;
					font-weight: 700;
					margin-bottom: 6px;
				}

				.card-summary {
					font-size: 12px;
					color: var(--text-tertiary);
					line-height: 1.5;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					flex: 1;
				}

				.card-footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 8px;

					.card-rating {
						display: flex;
						align-items: center;
						gap: 4px;
						font-size: 12px;
						color: var(--accent-gold);
					}

					.card-arrow {
						color: var(--text-tertiary);
					}
				}
			}
		}
	}

	.custom-list {
		display: flex;
		flex-direction: column;
		gap: 10px;

		.custom-item {
			display: flex;
			align-items: center;
			gap: 14px;
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-xl);
			padding: 16px;
			cursor: pointer;

			.custom-icon {
				width: 42px;
				height: 42px;
				border-radius: 12px;
				background: rgba(139, 92, 246, 0.1);
				border: 1px solid rgba(139, 92, 246, 0.15);
				color: var(--accent-purple);
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
			}

			.custom-body {
				flex: 1;
				min-width: 0;

				.custom-name {
					font-size: 15px;
					font-weight: 700;
					margin-bottom: 4px;
				}

				.custom-summary {
					font-size: 12px;
					color: var(--text-tertiary);
					line-height: 1.5;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}

			.custom-arrow {
				color: var(--text-tertiary);
				flex-shrink: 0;
			}
		}
	}

	.badge-list {
		display: flex;
		flex-direction: column;
		gap: 10px;

		.badge-card {
			display: flex;
			align-items: center;
			gap: 14px;
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-xl);
			padding: 16px;
			cursor: pointer;

			.badge-icon {
				width: 48px;
				height: 48px;
				border-radius: 50%;
				background: linear-gradient(135deg, rgba(212, 168, 67, 0.15), rgba(212, 168, 67, 0.05));
				border: 1px solid rgba(212, 168, 67, 0.2);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 22px;
				flex-shrink: 0;
			}

			.badge-info {
				flex: 1;
				min-width: 0;

				.badge-name {
					font-size: 15px;
					font-weight: 700;
					margin-bottom: 4px;
				}

				.badge-condition {
					font-size: 11px;
					color: var(--text-tertiary);
				}
			}

			.badge-progress {
				flex-shrink: 0;

				.progress-ring {
					width: 44px;
					height: 44px;
					border-radius: 50%;
					position: relative;
					overflow: hidden;
					background: rgba(255, 255, 255, 0.06);

					.progress-fill {
						position: absolute;
						inset: 0;
						border-radius: 50%;
					}

					.progress-inner {
						position: absolute;
						inset: 5px;
						border-radius: 50%;
						background: var(--bg-secondary);
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 10px;
						font-weight: 700;
						color: var(--accent-gold);
					}
				}
			}
		}
	}

	.detail-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 12px 20px 24px;
		background: linear-gradient(to top, var(--bg-primary), transparent);
		max-width: 430px;
		margin: 0 auto;
		z-index: 50;
		display: flex;
		gap: 10px;

		.checkin-btn {
			flex: 1;
			padding: 15px;
			border: none;
			border-radius: var(--radius-md);
			background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
			color: #fff;
			font-size: 15px;
			font-weight: 700;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			cursor: pointer;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		}

		.comment-btn {
			padding: 15px 20px;
			border: 1px solid var(--border-color);
			border-radius: var(--radius-md);
			background: var(--bg-card);
			color: var(--text-secondary);
			font-size: 15px;
			font-weight: 700;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			cursor: pointer;
		}
	}
}
</style>
