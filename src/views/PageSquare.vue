<template>
	<div class="page-square tabber-page">
		<div class="square-filter-row">
			<div
				v-for="(item, index) in state.squareFilters"
				:key="index"
				:class="['square-filter-tag', { active: state.activeFilter === item }]"
				@click="state.activeFilter = item"
			>
				{{ item }}
			</div>
		</div>

		<div class="square-topics-bar">
			<div class="square-topics-scroll">
				<div v-for="(foodItem, index) in state.squareTopics" :key="index" class="square-topic-chip">
					<div class="square-topic-icon" :style="{ background: foodItem.iconBg }">{{ foodItem.icon }}</div>
					<span class="square-topic-text">{{ foodItem.title }}</span>
					<span :class="['square-topic-badge', foodItem.badgeType]">{{ foodItem.badge }}</span>
				</div>
			</div>
		</div>

		<div class="square-feed">
			<div v-for="(item, index) in state.squarePosts" :key="index" class="square-post-card">
				<div class="square-post-header">
					<div class="square-post-avatar">
						<div class="square-post-avatar-ring" :style="{ background: item.avatarGradient }">
							<span class="square-post-avatar-initial">{{ item.avatarInitial }}</span>
						</div>
						<span v-if="item.level" class="square-post-avatar-badge">{{ item.level }}</span>
					</div>
					<div class="square-post-user-info">
						<div class="square-post-username">
							{{ item.username }}
							<span v-if="item.levelTitle" :class="['square-post-level', item.levelClass]">{{ item.levelTitle }}</span>
						</div>
						<div class="square-post-meta">
							<span>{{ item.time }}</span>
							<span v-if="item.city" class="square-meta-dot" />
							<span v-if="item.city" class="square-post-city" @click="goCityByName(item.city)">{{ item.city }}</span>
						</div>
					</div>
					<button v-if="!item.isOfficial" class="square-post-follow">+ 关注</button>
				</div>

				<div class="square-post-body">
					<p class="square-post-text">{{ item.content }}</p>
					<div v-if="item.tags?.length" class="square-post-tags">
						<span v-for="tag in item.tags" :key="tag" class="square-post-tag">{{ tag }}</span>
					</div>
					<div v-if="item.location" class="square-post-location">
						<MapPin :size="12" />
						<span>{{ item.location }}</span>
					</div>
				</div>

				<div v-if="item.images?.length" class="square-post-images">
					<div :class="['square-img-grid', item.imageLayout]">
						<div v-for="(img, idx) in item.images.slice(0, 9)" :key="idx" class="square-img-cell" :style="{ background: img.bg }">
							<span class="square-img-label">{{ img.label }}</span>
							<div v-if="idx === 8 && item.images.length > 9" class="square-img-more">+{{ item.images.length - 9 }}</div>
						</div>
					</div>
				</div>

				<div v-if="item.checkinCard" class="square-checkin-card">
					<div class="square-checkin-row">
						<div class="square-checkin-left">
							<div
								class="square-checkin-icon"
								:style="{
									background: item.checkinCard.iconBg || 'rgba(255,255,255,0.06)',
									borderColor: item.checkinCard.iconBorder || 'var(--border-color)',
								}"
							>
								{{ item.checkinCard.badgeIcon }}
							</div>
							<div>
								<div class="square-checkin-title">{{ item.checkinCard.title }}</div>
								<div class="square-checkin-sub">{{ item.checkinCard.subtitle }}</div>
							</div>
						</div>
						<div
							class="square-checkin-badge"
							:style="{
								background: item.checkinCard.badgeBg || 'rgba(212,168,67,0.1)',
								borderColor: item.checkinCard.badgeBorder || 'rgba(212,168,67,0.15)',
							}"
						>
							<span :style="{ color: item.checkinCard.badgeColor || 'var(--accent-gold)' }">{{ item.checkinCard.badgeIcon }}</span>
							<span :style="{ color: item.checkinCard.badgeColor || 'var(--accent-gold)' }">{{ item.checkinCard.badgeText }}</span>
						</div>
					</div>
				</div>

				<div v-if="item.eventCard" class="square-event-card">
					<div class="square-event-bg" :style="{ background: item.eventCard.bg }">
						<span class="square-event-label">{{ item.eventCard.label }}</span>
						<div class="square-event-info">
							<div class="square-event-title">{{ item.eventCard.title }}</div>
							<div class="square-event-sub">{{ item.eventCard.subtitle }}</div>
						</div>
					</div>
				</div>

				<div class="square-post-actions">
					<div :class="['square-post-action', { liked: item.isLiked }]">
						<Heart
							:size="18"
							:fill="item.isLiked ? 'var(--accent-cinnabar)' : 'none'"
							:color="item.isLiked ? 'var(--accent-cinnabar)' : 'var(--text-tertiary)'"
						/>
						<span>{{ formatCount(item.likeCount) }}</span>
					</div>
					<div class="square-post-action">
						<MessageCircle :size="18" />
						<span>{{ item.commentCount }}</span>
					</div>
					<div class="square-post-action">
						<Star :size="18" />
						<span>收藏</span>
					</div>
					<div class="square-post-action">
						<Share2 :size="18" />
						<span>转发</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { MapPin, Heart, MessageCircle, Star, Share2 } from "lucide-vue-next"
