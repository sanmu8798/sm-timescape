<template>
	<div class="page-comments">
		<!-- Header -->
		<div class="comments-header">
			<div class="comments-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="comments-title">全部评价</div>
			<div class="comments-action" @click="handleShare">
				<Share2 :size="18" />
			</div>
		</div>

		<!-- Target Summary -->
		<div class="target-summary">
			<div class="target-icon">{{ targetIcon }}</div>
			<div class="target-info">
				<h2 class="target-name">{{ target?.name }}</h2>
				<div class="target-meta">
					<span class="target-rating">
						<Star :size="12" fill="currentColor" />
						{{ averageRating }}
					</span>
					<span class="target-count">{{ commentsList.length }} 条评价</span>
				</div>
			</div>
			<div class="target-score">
				<div class="score-value">{{ averageRating }}</div>
				<div class="score-stars">
					<Star v-for="n in 5" :key="n" :size="10" :fill="n <= Math.round(averageRating) ? 'currentColor' : 'none'" />
				</div>
			</div>
		</div>

		<!-- Rating Distribution -->
		<div class="rating-bars">
			<div v-for="n in 5" :key="n" class="rating-bar-row">
				<span class="rating-bar-label">{{ 6 - n }}星</span>
				<div class="rating-bar-track">
					<div class="rating-bar-fill" :style="{ width: `${getRatingPercent(6 - n)}%` }" />
				</div>
				<span class="rating-bar-count">{{ getRatingCount(6 - n) }}</span>
			</div>
		</div>

		<!-- Comments List -->
		<div class="comments-section">
			<div class="section-title">
				<MessageCircle :size="16" />
				<span>最新评价</span>
			</div>

			<div v-if="commentsList.length" class="comment-list">
				<div v-for="item in commentsList" :key="item.id" class="comment-item">
					<img class="comment-avatar" :src="item.avatar" :alt="item.username" />
					<div class="comment-body">
						<div class="comment-header">
							<div class="comment-user">
								<span class="comment-username">{{ item.username }}</span>
								<span class="comment-level">Lv.{{ getUserLevel(item.user_id) }}</span>
							</div>
							<span class="comment-rating">
								<Star :size="10" fill="currentColor" />
								{{ item.rating }}
							</span>
						</div>
						<p class="comment-content">{{ item.content }}</p>
						<div class="comment-footer">
							<span class="comment-time">{{ item.create_time }}</span>
							<div class="comment-likes" :class="{ liked: item.is_liked }" @click="toggleLike(item)">
								<Heart :size="12" :fill="item.is_liked ? 'currentColor' : 'none'" />
								<span>{{ item.like_count }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Empty State -->
			<div v-else class="comments-empty">
				<MessageCircle :size="48" />
				<p>暂无评价，快来抢沙发吧</p>
			</div>
		</div>

		<!-- Comment Input -->
		<div class="comments-footer">
			<div class="comment-input-bar">
				<div class="rating-picker">
					<Star
						v-for="n in 5"
						:key="n"
						:size="18"
						:class="['star-picker', { active: n <= state.newRating }]"
						:fill="n <= state.newRating ? 'currentColor' : 'none'"
						@click="state.newRating = n"
					/>
				</div>
				<input
					v-model="state.newContent"
					class="comment-input"
					placeholder="写下你的真实评价..."
					maxlength="200"
					@keyup.enter="submitComment"
				/>
				<button class="comment-submit" :disabled="!state.newContent.trim()" @click="submitComment">发布</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ChevronLeft, Share2, Star, MessageCircle, Heart } from "lucide-vue-next"
import { showToast } from "vant"
import { getTargetByTypeAndId } from "@/mock/destinations"
import { getCommentsByTarget, comments } from "@/mock/comments"
import { profile } from "@/mock/user"

const route = useRoute()
const router = useRouter()

const targetType = computed(() => route.query.type || "attraction")
const targetId = computed(() => route.query.target_id)
const target = computed(() => getTargetByTypeAndId(targetType.value, targetId.value))

const targetIconMap = {
	city: "🏙",
	attraction: "🏔",
	food: "🍜",
	custom: "🎭",
}
const targetIcon = computed(() => targetIconMap[targetType.value] || "📍")

const commentsList = computed(() => getCommentsByTarget(targetType.value, targetId.value))
const averageRating = computed(() => {
	const list = commentsList.value
	if (!list.length) return target.value?.rating || 0
	return (list.reduce((sum, item) => sum + item.rating, 0) / list.length).toFixed(1)
})

const state = reactive({
	newRating: 5,
	newContent: "",
})

function getRatingCount(star) {
	return commentsList.value.filter((item) => item.rating === star).length
}

function getRatingPercent(star) {
	const count = getRatingCount(star)
	if (!commentsList.value.length) return 0
	return Math.round((count / commentsList.value.length) * 100)
}

function getUserLevel(userId) {
	return String(userId) === String(profile.id) ? profile.level : Math.floor(Math.random() * 8) + 1
}

function toggleLike(item) {
	item.is_liked = !item.is_liked
	item.like_count += item.is_liked ? 1 : -1
}

function submitComment() {
	if (!state.newContent.trim()) {
		showToast({ message: "请输入评价内容", icon: "warning-o" })
		return
	}

	comments.unshift({
		id: Date.now(),
		target_type: targetType.value,
		target_id: Number(targetId.value),
		user_id: profile.id,
		username: profile.nickname,
		avatar: profile.avatar,
		rating: state.newRating,
		content: state.newContent.trim(),
		create_time: "刚刚",
		like_count: 0,
		is_liked: false,
	})

	state.newContent = ""
	state.newRating = 5
	showToast({ message: "评价发布成功", icon: "success-o" })
}

