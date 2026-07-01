import { checkins } from "./checkins"
import { badges } from "./badges"
import { provinces } from "./home"
import { getCityById } from "./destinations"

function getProvinceNameByCityId(cityId) {
	const city = getCityById(cityId)
	if (!city) return ""
	if (city.province === "直辖市") return city.name
	return city.province.replace(/省|市|自治区|特别行政区$/, "")
}

export const profile = {
	id: "1",
	username: "sanmu_test",
	nickname: "三木",
	bio: "用脚步丈量中国，用味蕾记住每一座城", //个性签名
	phone: "13800138000",
	password: "123456",
	avatar: "https://foruda.gitee.com/avatar/1755671996439728249/660787_chemors_1755671996.png",
	level: 5, //探索等级
	level_title: "探索者", //探索等级称号
	visited_provinces: 5, // 已点亮省份数量（北京、浙江、四川、陕西、重庆）
	visited_cities: 5, // 已点亮城市数量（北京、杭州、成都、西安、重庆）
	badge_count: 4, // 已成就徽章数量
	all_badge_count: 9, // 总成就徽章数量
	activity_count: 12, // 已发表动态数量
	check_in_count: 12, // 已打卡次数
	collect_count: 6, // 已收藏动态数量
	current_province: "广东",
	current_city: "广州",
	visited_progress: 0.15, // 已点亮省份进度（5/34）
}

export function syncUserStats() {
	profile.check_in_count = checkins.length
	profile.activity_count = checkins.length
	profile.visited_cities = [...new Set(checkins.map((item) => item.city_id))].length

	provinces.forEach((item) => (item.lit = false))
	checkins.forEach((item) => {
		const provinceName = getProvinceNameByCityId(item.city_id)
		const province = provinces.find((p) => p.name === provinceName)
		if (province) province.lit = true
	})

	profile.visited_provinces = provinces.filter((item) => item.lit).length
	profile.visited_progress = +(profile.visited_provinces / provinces.length).toFixed(2)
	profile.badge_count = badges.filter((item) => item.progress >= 1).length
}
