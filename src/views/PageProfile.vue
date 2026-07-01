<template>
	<div class="page-profile">
		<!-- Profile Card -->
		<div class="profile-section">
			<div class="profile-card">
				<div class="profile-row">
					<div class="avatar">
						<div class="avatar-ring">
							<div class="avatar-inner">{{ user.nickname[0] }}</div>
						</div>
						<div class="avatar-level">{{ user.level }}</div>
					</div>
					<div class="profile-info">
						<div class="profile-name">{{ user.nickname }}</div>
						<div class="profile-id">ID {{ user.id }} · {{ user.level_title }} Lv.{{ user.level }}</div>
						<div class="profile-bio">{{ user.bio }}</div>
					</div>
					<div class="profile-arrow">
						<ChevronRight :size="16" />
					</div>
				</div>
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
					<div class="data-item">
						<div class="data-value">{{ user.activity_count }}</div>
						<div class="data-label">发布动态</div>
					</div>
				</div>
			</div>
		</div>

		<div class="section-pad">
			<!-- Quick Entries -->
			<div class="section-label">我的内容</div>
			<div class="entry-grid">
				<div class="entry-card">
					<div class="entry-icon entry-icon--blue">
						<Star :size="18" />
					</div>
					<div class="entry-title">收藏夹</div>
					<div class="entry-desc">{{ user.collect_count }} 项收藏</div>
				</div>
				<div class="entry-card">
					<div class="entry-icon entry-icon--gold">
						<FileText :size="18" />
					</div>
					<div class="entry-title">我的动态</div>
					<div class="entry-desc">{{ user.activity_count }} 篇内容</div>
				</div>
			</div>

			<!-- Function Entries -->
			<div class="section-label">探索记录</div>
			<div class="entry-grid">
				<div class="entry-card entry-card-wide">
					<div class="entry-icon entry-icon--green">
						<Zap :size="18" />
					</div>
					<div class="entry-content">
						<div class="entry-title">点亮进度</div>
						<div class="entry-desc">{{ user.visited_provinces }}/34 省份 · {{ user.visited_progress * 100 }}%</div>
					</div>
					<div class="entry-arrow">
						<ChevronRight :size="16" />
					</div>
				</div>
				<div class="entry-card entry-card-wide" @click="goBadges">
					<div class="entry-icon entry-icon--gold">
						<Award :size="18" />
					</div>
					<div class="entry-content">
						<div class="entry-title">成就徽章</div>
						<div class="entry-desc">已获得 {{ user.badge_count }} 枚 · 共 {{ user.all_badge_count }} 枚</div>
					</div>
					<div class="entry-arrow">
						<ChevronRight :size="16" />
					</div>
				</div>
				<div class="entry-card entry-card-wide" @click="goCheckInRecord">
					<div class="entry-icon entry-icon--blue">
						<Clock :size="18" />
					</div>
					<div class="entry-content">
						<div class="entry-title">足迹时间线</div>
						<div class="entry-desc">记录每一段旅程</div>
					</div>
					<div class="entry-arrow">
						<ChevronRight :size="16" />
					</div>
				</div>
			</div>

			<!-- More / Settings -->
			<div class="section-label">更多服务</div>
			<div class="menu-group">
				<div class="menu-row">
					<div class="menu-icon-wrap">
						<User :size="16" />
					</div>
					<div class="menu-content">
						<div class="menu-label">账号与安全</div>
					</div>
					<div class="menu-right">
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row">
					<div class="menu-icon-wrap">
						<Shield :size="16" />
					</div>
					<div class="menu-content">
						<div class="menu-label">隐私设置</div>
					</div>
					<div class="menu-right">
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row">
					<div class="menu-icon-wrap">
						<HelpCircle :size="16" />
					</div>
					<div class="menu-content">
						<div class="menu-label">帮助与反馈</div>
					</div>
					<div class="menu-right">
						<span class="menu-arrow">›</span>
					</div>
				</div>
				<div class="menu-row">
					<div class="menu-icon-wrap">
						<Info :size="16" />
					</div>
					<div class="menu-content">
						<div class="menu-label">关于时光集</div>
					</div>
					<div class="menu-right">
						<span class="menu-extra">v1.0.0</span>
						<span class="menu-arrow">›</span>
					</div>
				</div>
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
import { ChevronRight, Star, FileText, Zap, Award, Clock, User, Shield, HelpCircle, Info } from "lucide-vue-next"
import { useBaseStore } from "@/stores/base"

