import { reactive } from "vue"
import cityImage from "@/assets/images/city.jpg"
import { cities, getAttractionById } from "./destinations"

export const provinces = reactive([
	{ name: "北京", abbr: "京", lit: true },
	{ name: "上海", abbr: "沪", lit: false },
	{ name: "广东", abbr: "粤", lit: false },
	{ name: "河南", abbr: "豫", lit: false },
	{ name: "四川", abbr: "川", lit: true },
	{ name: "西藏", abbr: "藏", lit: false },
	{ name: "新疆", abbr: "新", lit: false },
	{ name: "浙江", abbr: "浙", lit: true },
	{ name: "陕西", abbr: "陕", lit: true },
	{ name: "江苏", abbr: "苏", lit: false },
	{ name: "云南", abbr: "滇", lit: false },
	{ name: "内蒙古", abbr: "蒙", lit: false },
	{ name: "山东", abbr: "鲁", lit: false },
	{ name: "湖南", abbr: "湘", lit: false },
	{ name: "湖北", abbr: "鄂", lit: false },
	{ name: "福建", abbr: "闽", lit: false },
	{ name: "贵州", abbr: "黔", lit: false },
	{ name: "广西", abbr: "桂", lit: false },
	{ name: "山西", abbr: "晋", lit: false },
	{ name: "重庆", abbr: "渝", lit: true },
	{ name: "辽宁", abbr: "辽", lit: false },
	{ name: "吉林", abbr: "吉", lit: false },
	{ name: "黑龙江", abbr: "黑", lit: false },
	{ name: "河北", abbr: "冀", lit: false },
	{ name: "安徽", abbr: "皖", lit: false },
	{ name: "江西", abbr: "赣", lit: false },
	{ name: "甘肃", abbr: "甘", lit: false },
	{ name: "海南", abbr: "琼", lit: false },
	{ name: "宁夏", abbr: "宁", lit: false },
	{ name: "青海", abbr: "青", lit: false },
	{ name: "天津", abbr: "津", lit: false },
	{ name: "香港", abbr: "港", lit: false },
	{ name: "澳门", abbr: "澳", lit: false },
	{ name: "台湾", abbr: "台", lit: false },
])

export const featuredCities = cities.map((item) => ({
	id: item.id,
	name: item.name,
	province: item.province,
	image: item.cover_image || cityImage,
	rating: item.rating,
	checkIns: item.check_ins,
	tags: item.tags,
	desc: item.summary.length > 20 ? item.summary.slice(0, 20) + "..." : item.summary,
}))

export const featuredFood = [
	{ id: 201, name: "北京烤鸭", origin: "北京", image: cityImage, rating: 4.8, checkIns: "5.8万", status: "done", statusText: "已解锁" },
	{ id: 211, name: "重庆火锅", origin: "重庆", image: cityImage, rating: 4.8, checkIns: "6.3万", status: "done", statusText: "已解锁" },
	{ id: 209, name: "腊汁肉夹馍", origin: "陕西", image: cityImage, rating: 4.7, checkIns: "4.1万", status: "new", statusText: "待探索" },
	{ id: 207, name: "广式早茶", origin: "广州", image: cityImage, rating: 4.8, checkIns: "3.9万", status: "new", statusText: "待探索" },
]

export const recentFootprints = [
	{ id: 101, name: getAttractionById(101)?.name, city_id: 1, city: "北京", time: "2026-06-20", image: cityImage },
	{ id: 107, name: getAttractionById(107)?.name, city_id: 3, city: "成都", time: "2026-06-15", image: cityImage },
	{ id: 104, name: getAttractionById(104)?.name, city_id: 2, city: "杭州", time: "2026-05-10", image: cityImage },
	{ id: 113, name: getAttractionById(113)?.name, city_id: 5, city: "西安", time: "2026-04-05", image: cityImage },
]
