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
import { profile } from "@/mock/user"

const route = useRoute()

//根据宽度决定字体大小
const { width } = useWindowSize()
const { css } = useStyleTag("")
const setWidth = (width) => (css.value = `html{font-size:${width.value / 10}px}`)

onMounted(() => {
	setWidth(width)
})

const baseStore = useBaseStore()
// demo初始登录的时候先设置为登录状态
baseStore.setAuthToken(true)
baseStore.setUser(profile)

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
