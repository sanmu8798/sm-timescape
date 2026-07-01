<template>
	<div class="page-custom-detail">
		<!-- Header -->
		<div class="detail-header">
			<div class="detail-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="detail-title">风俗详情</div>
			<div class="detail-action" @click="handleShare">
				<Share2 :size="18" />
			</div>
		</div>

		<!-- Hero -->
		<div class="custom-hero">
			<img class="custom-hero-img" :src="custom?.image" :alt="custom?.name" />
			<div class="custom-hero-mask" />
			<div class="custom-hero-content">
				<div class="custom-hero-city" @click="goCity(custom?.city_id)">{{ city?.name }}</div>
				<h1 class="custom-hero-name">{{ custom?.name }}</h1>
				<div class="custom-hero-tags">
					<span v-for="(tag, idx) in custom?.tags" :key="idx" class="custom-hero-tag">{{ tag }}</span>
				</div>
				<div class="custom-hero-meta">
					<span class="custom-hero-rating"><Star :size="12" fill="currentColor" /> {{ custom?.rating }}</span>
					<span class="custom-hero-comments">{{ commentCount }} 条评价</span>
					<span class="custom-hero-checkins">{{ checkinCount }} 人打卡</span>
				</div>
			</div>
		</div>

		<!-- Stats -->
		<div class="custom-stats">
			<div class="stat-card">
				<div class="stat-value">{{ custom?.rating }}</div>
				<div class="stat-label">评分</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ commentCount }}</div>
				<div class="stat-label">评价</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ checkinCount }}</div>
				<div class="stat-label">打卡</div>
			</div>
			<div class="stat-card">
				<div class="stat-value">{{ cityBadges.length }}</div>
				<div class="stat-label">徽章</div>
			</div>
		</div>

		<!-- Info -->
		<div class="detail-section">
			<div class="section-title">
				<Info :size="16" />
				<span>风俗简介</span>
			</div>
			<div class="info-card">
				<div class="info-row">
					<span class="info-label">名称</span>
					<span class="info-value">{{ custom?.name }}</span>
				</div>
				<div class="info-row">
					<span class="info-label">城市</span>
					<span class="info-value link" @click="goCity(custom?.city_id)">{{ city?.name }}</span>
				</div>
				<div class="info-row">
					<span class="info-label">标签</span>
					<span class="info-value">{{ custom?.tags?.join(" · ") }}</span>
				</div>
			</div>
		</div>

		<!-- Story -->
		<div class="detail-section">
			<div class="section-title">
				<BookOpen :size="16" />
				<span>风俗故事</span>
			</div>
			<div class="custom-story rich-text" v-html="custom?.story" />
		</div>

		<!-- Comments -->
		<div class="detail-section">
			<div class="section-title">
				<MessageCircle :size="16" />
				<span>文化评价</span>
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

		<!-- City Foods -->
		<div class="detail-section">
			<div class="section-title">
				<UtensilsCrossed :size="16" />
				<span>同城美食</span>
			</div>
			<div class="card-list horizontal">
				<div v-for="item in foods.slice(0, 6)" :key="item.id" class="card-item horizontal" @click="goFood(item.id)">
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

		<!-- City Spots -->
		<div class="detail-section">
			<div class="section-title">
				<Mountain :size="16" />
				<span>同城景点</span>
			</div>
			<div class="card-list horizontal">
				<div v-for="item in attractions.slice(0, 6)" :key="item.id" class="card-item horizontal" @click="goAttraction(item.id)">
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

		<!-- Badges -->
		<div class="detail-section">
			<div class="section-title">
				<Award :size="16" />
				<span>相关徽章</span>
			</div>
			<div class="badge-list">
				<div v-for="item in cityBadges.slice(0, 3)" :key="item.id" class="badge-card" @click="goBadge(item.id)">
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
				<span>打卡这项风俗</span>
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
import { ChevronLeft, Share2, Star, Info, BookOpen, MessageCircle, UtensilsCrossed, Mountain, Award, Heart, MessageSquare } from "lucide-vue-next"
import { getCustomById, getCityById, getFoodsByCityId, getAttractionsByCityId } from "@/mock/destinations"
import { getBadgesByCityId } from "@/mock/badges"
import { getCommentsByTarget } from "@/mock/comments"
import { getCheckinsByTarget } from "@/mock/checkins"

