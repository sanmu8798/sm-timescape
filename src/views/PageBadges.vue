<template>
	<div class="page-badges">
		<!-- Header -->
		<div class="badges-header">
			<div class="badges-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="badges-title">成就徽章</div>
			<div class="badges-action" @click="onAlert">
				<Share2 :size="18" />
			</div>
		</div>

		<!-- Summary -->
		<div class="badges-summary">
			<div class="summary-card">
				<div class="summary-icon">🏆</div>
				<div class="summary-info">
					<h2 class="summary-title">徽章收藏家</h2>
					<p class="summary-desc">已解锁 {{ unlockedCount }} / {{ totalCount }} 枚徽章</p>
				</div>
				<div class="summary-progress">
					<div class="progress-ring">
						<div
							class="progress-fill"
							:style="{ background: `conic-gradient(var(--accent-gold) ${totalProgress * 360}deg, rgba(255,255,255,0.08) 0deg)` }"
						/>
						<div class="progress-inner">{{ Math.round(totalProgress * 100) }}%</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Filter Tabs -->
		<div class="badges-tabs">
			<div
				v-for="tab in state.tabs"
				:key="tab.key"
				:class="['badges-tab', { active: state.activeTab === tab.key }]"
				@click="state.activeTab = tab.key"
			>
				{{ tab.label }}
			</div>
		</div>

		<!-- Badge Groups -->
		<div class="badges-content">
			<div v-for="group in groupedBadges" :key="group.city.id" class="badge-group">
				<div class="group-title">
					<MapPin :size="14" />
					<span>{{ group.city.name }}</span>
					<span class="group-count">{{ group.unlocked }}/{{ group.badges.length }}</span>
				</div>
				<div class="group-list">
					<div
						v-for="badge in group.badges"
						:key="badge.id"
						:class="['badge-card', { unlocked: badge.progress >= 1 }]"
						@click="goBadgeDetail(badge)"
					>
						<div class="badge-icon">{{ badge.icon }}</div>
						<div class="badge-info">
							<h3 class="badge-name">{{ badge.name }}</h3>
							<p class="badge-condition">{{ badge.condition }}</p>
							<div class="badge-meta">
								<span v-if="badge.progress >= 1" class="badge-unlock-time">{{ badge.unlockTime }} 解锁</span>
								<span v-else class="badge-progress-text">进度 {{ Math.round(badge.progress * 100) }}%</span>
							</div>
						</div>
						<div class="badge-progress">
							<div class="progress-ring">
								<div
									class="progress-fill"
									:style="{
										background: `conic-gradient(${getBadgeColor(badge)} ${badge.progress * 360}deg, rgba(255,255,255,0.08) 0deg)`,
									}"
								/>
								<div class="progress-inner">
									<Check :size="12" v-if="badge.progress >= 1" />
									<span v-else>{{ Math.round(badge.progress * 100) }}%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-if="!groupedBadges.length" class="badges-empty">
			<Award :size="48" />
			<p>暂无符合条件的徽章</p>
		</div>
	</div>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useRouter } from "vue-router"
import { ChevronLeft, Share2, MapPin, Award, Check } from "lucide-vue-next"
import { badges } from "@/mock/badges"
import { cities, getCityById } from "@/mock/destinations"
import { showToast } from "vant"

const router = useRouter()

const state = reactive({
	activeTab: "all",
	tabs: [
		{ key: "all", label: "全部" },
		{ key: "unlocked", label: "已解锁" },
		{ key: "progress", label: "进行中" },
	],
})

const levelColorMap = {
	gold: "#d4a843",
	purple: "#8b5cf6",
	red: "#c23b22",
	blue: "#0ea5e9",
}

const filteredBadges = computed(() => {
	if (state.activeTab === "unlocked") return badges.filter((item) => item.progress >= 1)
	if (state.activeTab === "progress") return badges.filter((item) => item.progress > 0 && item.progress < 1)
	return badges
})

const groupedBadges = computed(() => {
	const groups = {}
	filteredBadges.value.forEach((badge) => {
		const cityId = badge.city_id
		if (!groups[cityId]) {
			groups[cityId] = {
				city: getCityById(cityId),
				badges: [],
				unlocked: 0,
			}
		}
		groups[cityId].badges.push(badge)
		if (badge.progress >= 1) groups[cityId].unlocked += 1
	})
	return cities
		.map((city) => groups[city.id])
		.filter(Boolean)
		.sort((a, b) => b.unlocked - a.unlocked)
})