import { squareFilters, squareTopics, squarePosts } from "@/mock/square"
import { cities } from "@/mock/destinations"

const state = reactive({
	activeFilter: "推荐",
	squareFilters,
	squareTopics,
	squarePosts,
})

const router = useRouter()

const goCityByName = (name) => {
	const city = cities.find((item) => item.name === name)
	if (city) {
		router.push({ name: "PageCityDetail", params: { id: city.id } })
	}
}

const formatCount = (count) => {
	if (count >= 1000) return (count / 1000).toFixed(1) + "k"
	return count
}
</script>

<style lang="less" scoped>
.page-square {
	min-height: 100vh;
	background: var(--bg-primary);
	padding-bottom: 80px;

	.square-filter-row {
		display: flex;
		gap: 8px;
		padding: 14px var(--spacing-md) 10px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar {
			display: none;
		}

		.square-filter-tag {
			padding: 7px 16px;
			border-radius: 20px;
			font-size: 13px;
			font-weight: 500;
			white-space: nowrap;
			cursor: pointer;
			transition: all 0.25s ease;
			background: var(--bg-card);
			color: var(--text-tertiary);
			border: 1px solid var(--border-color);
			flex-shrink: 0;

			&.active {
				background: var(--color-primary);
				color: #fff;
				border-color: var(--color-primary);
			}
		}
	}

	.square-topics-bar {
		padding: 0 var(--spacing-md) 14px;

		.square-topics-scroll {
			display: flex;
			gap: 10px;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			padding-bottom: 2px;

			&::-webkit-scrollbar {
				display: none;
			}

			.square-topic-chip {
				display: flex;
				align-items: center;
				gap: 8px;
				padding: 10px 14px;
				background: var(--bg-card);
				border: 1px solid var(--border-color);
				border-radius: 14px;
				flex-shrink: 0;
				cursor: pointer;

				.square-topic-icon {
					width: 28px;
					height: 28px;
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 14px;
				}

				.square-topic-text {
					font-size: 12px;
					font-weight: 500;
					color: var(--text-secondary);
					white-space: nowrap;
				}

				.square-topic-badge {
					padding: 2px 7px;
					border-radius: 4px;
					font-size: 9px;
					font-weight: 700;
					letter-spacing: 0.5px;
					white-space: nowrap;

					&.hot {
						background: rgba(226, 85, 61, 0.12);
						color: var(--accent-cinnabar);
					}

					&.count {
						color: var(--text-tertiary);
					}
				}
			}
		}
	}

	.square-feed {
		padding: 0 var(--spacing-md) 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;

		.square-post-card {
			background: var(--bg-card);
			border-radius: var(--radius-xl);
			overflow: hidden;
			border: 1px solid var(--border-color);
			transition: all 0.2s ease;
		}

		.square-post-header {
			display: flex;
			align-items: center;
			gap: 12px;
			padding: 16px 16px 0;

			.square-post-avatar {
				width: 42px;
				height: 42px;
				border-radius: 50%;
				flex-shrink: 0;
				position: relative;

				.square-post-avatar-ring {
					width: 42px;
					height: 42px;
					border-radius: 50%;
					padding: 2px;
					display: flex;
					align-items: center;
					justify-content: center;

					.square-post-avatar-initial {
						font-size: 15px;
						font-weight: 700;
						color: #fff;
						letter-spacing: 0.5px;
					}
				}

				.square-post-avatar-badge {
					position: absolute;
					bottom: -1px;
					right: -1px;
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: var(--accent-gold);
					border: 2px solid var(--bg-primary);
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 8px;
					color: #fff;
					font-weight: 900;
					z-index: 2;
				}
			}

			.square-post-user-info {
				flex: 1;
				min-width: 0;

				.square-post-username {
					font-size: 14px;
					font-weight: 600;
					color: var(--text-primary);
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.square-post-level {
					padding: 2px 7px;
					border-radius: 4px;
					font-size: 9px;
					font-weight: 600;
					letter-spacing: 0.3px;
				}

				.lv-blue {
					background: rgba(14, 165, 233, 0.12);
					color: var(--accent-blue);
				}

				.lv-purple {
					background: rgba(139, 92, 246, 0.12);
					color: var(--accent-purple);
				}

				.lv-gold {
					background: rgba(212, 168, 67, 0.12);
					color: var(--accent-gold);
				}

				.square-post-meta {
						font-size: 11px;
						color: var(--text-tertiary);
						margin-top: 3px;
						display: flex;
						align-items: center;
						gap: 6px;

						.square-meta-dot {
							width: 2px;
							height: 2px;
							background: var(--text-tertiary);
							border-radius: 50%;
						}

						.square-post-city {
							color: var(--accent-blue);
							cursor: pointer;
						}
					}
			}

			.square-post-follow {
				padding: 5px 14px;
				border-radius: 16px;
				font-size: 11px;
				font-weight: 600;
				border: 1px solid var(--border-color);
				background: var(--bg-secondary);
				color: var(--text-secondary);
				cursor: pointer;
				transition: all 0.2s ease;
				flex-shrink: 0;
			}
		}

		.square-post-body {
			padding: 12px 16px 0;

			.square-post-text {
				font-size: 14px;
				line-height: 1.8;
				color: var(--text-primary);
				word-break: break-all;
				white-space: pre-line;
			}

			.square-post-tags {
				display: flex;
				flex-wrap: wrap;
				gap: 6px;
				margin-top: 10px;

				.square-post-tag {
					font-size: 12px;
					color: var(--accent-blue);
					opacity: 0.8;
				}
			}

			.square-post-location {
				display: inline-flex;
				align-items: center;
				gap: 5px;
				margin-top: 10px;
				padding: 4px 12px;
				background: var(--bg-secondary);
				border: 1px solid var(--border-color);
				border-radius: 20px;
				font-size: 11px;
				color: var(--text-secondary);
				cursor: pointer;
				transition: all 0.2s ease;
			}
		}

		.square-post-images {
			padding: 12px 16px 0;

			.square-img-grid {
				border-radius: var(--radius-md);
				overflow: hidden;
				display: grid;
				gap: 3px;

				&.g1 {
					grid-template-columns: 1fr;
					.square-img-cell {
						aspect-ratio: 16/10;
					}
				}

				&.g2 {
					grid-template-columns: 1fr 1fr;
					.square-img-cell {
						aspect-ratio: 1;
					}
				}

				&.g3 {
					grid-template-columns: 1fr 1fr;
					grid-template-rows: 1fr 1fr;
					.square-img-cell:first-child {
						grid-row: 1/3;
					}
				}

				&.g4 {
					grid-template-columns: 1fr 1fr;
					.square-img-cell {
						aspect-ratio: 1;
					}
				}

				&.g6 {
					grid-template-columns: 1fr 1fr 1fr;
					.square-img-cell {
						aspect-ratio: 1;
					}
				}

				.square-img-cell {
					width: 100%;
					overflow: hidden;
					cursor: pointer;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;

					.square-img-label {
						font-size: 12px;
						font-weight: 600;
						color: rgba(255, 255, 255, 0.35);
						letter-spacing: 1px;
						text-transform: uppercase;
					}

					.square-img-more {
						position: absolute;
						inset: 0;
						background: rgba(0, 0, 0, 0.6);
						backdrop-filter: blur(4px);
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 18px;
						font-weight: 700;
						color: rgba(255, 255, 255, 0.8);
						letter-spacing: 1px;
					}
				}
			}
		}

		.square-checkin-card {
			margin: 14px 16px 0;
			padding: 16px;
			background: var(--bg-secondary);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-md);
			position: relative;
			overflow: hidden;

			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 2px;
				background: linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-gold));
			}

			.square-checkin-row {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.square-checkin-left {
					display: flex;
					align-items: center;
					gap: 12px;

					.square-checkin-icon {
						width: 40px;
						height: 40px;
						border-radius: 12px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 18px;
						border: 1px solid var(--border-color);
						color: var(--text-secondary);
					}
				}

				.square-checkin-title {
					font-size: 13px;
					font-weight: 600;
					color: var(--text-primary);
				}

				.square-checkin-sub {
					font-size: 11px;
					color: var(--text-tertiary);
					margin-top: 2px;
				}

				.square-checkin-badge {
					display: flex;
					align-items: center;
					gap: 6px;
					padding: 5px 12px;
					border-radius: 20px;
					border: 1px solid;

					span {
						font-size: 11px;
						font-weight: 600;
					}

					span:first-child {
						font-size: 12px;
					}
				}
			}
		}

		.square-event-card {
			margin: 14px 16px 0;
			border-radius: var(--radius-md);
			overflow: hidden;
			position: relative;
			cursor: pointer;
			border: 1px solid var(--border-color);

			.square-event-bg {
				height: 140px;
				position: relative;
				display: flex;
				align-items: flex-end;
				padding: 20px;

				&::before {
					content: "";
					position: absolute;
					inset: 0;
					background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%);
					z-index: 1;
				}

				.square-event-label {
					position: absolute;
					top: 14px;
					left: 16px;
					z-index: 2;
					padding: 3px 10px;
					background: rgba(255, 255, 255, 0.15);
					backdrop-filter: blur(8px);
					border: 1px solid rgba(255, 255, 255, 0.2);
					border-radius: 20px;
					font-size: 10px;
					font-weight: 600;
					color: rgba(255, 255, 255, 0.7);
					letter-spacing: 0.5px;
				}

				.square-event-info {
					position: relative;
					z-index: 2;

					.square-event-title {
						font-size: 17px;
						font-weight: 700;
						color: #fff;
						line-height: 1.4;
					}

					.square-event-sub {
						font-size: 11px;
						color: rgba(255, 255, 255, 0.5);
						margin-top: 4px;
					}
				}
			}
		}

		.square-post-actions {
			display: flex;
			align-items: center;
			padding: 14px 8px;

			.square-post-action {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 6px;
				cursor: pointer;
				padding: 6px 0;
				border-radius: 8px;
				transition: all 0.2s ease;
				position: relative;
				color: var(--text-tertiary);
				font-size: 13px;

				&.liked {
					color: var(--accent-cinnabar);
				}

				&:not(:last-child)::after {
					content: "";
					position: absolute;
					right: 0;
					top: 20%;
					height: 60%;
					width: 1px;
					background: var(--border-color);
				}
			}
		}
	}
}
</style>
