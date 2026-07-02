import { reactive } from "vue"
import cityImage from "@/assets/images/city.jpg"
import scenicImage from "@/assets/images/scenic_spot.jpg"
import foodImage from "@/assets/images/food.jpg"
import customsImage from "@/assets/images/customs.jpg"

export const favorites = reactive([
	{
		id: 1,
		target_type: "city",
		target_id: 1,
		city_id: 1,
		name: "北京",
		image: cityImage,
		create_time: "2026-06-10 08:00",
	},
	{
		id: 2,
		target_type: "attraction",
		target_id: 101,
		city_id: 1,
		name: "故宫博物院",
		image: scenicImage,
		create_time: "2026-06-12 14:30",
	},
	{
		id: 3,
		target_type: "food",
		target_id: 211,
		city_id: 6,
		name: "重庆火锅",
		image: foodImage,
		create_time: "2026-06-08 19:00",
	},
	{
		id: 4,
		target_type: "custom",
		target_id: 303,
		city_id: 3,
		name: "川剧变脸",
		image: customsImage,
		create_time: "2026-06-05 20:15",
	},
])

export function getFavoritesByUser(userId) {
	return favorites
}