function handleShare() {
	showToast({ message: "分享功能即将上线", icon: "warning-o" })
}
</script>

<style lang="less" scoped>
.page-comments {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	padding-bottom: 100px;
	position: relative;
	overflow-x: hidden;

	.comments-header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: var(--bg-primary);
		border-bottom: 1px solid var(--border-color);

		.comments-back,
		.comments-action {
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

		.comments-title {
			font-size: 16px;
			font-weight: 700;
		}
	}

	.target-summary {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 20px;
		background: linear-gradient(135deg, rgba(212, 168, 67, 0.1), rgba(139, 92, 246, 0.06));
		border-bottom: 1px solid var(--border-color);

		.target-icon {
			width: 56px;
			height: 56px;
			border-radius: 16px;
			background: rgba(255, 255, 255, 0.06);
			border: 1px solid rgba(255, 255, 255, 0.08);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26px;
			flex-shrink: 0;
		}

		.target-info {
			flex: 1;
			min-width: 0;

			.target-name {
				font-size: 18px;
				font-weight: 700;
				margin-bottom: 6px;
			}

			.target-meta {
				display: flex;
				align-items: center;
				gap: 12px;
				font-size: 12px;
				color: var(--text-secondary);

				.target-rating {
					display: flex;
					align-items: center;
					gap: 4px;
					color: var(--accent-gold);
				}
			}
		}

		.target-score {
			text-align: center;
			flex-shrink: 0;

			.score-value {
				font-size: 28px;
				font-weight: 800;
				color: var(--accent-gold);
				line-height: 1;
				margin-bottom: 4px;
			}

			.score-stars {
				display: flex;
				gap: 2px;
				color: var(--accent-gold);
			}
		}
	}

	.rating-bars {
		padding: 16px 20px;
		background: var(--bg-card);
		border-bottom: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		gap: 8px;

		.rating-bar-row {
			display: flex;
			align-items: center;
			gap: 10px;
			font-size: 11px;
			color: var(--text-secondary);

			.rating-bar-label {
				width: 28px;
				text-align: right;
			}

			.rating-bar-track {
				flex: 1;
				height: 6px;
				background: rgba(255, 255, 255, 0.06);
				border-radius: 3px;
				overflow: hidden;

				.rating-bar-fill {
					height: 100%;
					background: linear-gradient(90deg, var(--accent-gold), var(--accent-yellow));
					border-radius: 3px;
					transition: width 0.4s ease;
				}
			}

			.rating-bar-count {
				width: 28px;
				text-align: left;
			}
		}
	}

	.comments-section {
		padding: 24px 20px 0;

		.section-title {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 16px;
			font-weight: 700;
			margin-bottom: 16px;
			color: var(--text-primary);

			svg {
				color: var(--accent-gold);
			}
		}
	}

	.comment-list {
		display: flex;
		flex-direction: column;
		gap: 16px;

		.comment-item {
			display: flex;
			gap: 12px;
			padding-bottom: 16px;
			border-bottom: 1px solid var(--border-color);

			&:last-child {
				border-bottom: none;
			}

			.comment-avatar {
				width: 40px;
				height: 40px;
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
					margin-bottom: 8px;

					.comment-user {
						display: flex;
						align-items: center;
						gap: 8px;

						.comment-username {
							font-size: 14px;
							font-weight: 600;
						}

						.comment-level {
							font-size: 9px;
							padding: 1px 6px;
							border-radius: 10px;
							background: rgba(14, 165, 233, 0.12);
							color: var(--accent-blue);
						}
					}

					.comment-rating {
						display: flex;
						align-items: center;
						gap: 4px;
						font-size: 12px;
						color: var(--accent-gold);
					}
				}

				.comment-content {
					font-size: 14px;
					color: var(--text-secondary);
					line-height: 1.7;
					margin-bottom: 10px;
					word-break: break-all;
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
						cursor: pointer;

						&.liked {
							color: var(--accent-cinnabar);
						}
					}
				}
			}
		}
	}

	.comments-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		color: var(--text-tertiary);

		svg {
			margin-bottom: 16px;
		}

		p {
			font-size: 14px;
		}
	}

	.comments-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 12px 16px 24px;
		background: var(--bg-primary);
		max-width: 430px;
		margin: 0 auto;
		z-index: 50;

		.comment-input-bar {
			display: flex;
			align-items: center;
			gap: 10px;
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-xl);
			padding: 10px 12px;

			.rating-picker {
				display: flex;
				gap: 2px;
				flex-shrink: 0;

				.star-picker {
					color: var(--text-tertiary);
					cursor: pointer;
					transition: color 0.2s;

					&.active {
						color: var(--accent-gold);
					}
				}
			}

			.comment-input {
				flex: 1;
				background: transparent;
				border: none;
				outline: none;
				color: var(--text-primary);
				font-size: 14px;

				&::placeholder {
					color: var(--text-tertiary);
				}
			}

			.comment-submit {
				padding: 8px 16px;
				border-radius: 18px;
				border: none;
				background: var(--color-primary);
				color: #fff;
				font-size: 13px;
				font-weight: 600;
				cursor: pointer;
				flex-shrink: 0;

				&:disabled {
					opacity: 0.4;
					cursor: not-allowed;
				}
			}
		}
	}
}
</style>
