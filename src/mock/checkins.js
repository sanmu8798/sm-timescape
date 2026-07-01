import { reactive } from "vue"
import cityImage from "@/assets/images/city.jpg"

const USER_ID = "1"

export const checkins = reactive([
	{
		id: 1,
		user_id: USER_ID,
		target_type: "attraction",
		target_id: 101,
		target_name: "故宫博物院",
		city_id: 1,
		content: "站在太和殿前，真正感受到了什么叫做皇家气派。紫禁城六百年，一砖一瓦皆是故事。",
		images: [cityImage, cityImage],
		location: "北京市东城区景山前街4号",
		create_time: "2026-06-20 10:30",
		like_count: 256,
		comment_count: 48,
	},
	{
		id: 2,
		user_id: USER_ID,
		target_type: "food",
		target_id: 201,
		target_name: "北京烤鸭",
		city_id: 1,
		content: "第一次吃正宗的果木烤鸭，皮脆肉嫩，蘸白糖的吃法打开了新世界的大门。",
		images: [cityImage],
		location: "全聚德烤鸭店（前门店）",
		create_time: "2026-06-19 19:20",
		like_count: 128,
		comment_count: 22,
	},
	{
		id: 3,
		user_id: USER_ID,
		target_type: "attraction",
		target_id: 107,
		target_name: "宽窄巷子",
		city_id: 3,
		content: "在宽巷子找了家老茶馆坐了一下午，盖碗茶、掏耳朵、看变脸，成都的节奏真的太巴适了。",
		images: [cityImage, cityImage, cityImage],
		location: "四川省成都市青羊区宽窄巷子",
		create_time: "2026-06-15 15:45",
		like_count: 189,
		comment_count: 35,
	},
	{
		id: 4,
		user_id: USER_ID,
		target_type: "attraction",
		target_id: 104,
		target_name: "西湖风景名胜区",
		city_id: 2,
		content: "断桥残雪没看到雪，但苏堤春晓的柳树已经足够美了。西湖果然是人间天堂。",
		images: [cityImage, cityImage],
		location: "浙江省杭州市西湖区龙井路1号",
		create_time: "2026-05-10 09:10",
		like_count: 312,
		comment_count: 67,
	},
	{
		id: 5,
		user_id: USER_ID,
		target_type: "attraction",
		target_id: 113,
		target_name: "秦始皇兵马俑博物馆",
		city_id: 5,
		content: "一号坑的军阵太震撼了，每一个陶俑的表情都不一样，两千年前的工艺让人叹为观止。",
		images: [cityImage],
		location: "陕西省西安市临潼区秦陵北路",
		create_time: "2026-04-05 11:20",
		like_count: 423,
		comment_count: 89,
	},
	{
		id: 6,
		user_id: USER_ID,
		target_type: "food",
		target_id: 211,
		target_name: "重庆火锅",
		city_id: 6,
		content: "九宫格牛油锅底越煮越香，毛肚七上八下刚刚好，这才是正宗的重庆味道。",
		images: [cityImage, cityImage],
		location: "珮姐老火锅（较场口店）",
		create_time: "2026-03-22 19:00",
		like_count: 167,
		comment_count: 31,
	},
	{
		id: 7,
		user_id: USER_ID,
		target_type: "custom",
		target_id: 303,
		target_name: "川剧变脸",
		city_id: 3,
		content: "在蜀风雅韵看了一场川剧，变脸的速度快得让人目不暇接，现场掌声不断。",
		images: [cityImage],
		location: "成都蜀风雅韵剧院",
		create_time: "2026-03-10 20:30",
		like_count: 98,
		comment_count: 14,
	},
	{
		id: 8,
		user_id: USER_ID,
		target_type: "city",
		target_id: 1,
		target_name: "北京",
		city_id: 1,
		content: "北京的中轴线从永定门到钟鼓楼，每一步都踩在历史的脉搏上。",
		images: [cityImage, cityImage, cityImage],
		location: "北京中轴线",
		create_time: "2026-02-14 16:20",
		like_count: 245,
		comment_count: 42,
	},
	{
		id: 9,
		user_id: USER_ID,
		target_type: "attraction",
		target_id: 102,
		target_name: "八达岭长城",
		city_id: 1,
		content: "不到长城非好汉。站在烽火台上远眺群山，才真正读懂这座雄关六百年来的守望。",
		images: [cityImage, cityImage],
		location: "北京市延庆区G6京藏高速58号出口",
		create_time: "2026-06-18 14:10",
		like_count: 198,
		comment_count: 36,
	},
	{
		id: 10,
		user_id: USER_ID,
		target_type: "attraction",
		target_id: 103,
		target_name: "天坛公园",
		city_id: 1,
		content: "祈年殿的蓝瓦金顶在晨光里太庄严了，回音壁前小声说话真的能听到回声。",
		images: [cityImage],
		location: "北京市东城区天坛东里甲1号",
		create_time: "2026-06-17 09:40",
		like_count: 156,
		comment_count: 28,
	},
	{
		id: 11,
		user_id: USER_ID,
		target_type: "food",
		target_id: 202,
		target_name: "老北京炸酱面",
		city_id: 1,
		content: "海碗居的炸酱面酱香浓郁，配上黄瓜丝和豆芽，一碗下肚全是老北京的烟火气。",
		images: [cityImage],
		location: "海碗居（增光路店）",
		create_time: "2026-06-16 12:30",
		like_count: 112,
		comment_count: 19,
	},
	{
		id: 12,
		user_id: USER_ID,
		target_type: "custom",
		target_id: 301,
		target_name: "京剧",
		city_id: 1,
		content: "在长安大戏院听了一场《霸王别姬》，西皮二黄的唱腔一开口，满堂彩。",
		images: [cityImage, cityImage],
		location: "北京长安大戏院",
		create_time: "2026-06-14 19:30",
		like_count: 178,
		comment_count: 31,
	},
])

export function addCheckin(data) {
	const nextId = checkins.length > 0 ? Math.max(...checkins.map((item) => item.id)) + 1 : 1
	const now = new Date()
	const pad = (n) => String(n).padStart(2, "0")
	const create_time = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`

	checkins.unshift({
		id: nextId,
		user_id: data.user_id || USER_ID,
		target_type: data.target_type,
		target_id: Number(data.target_id),
		target_name: data.target_name || "",
		city_id: Number(data.city_id),
		content: data.content || "",
		images: data.images?.length ? data.images : [cityImage],
		location: data.location || "",
		create_time: data.create_time || create_time,
		like_count: data.like_count || 0,
		comment_count: data.comment_count || 0,
	})
}

export function getCheckinsByUser(userId) {
	return checkins.filter((item) => String(item.user_id) === String(userId))
}

export function getCheckinsByCity(cityId) {
	return checkins.filter((item) => String(item.city_id) === String(cityId))
}

export function getCheckinsByTarget(targetType, targetId) {
	return checkins.filter((item) => item.target_type === targetType && String(item.target_id) === String(targetId))
}