const router = useRouter()
const baseStore = useBaseStore()
const user = computed(() => baseStore.user)

const goBadges = () => router.push({ name: "PageBadges" })
const goCheckInRecord = () => router.push({ name: "PageCheckInRecord" })
</script>

<style lang="less" scoped>
.page-profile {
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	min-height: 100vh;
	overflow-x: hidden;
	position: relative;
	font-family: "Noto Sans SC", sans-serif;

	&::before {
		content: "";
		position: fixed;
		inset: 0;
		background:
			radial-gradient(ellipse at 20% 5%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 50%, rgba(14, 165, 233, 0.035) 0%, transparent 40%),
			radial-gradient(ellipse at 40% 95%, rgba(212, 168, 67, 0.025) 0%, transparent 35%);
		pointer-events: none;
		z-index: 0;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 20px;
		font-size: 12px;
		font-weight: 600;
		color: var(--text-tertiary);
	}

	.status-icons {
		display: flex;
		gap: 5px;
		align-items: center;
	}

	// ============ PROFILE CARD ============
	.profile-section {
		padding: 15px 20px 0;
		position: relative;
		z-index: 1;
	}

	.profile-card {
		background: var(--bg-glass);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: 28px 20px 24px;
		position: relative;
		overflow: hidden;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 1px;
			background: linear-gradient(90deg, transparent 5%, rgba(255, 255, 255, 0.1) 50%, transparent 95%);
		}

		&::after {
			content: "";
			position: absolute;
			top: -50%;
			right: -25%;
			width: 220px;
			height: 220px;
			background: radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 65%);
			border-radius: 50%;
			pointer-events: none;
		}
	}

	.profile-row {
		display: flex;
		align-items: center;
		gap: 16px;
		position: relative;
		z-index: 2;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		flex-shrink: 0;
		position: relative;
	}

	.avatar-ring {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		padding: 2px;
		background: linear-gradient(135deg, var(--accent-gold), var(--accent-purple), var(--accent-blue));
	}

	.avatar-inner {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: linear-gradient(135deg, #1a2a3e, #2a3a5a);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: "Noto Serif SC", serif;
		font-size: 22px;
		font-weight: 900;
		color: rgba(255, 255, 255, 0.85);
	}

	.avatar-level {
		position: absolute;
		bottom: -2px;
		right: -2px;
		min-width: 22px;
		height: 22px;
		border-radius: 11px;
		background: linear-gradient(135deg, var(--accent-gold), #b89030);
		border: 2.5px solid var(--bg-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 9px;
		font-weight: 900;
		color: #fff;
		padding: 0 4px;
		z-index: 3;
	}

	.profile-info {
		flex: 1;
		min-width: 0;
	}

	.profile-name {
		font-family: "Noto Serif SC", serif;
		font-size: 18px;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 3px;
	}

	.profile-id {
		font-size: 12px;
		color: var(--text-tertiary);
		margin-bottom: 6px;
	}

	.profile-bio {
		font-size: 12px;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.profile-arrow {
		color: var(--text-tertiary);
		flex-shrink: 0;
		cursor: pointer;
	}

	// ============ DATA STRIP ============
	.data-strip {
		display: flex;
		margin-top: 20px;
		padding-top: 18px;
		border-top: 1px solid var(--border-color);
		position: relative;
		z-index: 2;
	}

	.data-item {
		flex: 1;
		text-align: center;
		cursor: pointer;
		padding: 4px 0;
		transition: all 0.25s;
		position: relative;

		&:not(:last-child)::after {
			content: "";
			position: absolute;
			right: 0;
			top: 10%;
			height: 80%;
			width: 1px;
			background: var(--border-color);
		}
	}

	.data-value {
		font-family: "Noto Serif SC", serif;
		font-size: 20px;
		font-weight: 900;
		color: var(--text-primary);
		margin-bottom: 4px;
	}

	.data-label {
		font-size: 11px;
		color: var(--text-tertiary);
		font-weight: 500;
	}

	// ============ ENTRY CARDS ============
	.section-pad {
		padding: 0 20px;
		position: relative;
		z-index: 1;
	}

	.section-label {
		font-size: 12px;
		color: var(--text-tertiary);
		font-weight: 500;
		padding: 28px 0 14px;
		letter-spacing: 1px;
	}

	.entry-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.entry-card {
		background: var(--bg-glass);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: 20px 16px;
		cursor: pointer;
		transition: all 0.25s ease;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		position: relative;
		overflow: hidden;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 1px;
			background: linear-gradient(90deg, transparent 10%, rgba(255, 255, 255, 0.06) 50%, transparent 90%);
		}
	}

	.entry-card--relative {
		position: relative;
	}

	.entry-icon {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 14px;
	}

	.entry-icon--blue {
		background: rgba(14, 165, 233, 0.1);
		border: 1px solid rgba(14, 165, 233, 0.12);
		color: var(--accent-blue);
	}

	.entry-icon--gold {
		background: rgba(212, 168, 67, 0.1);
		border: 1px solid rgba(212, 168, 67, 0.12);
		color: var(--accent-gold);
	}

	.entry-icon--purple {
		background: rgba(139, 92, 246, 0.1);
		border: 1px solid rgba(139, 92, 246, 0.12);
		color: var(--accent-purple);
	}

	.entry-icon--cinnabar {
		background: rgba(226, 85, 61, 0.1);
		border: 1px solid rgba(226, 85, 61, 0.12);
		color: var(--accent-cinnabar);
	}

	.entry-icon--green {
		background: rgba(29, 107, 78, 0.1);
		border: 1px solid rgba(29, 107, 78, 0.12);
		color: var(--accent-green);
	}

	.entry-title {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 4px;
	}

	.entry-desc {
		font-size: 11px;
		color: var(--text-tertiary);
	}

	.entry-badge {
		position: absolute;
		top: 14px;
		right: 14px;
		min-width: 18px;
		height: 18px;
		border-radius: 9px;
		background: var(--accent-cinnabar);
		font-size: 10px;
		font-weight: 700;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 5px;
	}

	.entry-card-wide {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 18px 16px;

		.entry-icon {
			margin-bottom: 0;
			flex-shrink: 0;
		}

		.entry-content {
			flex: 1;
		}

		.entry-arrow {
			color: var(--text-tertiary);
			flex-shrink: 0;
		}
	}

	// ============ MENU LIST ============
	.menu-group {
		background: var(--bg-glass);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		overflow: hidden;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);

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
			left: 50px;
			right: 16px;
			height: 1px;
			background: var(--border-color);
		}
	}

	.menu-icon-wrap {
		width: 34px;
		height: 34px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border-color);
		color: var(--text-secondary);
	}

	.menu-content {
		flex: 1;
		min-width: 0;
	}

	.menu-label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-primary);
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
		font-size: 14px;
		line-height: 1;
	}

	// Switch
	.toggle-switch {
		width: 44px;
		height: 24px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid var(--border-color);
		position: relative;
		cursor: pointer;
		transition: all 0.3s ease;
		flex-shrink: 0;

		&.on {
			background: var(--accent-blue);
			border-color: var(--accent-blue);
		}
	}

	.toggle-knob {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--text-primary);
		position: absolute;
		top: 2px;
		left: 2px;
		transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
	}

	.toggle-switch.on .toggle-knob {
		transform: translateX(20px);
	}

	// ============ FOOTER ============
	.page-footer {
		text-align: center;
		padding: 36px 20px 100px;
		position: relative;
		z-index: 1;
	}

	.footer-app {
		font-size: 12px;
		color: var(--text-tertiary);
		margin-bottom: 4px;
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

	// ============ ANIMATIONS ============
	.fade-in-up {
		opacity: 0;
		transform: translateY(16px);
		animation: fadeInUp 0.55s ease forwards;
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	::-webkit-scrollbar {
		width: 0;
	}
}
</style>
