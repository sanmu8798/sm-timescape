<template>
	<div class="page-profile">
		<!-- Background Decor -->
		<div class="profile-bg">
			<div class="profile-bg-glow" />
			<div class="profile-bg-orb orb-1" />
			<div class="profile-bg-orb orb-2" />
		</div>

		<!-- Profile Card -->
		<div class="profile-section">
			<div class="profile-card">
				<div class="profile-card-inner">
					<div class="avatar-wrap" @click="goEditProfile">
						<div class="avatar">
							<img :src="user.avatar" :alt="user.nickname" class="avatar-img" />
							<div class="avatar-level">Lv.{{ user.level }}</div>
						</div>
					</div>
					<div class="profile-info" @click="goEditProfile">
						<div class="profile-name">{{ user.nickname }}</div>
						<div class="profile-level">{{ user.level_title }}</div>
						<div class="profile-bio">{{ user.bio }}</div>
					</div>
					<div class="profile-edit-btn" @click="goEditProfile">
						<span>个人中心</span>
						<ChevronRight :size="14" />
					</div>
				</div>

				<!-- Data Strip -->
				<div class="data-strip">
					<div class="data-item">
						<div class="data-value">{{ user.visited_provinces }}</div>
						<div class="data-label">点亮省份</div>
					</div>
					<div class="data-item" @click="goCheckInRecord">
						<div class="data-value">{{ user.check_in_count }}</div>
						<div class="data-label">打卡记录</div>
					</div>
					<div class="data-item" @click="goBadges">
						<div class="data-value">{{ user.badge_count }}</div>
						<div class="data-label">获得徽章</div>
					</div>
					<div class="data-item" @click="goMyPosts">
						<div class="data-value">{{ user.activity_count }}</div>
						<div class="data-label">发布动态</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Quick Entries -->
		<div class="section-pad">
			<div class="menu-group quick-menu-group">
				<div class="menu-row" @click="goFavorites">
					<div class="menu-icon-wrap blue">
						<Bookmark :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">收藏夹</div>
					</div>
					<div class="menu-right">
						<span class="menu-extra">{{ user.collect_count }}</span>
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row" @click="goMyPosts">
					<div class="menu-icon-wrap gold">
						<FileText :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">我的动态</div>
					</div>
					<div class="menu-right">
						<span class="menu-extra">{{ user.activity_count }}</span>
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row" @click="goBadges">
					<div class="menu-icon-wrap purple">
						<Award :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">成就徽章</div>
					</div>
					<div class="menu-right">
						<span class="menu-extra">{{ user.badge_count }}</span>
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row" @click="goCheckInRecord">
					<div class="menu-icon-wrap green">
						<MapPin :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">足迹时间线</div>
					</div>
					<div class="menu-right">
						<span class="menu-extra">{{ user.check_in_count }}</span>
						<span class="menu-arrow">›</span>
					</div>
				</div>
			</div>

			<!-- More / Settings -->
			<div class="section-label">更多服务</div>
			<div class="menu-group">
				<div class="menu-row" @click="onAlert">
					<div class="menu-icon-wrap blue">
						<User :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">账号与安全</div>
						<div class="menu-desc">密码、手机号、账号管理</div>
					</div>
					<div class="menu-right">
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row" @click="onAlert">
					<div class="menu-icon-wrap purple">
						<Shield :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">隐私设置</div>
						<div class="menu-desc">动态可见、权限管理</div>
					</div>
					<div class="menu-right">
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row" @click="onAlert">
					<div class="menu-icon-wrap green">
						<HelpCircle :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">帮助与反馈</div>
						<div class="menu-desc">常见问题、意见反馈</div>
					</div>
					<div class="menu-right">
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row" @click="onAlert">
					<div class="menu-icon-wrap gold">
						<Info :size="18" />
					</div>
					<div class="menu-content">
						<div class="menu-label">关于时光集</div>
						<div class="menu-desc">版本信息、用户协议</div>
					</div>
					<div class="menu-right">
						<span class="menu-extra">v1.0.0</span>
						<span class="menu-arrow">›</span>
					</div>
				</div>
			</div>

			<!-- Logout -->
			<div class="logout-row" @click="onAlert">
				<LogOut :size="16" />
				<span>退出登录</span>
			</div>
		</div>

		<!-- Footer -->
		<div class="page-footer">
			<div class="footer-app">时光集</div>
			<div class="footer-ver">SM TIMESCAPE · v1.0.0</div>
			<div class="footer-line"></div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { showToast } from "vant"