const route = useRoute()
const router = useRouter()

const customId = computed(() => route.params.id)
const custom = computed(() => getCustomById(customId.value))
const city = computed(() => getCityById(custom.value?.city_id))
const foods = computed(() => getFoodsByCityId(custom.value?.city_id))
const attractions = computed(() => getAttractionsByCityId(custom.value?.city_id))
const comments = computed(() => getCommentsByTarget("custom", customId.value))
const commentCount = computed(() => comments.value.length)
const checkins = computed(() => getCheckinsByTarget("custom", customId.value))
const checkinCount = computed(() => checkins.value.length)
const cityBadges = computed(() => getBadgesByCityId(custom.value?.city_id).filter((item) => item.progress > 0 || item.id <= 6))

function goCity(id) {
	router.push({ name: "PageCityDetail", params: { id } })
}

function goFood(id) {
	router.push({ name: "PageFoodDetail", params: { id } })
}

function goAttraction(id) {
	router.push({ name: "PageDestinationDetail", params: { id } })
}

function goBadge(id) {
	router.push({ name: "PageBadges", query: { id } })
}

function goComments() {
	router.push({ name: "PageComments", query: { type: "custom", target_id: customId.value } })
}

function goCheckIn() {
	router.push({
		name: "PageCheckIn",
		query: { city_id: custom.value?.city_id, type: "custom", target_id: customId.value },
	})
}

function handleShare() {
	// TODO: implement share
}
</script>

<style lang="less" scoped>
.page-custom-detail {
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

	.custom-hero {
		position: relative;
		height: 320px;
		overflow: hidden;

		.custom-hero-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.custom-hero-mask {
			position: absolute;
			inset: 0;
			background: linear-gradient(to top, rgba(14, 14, 26, 1) 0%, rgba(14, 14, 26, 0.4) 50%, rgba(14, 14, 26, 0.1) 100%);
		}

		.custom-hero-content {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 24px 20px;

			.custom-hero-city {
				font-size: 12px;
				color: var(--accent-gold);
				letter-spacing: 2px;
				margin-bottom: 6px;
				cursor: pointer;
				display: inline-block;
			}

			.custom-hero-name {
				font-size: 28px;
				font-weight: 900;
				margin-bottom: 12px;
				font-family: "Noto Serif SC", serif;
			}

			.custom-hero-tags {
				display: flex;
				gap: 8px;
				margin-bottom: 12px;

				.custom-hero-tag {
					padding: 4px 10px;
					border-radius: 20px;
					font-size: 11px;
					background: rgba(255, 255, 255, 0.1);
					border: 1px solid rgba(255, 255, 255, 0.15);
					color: var(--text-secondary);
				}
			}

			.custom-hero-meta {
				display: flex;
				align-items: center;
				gap: 12px;
				font-size: 12px;
				color: var(--text-secondary);

				.custom-hero-rating {
					display: flex;
					align-items: center;
					gap: 4px;
					color: var(--accent-gold);
				}
			}
		}
	}

	.custom-stats {
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

			.section-count {
				font-size: 12px;
				color: var(--text-tertiary);
				font-weight: 500;
				margin-left: 4px;
			}
		}
	}

	.info-card {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: 16px 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;

		.info-row {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 12px;
			font-size: 13px;

			.info-label {
				color: var(--text-tertiary);
				flex-shrink: 0;
			}

			.info-value {
				color: var(--text-secondary);
				text-align: right;
				line-height: 1.5;

				&.link {
					color: var(--accent-gold);
					cursor: pointer;
				}
			}
		}
	}

	.custom-story {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: 20px;
		line-height: 1.8;
		font-size: 14px;
		color: var(--text-secondary);
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
