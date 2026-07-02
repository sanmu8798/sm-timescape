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
						<div class="logo-text">时光集</div>
						<div class="logo-sub">SM TIMESCAPE</div>
					</div>
				</div>
				<div class="nav-actions" v-if="authToken">
					<div class="avatar-sm">
						<div class="avatar-inner">
							<img :src="user.avatar" />
						</div>
						<div class="avatar-name">
							<div>{{ user.username }}</div>
							<div class="num-text">探索者: Lv.{{ user.level || 0 }}</div>
						</div>
					</div>
				</div>
				<div class="nav-actions" v-else @click="goLogin()">
					<div class="avatar-sm">
						<div class="avatar-inner">
							<User :size="20" />
						</div>
						<div class="avatar-name">
							<div>未登录</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Hero Content -->
			<div class="hero-content">
				<div class="greeting">{{ greeting }}</div>
				<div class="hero-title">
					已点亮 <span class="highlight">{{ user?.visited_provinces || 0 }}</span> 个省份<br />
					继续探索你的旅途徽章
				</div>

				<!-- Stats -->
				<div class="stats-row">
					<div class="stat-item">
						<div class="stat-number">{{ user?.visited_cities || 0 }}</div>
						<div class="stat-label">点亮城市</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{{ user?.badge_count || 0 }}</div>
						<div class="stat-label">成就徽章</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">{{ user?.activity_count || 0 }}</div>
						<div class="stat-label">发表动态</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="main-content">
			<!-- Quick Actions -->
			<div class="quick-actions">
				<div class="quick-action" @click="goCheckInRecord()">
					<div class="quick-action-icon red">
						<Globe :size="22" />
					</div>
					<span class="quick-action-label">点亮地图</span>
				</div>
				<div class="quick-action" @click="goBadges()">
					<div class="quick-action-icon gold">
						<Trophy :size="22" />
					</div>
					<span class="quick-action-label">成就墙</span>
				</div>
				<div class="quick-action" @click="goDiscoverFood()">
					<div class="quick-action-icon cinnabar">
						<Utensils :size="22" />
					</div>
					<span class="quick-action-label">美食图鉴</span>
				</div>
				<div class="quick-action" @click="goCheckInRecord()">
					<div class="quick-action-icon purple">
						<Footprints :size="22" />
					</div>
					<span class="quick-action-label">旅行足迹</span>
				</div>
			</div>

			<!-- Map Progress Component -->
			<SmMapCard
				:provinces="state.provinces"
				title="我的探索地图"
				:subtitle="`已解锁 ${user?.visited_provinces || 0}/34 省份`"
				:badge-text="`Lv.${user.level || 0} ${user.level_title || ''}`"
				only-light
			/>

			<!-- Promo Banner -->
			<div class="promo-banner" @click="onAlert()">
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
				<div class="section-more" @click="goDiscover()">
					查看全部
					<ChevronRight :size="14" />
				</div>
			</div>
			<div class="destinations-scroll">
				<div v-for="(item, index) in state.featuredCities" :key="index" class="dest-card" @click="goCity(item.id)">
					<img :src="item.image" :alt="item.name" class="dest-img" loading="lazy" />
					<div class="dest-overlay">
						<div class="dest-info">
							<div class="dest-name">{{ item.name }}</div>
							<div class="desc">{{ item.desc }}</div>
							<div class="dest-meta">
								<div class="rating">
									<Star :size="12" />
									{{ item.rating }}
								</div>
								<div class="checkins">{{ item.checkIns }}次打卡</div>
							</div>
							<div class="dest-tags">
								<span v-for="tag in item.tags" :key="tag" class="dest-tag">{{ tag }}</span>
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
				<div class="section-more" @click="goDiscoverFood()">
					更多美食
					<ChevronRight :size="14" />
				</div>
			</div>
			<div class="food-list">
				<div v-for="(item, index) in state.featuredFood" :key="index" class="food-item" @click="goFood(item.id)">
					<img :src="item.image" :alt="item.name" class="food-img" loading="lazy" />
					<div class="food-content">
						<div class="food-header">
							<div class="food-name">{{ item.name }}</div>
							<div class="food-status-badge" :class="item.status">{{ item.statusText }}</div>
						</div>
						<div class="food-origin">{{ item.origin }}</div>
						<div class="food-meta">
							<span class="food-rating">
								<Star :size="12" />
								{{ item.rating }}
							</span>
							<span class="food-checkins">{{ item.checkIns }}次打卡</span>
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
				<div class="section-more" @click="goCheckInRecord()">
					查看全部
					<ChevronRight :size="14" />
				</div>
			</div>
			<div class="footprints-list">
				<div v-for="(item, id) in state.recentFootprints" :key="item.id" class="footprint-item">
					<div class="footprint-left">
						<div class="footprint-connector" />
						<div class="footprint-node"></div>
						<div class="footprint-month" v-if="showMonthLabel(id)">{{ formatMonth(item.time) }}</div>
					</div>
					<div class="footprint-card" @click="goFootprint(item)">
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
import { reactive, computed } from "vue"
import { useRouter } from "vue-router"
import { showToast } from "vant"
import { Flag, User, Globe, Trophy, Utensils, Footprints, Sparkles, ChevronRight, Star } from "lucide-vue-next"
import { SmMapCard } from "@/components/index"
import { provinces, featuredCities, featuredFood, recentFootprints } from "@/mock/home"
import { useBaseStore } from "@/stores/base"

