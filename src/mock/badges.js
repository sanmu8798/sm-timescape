import { reactive } from "vue"
import cityImage from "@/assets/images/city.jpg"
import { checkins } from "./checkins"
import { attractions, foods, customs } from "./destinations"

function getCheckedTargets(cityId, targetType) {
	return new Set(
		checkins.filter((item) => String(item.city_id) === String(cityId) && item.target_type === targetType).map((item) => String(item.target_id)),
	)
}

function calculateCityBadgeProgress(cityId) {
	const cityAttractions = attractions.filter((item) => String(item.city_id) === String(cityId))
	const cityFoods = foods.filter((item) => String(item.city_id) === String(cityId))
	const cityCustoms = customs.filter((item) => String(item.city_id) === String(cityId))

	const checkedAttractions = getCheckedTargets(cityId, "attraction")
	const checkedFoods = getCheckedTargets(cityId, "food")
	const checkedCustoms = getCheckedTargets(cityId, "custom")

	const total = cityAttractions.length + cityFoods.length + cityCustoms.length
	const checked =
		cityAttractions.filter((item) => checkedAttractions.has(String(item.id))).length +
		cityFoods.filter((item) => checkedFoods.has(String(item.id))).length +
		cityCustoms.filter((item) => checkedCustoms.has(String(item.id))).length

	return total > 0 ? checked / total : 0
}

function calculateSpecialBadgeProgress(badge) {
	switch (badge.id) {
		case 101:
			return checkins.some((item) => String(item.city_id) === "1" && item.target_type === "food") ? 1 : 0
		case 102:
			return checkins.some((item) => item.target_type === "attraction" && String(item.target_id) === "102") ? 1 : 0
		case 103:
			return checkins.some((item) => item.target_type === "food" && ["205", "211"].includes(String(item.target_id))) ? 1 : 0
		default:
			return badge.progress || 0
	}
}

export function refreshBadges() {
	badges.forEach((badge) => {
		const nextProgress = badge.id <= 6 ? calculateCityBadgeProgress(badge.city_id) : calculateSpecialBadgeProgress(badge)
		badge.progress = nextProgress
		if (badge.progress >= 1 && !badge.unlockTime) {
			badge.unlockTime = new Date().toISOString().split("T")[0]
		}
	})
}

export const badges = reactive([
	{
		id: 1,
		name: "京华烟云·帝王之都",
		city_id: 1,
		level: "gold",
		icon: "🏛",
		desc: "完成北京全部景点、美食、风俗打卡后解锁",
		condition: "北京 景点3/3 · 美食2/2 · 风俗1/1",
		progress: 1,
		unlockTime: "2026-06-20",
		image: cityImage,
	},
	{
		id: 2,
		name: "西子湖畔·诗画江南",
		city_id: 2,
		level: "purple",
		icon: "🌸",
		desc: "完成杭州全部景点、美食、风俗打卡后解锁",
		condition: "杭州 景点3/3 · 美食2/2 · 风俗1/1",
		progress: 0.17,
		image: cityImage,
	},
	{
		id: 3,
		name: "天府之国·巴适人生",
		city_id: 3,
		level: "red",
		icon: "🐼",
		desc: "完成成都全部景点、美食、风俗打卡后解锁",
		condition: "成都 景点3/3 · 美食2/2 · 风俗1/1",
		progress: 0.33,
		image: cityImage,
	},
	{
		id: 4,
		name: "羊城花市·千年商都",
		city_id: 4,
		level: "gold",
		icon: "🌺",
		desc: "完成广州全部景点、美食、风俗打卡后解锁",
		condition: "广州 景点3/3 · 美食2/2 · 风俗1/1",
		progress: 0,
		image: cityImage,
	},
	{
		id: 5,
		name: "长安万年·盛世华章",
		city_id: 5,
		level: "gold",
		icon: "🏺",
		desc: "完成西安全部景点、美食、风俗打卡后解锁",
		condition: "西安 景点3/3 · 美食2/2 · 风俗1/1",
		progress: 0.17,
		image: cityImage,
	},
	{
		id: 6,
		name: "山城雾都·江湖重庆",
		city_id: 6,
		level: "red",
		icon: "🌉",
		desc: "完成重庆全部景点、美食、风俗打卡后解锁",
		condition: "重庆 景点3/3 · 美食2/2 · 风俗1/1",
		progress: 0.17,
		image: cityImage,
	},
	{
		id: 101,
		name: "初识京城",
		city_id: 1,
		level: "blue",
		icon: "🦆",
		desc: "首次在北京打卡任意美食解锁",
		condition: "北京美食打卡 ≥ 1",
		progress: 1,
		unlockTime: "2026-05-01",
		image: cityImage,
	},
	{
		id: 102,
		name: "长城好汉",
		city_id: 1,
		level: "gold",
		icon: "🧱",
		desc: "打卡八达岭长城解锁",
		condition: "打卡八达岭长城",
		progress: 1,
		unlockTime: "2026-06-18",
		image: cityImage,
	},
	{
		id: 103,
		name: "火锅达人",
		city_id: 6,
		level: "red",
		icon: "🌶",
		desc: "在重庆或成都打卡火锅解锁",
		condition: "成都火锅/重庆火锅 打卡 ≥ 1",
		progress: 1,
		unlockTime: "2026-06-10",
		image: cityImage,
	},
])

export function getBadgesByCityId(cityId) {
	return badges.filter((item) => String(item.city_id) === String(cityId))
}

export function getBadgeById(id) {
	return badges.find((item) => String(item.id) === String(id))
}

refreshBadges()