import { ChevronRight, FileText, Award, User, Shield, HelpCircle, Info, LogOut, Bookmark, MapPin } from "lucide-vue-next"
import { useBaseStore } from "@/stores/base"

const router = useRouter()
const baseStore = useBaseStore()
const user = computed(() => baseStore.user || {})

const onAlert = () => {
	showToast({
		message: "功能尚未开发，敬请期待",
		icon: "warning-o",
	})
}

const goEditProfile = () => router.push({ name: "PageEditProfile" })
const goFavorites = () => router.push({ name: "PageFavorites" })
const goMyPosts = () => router.push({ name: "PageMyPosts" })
const goBadges = () => router.push({ name: "PageBadges" })
const goCheckInRecord = () => router.push({ name: "PageCheckInRecord" })
</script>

<style lang="less" scoped>
.page-profile {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 20px auto 0;
	position: relative;
	overflow-x: hidden;
	font-family: "Noto Sans SC", sans-serif;
	padding-bottom: 60px;

	.profile-bg {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;

		.profile-bg-glow {
			position: absolute;
			top: -120px;
			left: 50%;
			transform: translateX(-50%);
			width: 420px;
			height: 420px;
			background: radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(102, 126, 234, 0.08) 40%, transparent 70%);
			filter: blur(40px);
		}

		.profile-bg-orb {
			position: absolute;
			border-radius: 50%;
			filter: blur(60px);
			opacity: 0.35;

			&.orb-1 {
				top: 80px;
				right: -60px;
				width: 180px;
				height: 180px;
				background: rgba(212, 168, 67, 0.25);
			}

			&.orb-2 {
				top: 200px;
				left: -50px;
				width: 150px;
				height: 150px;
				background: rgba(14, 165, 233, 0.2);
			}
		}
	}

	.profile-section {
		position: relative;
		z-index: 1;
		padding: 0 20px;
		margin-bottom: 24px;
	}

	.profile-card {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-xl);
		padding: 15px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
		position: relative;
		overflow: hidden;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 1px;
			background: linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, 0.2) 50%, transparent 90%);
		}
	}

	.profile-card-inner {
		display: flex;
		align-items: flex-start;
		gap: 15px;
		margin-bottom: 24px;
	}

	.avatar-wrap {
		flex-shrink: 0;
		cursor: pointer;
	}

	.avatar {
		position: relative;
		width: 76px;
		height: 76px;
		border-radius: 50%;
		padding: 3px;
		background: linear-gradient(135deg, var(--accent-gold), var(--accent-purple), var(--accent-blue));
		box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);

		.avatar-img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			object-fit: cover;
			border: 2px solid var(--bg-primary);
		}

		.avatar-level {
			position: absolute;
			bottom: -2px;
			right: -2px;
			min-width: 34px;
			height: 18px;
			border-radius: 9px;
			background: linear-gradient(135deg, var(--accent-gold), #b89030);
			border: 2px solid var(--bg-primary);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 9px;
			font-weight: 900;
			color: #fff;
			padding: 0 6px;
		}
	}

	.profile-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.profile-name {
		font-family: "Noto Serif SC", serif;
		font-size: 22px;
		font-weight: 800;
		margin-bottom: 4px;
		background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.85) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.profile-level {
		display: inline-block;
		font-size: 11px;
		font-weight: 700;
		color: var(--accent-gold);
		padding: 3px 10px;
		border-radius: 20px;
		background: rgba(212, 168, 67, 0.12);
		border: 1px solid rgba(212, 168, 67, 0.2);
		margin-bottom: 8px;
	}

	.profile-bio {
		font-size: 12px;
		color: var(--text-secondary);
		line-height: 1.5;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.profile-edit-btn {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 10px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		font-size: 12px;
		font-weight: 600;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.25s;

		&:active {
			background: rgba(255, 255, 255, 0.12);
		}
	}

	.data-strip {
		display: flex;
		padding-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.data-item {
		flex: 1;
		text-align: center;
		cursor: pointer;
		transition: all 0.25s;

		.data-value {
			font-family: "Noto Serif SC", serif;
			font-size: 22px;
			font-weight: 800;
			color: #fff;
			margin-bottom: 4px;
		}

		.data-label {
			font-size: 11px;
			color: var(--text-tertiary);
			font-weight: 500;
		}
	}

	.section-pad {
		position: relative;
		z-index: 1;
		padding: 0 20px;
	}

	.quick-menu-group {
		margin-bottom: 28px;
	}

	.section-label {
		font-size: 12px;
		color: var(--text-tertiary);
		font-weight: 600;
		margin-bottom: 14px;
		letter-spacing: 1px;
	}

	.menu-group {
		background: var(--bg-glass);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		overflow: hidden;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		margin-bottom: 16px;

		&::before {
			content: "";
			display: block;
			height: 1px;
			background: linear-gradient(90deg, transparent 5%, rgba(255, 255, 255, 0.06) 50%, transparent 95%);
		}
	}

	.menu-row {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 16px;
		cursor: pointer;
		transition: background 0.2s;
		position: relative;

		&:not(:last-child)::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 62px;
			right: 16px;
			height: 1px;
			background: var(--border-color);
		}

		&:active {
			background: rgba(255, 255, 255, 0.03);
		}
	}

	.menu-icon-wrap {
		width: 38px;
		height: 38px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border-color);
		color: var(--text-secondary);

		&.blue {
			background: rgba(14, 165, 233, 0.1);
			border-color: rgba(14, 165, 233, 0.15);
			color: var(--accent-blue);
		}

		&.purple {
			background: rgba(139, 92, 246, 0.1);
			border-color: rgba(139, 92, 246, 0.15);
			color: var(--accent-purple);
		}

		&.green {
			background: rgba(29, 107, 78, 0.1);
			border-color: rgba(29, 107, 78, 0.15);
			color: var(--accent-green);
		}

		&.gold {
			background: rgba(212, 168, 67, 0.1);
			border-color: rgba(212, 168, 67, 0.15);
			color: var(--accent-gold);
		}
	}

	.menu-content {
		flex: 1;
		min-width: 0;
	}

	.menu-label {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 3px;
	}

	.menu-desc {
		font-size: 11px;
		color: var(--text-tertiary);
	}

	.menu-right {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	.menu-extra {
		font-size: 12px;
		color: var(--text-tertiary);
	}

	.menu-arrow {
		color: var(--text-tertiary);
		font-size: 16px;
		line-height: 1;
	}

	.logout-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px;
		border-radius: var(--radius-lg);
		background: rgba(226, 85, 61, 0.06);
		border: 1px solid rgba(226, 85, 61, 0.15);
		color: var(--accent-cinnabar);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.25s;

		&:active {
			background: rgba(226, 85, 61, 0.1);
		}
	}

	.page-footer {
		text-align: center;
		padding: 36px 20px 30px;
		position: relative;
		z-index: 1;
	}

	.footer-app {
		font-size: 13px;
		font-weight: 700;
		color: var(--text-secondary);
		margin-bottom: 4px;
		letter-spacing: 2px;
	}

	.footer-ver {
		font-size: 11px;
		color: var(--text-tertiary);
		opacity: 0.5;
	}

	.footer-line {
		width: 32px;
		height: 2px;
		background: var(--border-color);
		border-radius: 1px;
		margin: 12px auto 0;
	}

	::-webkit-scrollbar {
		width: 0;
	}
}
</style>
