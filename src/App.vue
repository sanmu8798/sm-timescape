<template>
	<RouterView />
	<SmTabBar v-if="route.meta.tabbarShow" />
</template>

<script setup>
import { onMounted, watch } from "vue"
import { useStyleTag, useWindowSize } from "@vueuse/core"
import { useRoute } from "vue-router"
import { SmTabBar } from "@/components"
import { useBaseStore } from "@/stores/base"
import { profile, syncUserStats } from "@/mock/user"
import { refreshBadges } from "@/mock/badges"

const route = useRoute()

//根据宽度决定字体大小
const { width } = useWindowSize()
const { css } = useStyleTag("")
const setWidth = (width) => (css.value = `html{font-size:${width.value / 10}px`)

const baseStore = useBaseStore()
// demo初始登录的时候先设置为登录状态
baseStore.setAuthToken(true)
refreshBadges()
syncUserStats()
baseStore.setUser(profile)

onMounted(() => {
	setWidth(width)
})

watch(
	() => width,
	() => {
		setWidth(width)
	},
	{
		deep: true,
	},
)
</script>