const router = useRouter()

const state = reactive({
	provinces,
	featuredCities,
	featuredFood,
	recentFootprints,
})

const baseStore = useBaseStore()
const authToken = computed(() => baseStore.authToken)
const user = computed(() => baseStore.user)

const greeting = computed(() => {
	const hour = new Date().getHours()
	if (hour < 12) {
		return "早上好，旅行者"
	} else if (hour === 12) {
		return "中午好，旅行者"
	} else if (hour < 18) {
		return "下午好，旅行者"
	} else {
		return "晚上好，旅行者"
	}
})

const formatMonth = (time) => {
	const date = new Date(time)
	return date.toLocaleDateString("zh-CN", { month: "2-digit" }).replace(/^\//, "")
}

const showMonthLabel = (idx) => {
	if (idx === 0) return true
	const current = state.recentFootprints[idx].time
	const prev = state.recentFootprints[idx - 1].time
	const currDate = new Date(current)
	const prevDate = new Date(prev)
	// 同时比较年份和月份，只有当年月都相同时才不显示
	return currDate.getFullYear() !== prevDate.getFullYear() || currDate.getMonth() !== prevDate.getMonth()
}

const onAlert = () => {
	showToast({
		message: "功能尚未开发，敬请期待",
		icon: "warning-o",
	})
}
const goLogin = () => router.push({ name: "PageLogin" })
const goCity = (id) => router.push({ name: "PageCityDetail", params: { id } })
const goFood = (id) => router.push({ name: "PageFoodDetail", params: { id } })
const goAttraction = (id) => router.push({ name: "PageDestinationDetail", params: { id } })
const goCustom = (id) => router.push({ name: "PageCustomDetail", params: { id } })

const goFootprint = (item) => {
	switch (item.type) {
		case "city":
			goCity(item.id)
			break
		case "food":
			goFood(item.id)
			break
		case "custom":
			goCustom(item.id)
			break
		case "attraction":
		default:
			goAttraction(item.id)
	}
}
const goDiscover = () => router.push({ name: "PageDiscover" })
const goDiscoverFood = () => router.push({ name: "PageDiscover", query: { tab: "food" } })
const goBadges = () => router.push({ name: "PageBadges" })
const goCheckInRecord = () => router.push({ name: "PageCheckInRecord" })
</script>

<style lang="less" scoped>
.page-home {
	background: var(--bg-primary);
	position: relative;

	&::before {
		content: "";
		position: fixed;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
		opacity: 0.05;
		pointer-events: none;
		z-index: 1000;
	}

	.hero {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--bg-secondary) 100%);
		padding: 0 var(--spacing-md) 18px;
		position: relative;
		overflow: hidden;
		border-radius: 0 0 24px 24px;

		.hero-pattern {
			position: absolute;
			top: 0;
			right: 0;
			width: 140px;
			height: 140px;
			opacity: 0.04;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='%23d4a843' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='35' fill='none' stroke='%23d4a843' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='25' fill='none' stroke='%23d4a843' stroke-width='0.5'/%3E%3Cpath d='M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M82 18 L18 82' stroke='%23d4a843' stroke-width='0.3'/%3E%3C/svg%3E");
			animation: rotateSlowly 60s linear infinite;
		}

		.nav-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8px 0;
			position: relative;
			z-index: 5;

			.logo {
				display: flex;
				align-items: center;
				gap: 8px;

				.logo-icon {
					width: 30px;
					height: 30px;
					background: linear-gradient(135deg, var(--accent-gold), #e2553d);
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					box-shadow: 0 2px 12px var(--bg-overlay);
				}

				.logo-text {
					font-weight: 700;
					font-size: 17px;
					color: #fff;
					letter-spacing: 2px;
				}

				.logo-sub {
					font-size: 9px;
					color: var(--accent-yellow);
					font-weight: 300;
					letter-spacing: 1px;
					margin-top: -2px;
				}
			}

			.nav-actions {
				display: flex;
				gap: 10px;
				align-items: center;
				color: #fff;

				.avatar-sm {
					display: flex;
					align-items: center;
					gap: 4px;

					.avatar-inner {
						width: 34px;
						height: 34px;
						border-radius: 50%;
						overflow: hidden;
						border: 2px solid var(--color-primary-light);
						background: linear-gradient(135deg, var(--accent-yellow), var(--accent-gold));
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
					.avatar-name {
						font-size: 12px;
						.num-text {
							font-size: 9px;
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
			padding-top: 4px;

			.greeting {
				color: rgba(255, 255, 255, 0.5);
				font-size: 11px;
				font-weight: 300;
				margin-bottom: 2px;
			}

			.hero-title {
				font-size: 20px;
				font-weight: 700;
				color: #fff;
				line-height: 1.3;
				margin-bottom: 14px;

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
				background: rgba(255, 255, 255, 0.06);
				border-radius: var(--radius-md);
				border: 1px solid rgba(255, 255, 255, 0.05);
				backdrop-filter: blur(10px);
				overflow: hidden;

				.stat-item {
					flex: 1;
					text-align: center;
					padding: 10px 6px;
					position: relative;

					&:not(:last-child)::after {
						content: "";
						position: absolute;
						right: 0;
						top: 20%;
						height: 60%;
						width: 1px;
						background: rgba(255, 255, 255, 0.08);
					}

					.stat-number {
						font-size: 18px;
						font-weight: 700;
						color: var(--accent-yellow);
					}

					.stat-label {
						font-size: 10px;
						color: rgba(255, 255, 255, 0.45);
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
				padding: 12px 8px 10px;
				text-align: center;
				cursor: pointer;
				display: flex;
				flex-direction: column;
				align-items: center;

				.quick-action-icon {
					width: 40px;
					height: 40px;
					margin: 0 auto 8px;
					border-radius: 12px;
					display: flex;
					align-items: center;
					justify-content: center;

					&.red {
						background: linear-gradient(135deg, var(--accent-yellow), #e2553d);
						color: #fff;
					}
					&.gold {
						background: linear-gradient(135deg, var(--accent-gold), var(--accent-yellow));
						color: #fff;
					}
					&.cinnabar {
						background: linear-gradient(135deg, #e2553d, #ff7f50);
						color: #fff;
					}
					&.purple {
						background: linear-gradient(135deg, #6366f1, #8b5cf6);
						color: #fff;
					}
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
			margin-bottom: 15px;
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
			position: relative;
			overflow: hidden;

			&::before {
				content: "";
				position: absolute;
				top: -30%;
				right: -10%;
				width: 120px;
				height: 120px;
				background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
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
					color: rgba(255, 255, 255, 0.7);
				}
			}

			.promo-btn {
				background: rgba(255, 255, 255, 0.2);
				color: #fff;
				border: 1px solid rgba(255, 255, 255, 0.3);
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

			&::-webkit-scrollbar {
				display: none;
			}

			-ms-overflow-style: none;
			scrollbar-width: none;

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

				.dest-img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.3s ease;
				}

				.dest-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 40%, transparent 100%);
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
							color: rgba(255, 255, 255, 0.7);
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
								color: rgba(255, 255, 255, 0.6);
							}
						}

						.dest-tags {
							display: flex;
							gap: 4px;
							flex-wrap: wrap;

							.dest-tag {
								font-size: 9px;
								padding: 3px 8px;
								background: rgba(255, 255, 255, 0.15);
								backdrop-filter: blur(8px);
								border-radius: 20px;
								color: #fff;
								border: 1px solid rgba(255, 255, 255, 0.1);
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
						box-shadow: 0 4px 16px rgba(212, 168, 67, 0.25);
						color: var(--accent-gold);
					}

					&.locked {
						background: #f0ebe3;
						border: 2px dashed rgba(0, 0, 0, 0.1);
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
						box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
					}
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
								background: linear-gradient(135deg, rgba(42, 122, 94, 0.12), rgba(42, 122, 94, 0.06));
								color: var(--accent-jade);
								border: 1px solid rgba(42, 122, 94, 0.15);
							}

							&.new {
								background: linear-gradient(135deg, rgba(194, 59, 34, 0.1), rgba(194, 59, 34, 0.05));
								color: var(--accent-red);
								border: 1px solid rgba(194, 59, 34, 0.12);
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
						background: linear-gradient(to bottom, var(--accent-gold), rgba(212, 168, 67, 0.08));
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
						box-shadow: 0 0 0 4px rgba(212, 168, 67, 0.08);
						background-color: var(--bg-primary);
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
	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}
	50% {
		transform: translate(20px, -20px) scale(1.1);
	}
}

@keyframes rotateSlowly {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