const unlockedCount = computed(() => badges.filter((item) => item.progress >= 1).length)
const totalCount = computed(() => badges.length)
const totalProgress = computed(() => badges.reduce((sum, item) => sum + item.progress, 0) / badges.length)

function getBadgeColor(badge) {
	return levelColorMap[badge.level] || "var(--accent-gold)"
}

function goBadgeDetail(badge) {
	if (badge.progress >= 1) {
		showToast({ message: `已获得「${badge.name}」`, icon: "success-o" })
	} else {
		showToast({ message: `继续打卡以解锁「${badge.name}」`, icon: "info-o" })
	}
}

function onAlert() {
	showToast({ message: "分享功能即将上线", icon: "warning-o" })
}
</script>

<style lang="less" scoped>
.page-badges {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	padding-bottom: 30px;
	position: relative;
	overflow-x: hidden;

	.badges-header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: var(--bg-primary);
		border-bottom: 1px solid var(--border-color);

		.badges-back,
		.badges-action {
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

		.badges-title {
			font-size: 16px;
			font-weight: 700;
		}
	}

	.badges-summary {
		padding: 20px;

		.summary-card {
			display: flex;
			align-items: center;
			gap: 16px;
			padding: 22px 20px;
			background: linear-gradient(135deg, rgba(212, 168, 67, 0.12), rgba(139, 92, 246, 0.08));
			border: 1px solid rgba(212, 168, 67, 0.15);
			border-radius: var(--radius-xl);

			.summary-icon {
				width: 56px;
				height: 56px;
				border-radius: 50%;
				background: rgba(212, 168, 67, 0.15);
				border: 1px solid rgba(212, 168, 67, 0.2);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28px;
				flex-shrink: 0;
			}

			.summary-info {
				flex: 1;

				.summary-title {
					font-size: 18px;
					font-weight: 700;
					margin-bottom: 6px;
				}

				.summary-desc {
					font-size: 13px;
					color: var(--text-secondary);
				}
			}

			.summary-progress {
				flex-shrink: 0;

				.progress-ring {
					width: 56px;
					height: 56px;
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
						font-size: 11px;
						font-weight: 700;
						color: var(--accent-gold);
					}
				}
			}
		}
	}

	.badges-tabs {
		display: flex;
		gap: 10px;
		padding: 0 20px 20px;

		.badges-tab {
			padding: 8px 18px;
			border-radius: 20px;
			font-size: 13px;
			font-weight: 500;
			cursor: pointer;
			background: var(--bg-card);
			color: var(--text-tertiary);
			border: 1px solid var(--border-color);

			&.active {
				background: var(--color-primary);
				color: #fff;
				border-color: var(--color-primary);
			}
		}
	}

	.badges-content {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		gap: 24px;

		.badge-group {
			.group-title {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: 15px;
				font-weight: 700;
				margin-bottom: 12px;
				color: var(--text-primary);

				svg {
					color: var(--accent-gold);
				}

				.group-count {
					margin-left: auto;
					font-size: 12px;
					color: var(--text-tertiary);
					font-weight: 500;
				}
			}

			.group-list {
				display: flex;
				flex-direction: column;
				gap: 10px;
			}

			.badge-card {
				display: flex;
				align-items: center;
				gap: 14px;
				padding: 16px;
				background: var(--bg-card);
				border: 1px solid var(--border-color);
				border-radius: var(--radius-xl);
				cursor: pointer;
				opacity: 0.7;

				&.unlocked {
					opacity: 1;
					border-color: rgba(212, 168, 67, 0.25);
					background: linear-gradient(135deg, rgba(212, 168, 67, 0.08), var(--bg-card));
				}

				.badge-icon {
					width: 48px;
					height: 48px;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.06);
					border: 1px solid rgba(255, 255, 255, 0.08);
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
						margin-bottom: 6px;
					}

					.badge-meta {
						font-size: 11px;
						color: var(--accent-gold);

						.badge-progress-text {
							color: var(--text-tertiary);
						}
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
	}

	.badges-empty {
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
		}
	}
}
</style>
