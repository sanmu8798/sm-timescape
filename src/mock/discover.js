import { attractions, foods, customs, cities, getCityById } from "./destinations"

const getCityName = (cityId) => getCityById(cityId)?.name || ""
const getProvinceName = (cityId) => getCityById(cityId)?.province || ""

const foodCheckInsMap = {
	201: "5.8万",
	202: "2.3万",
	203: "3.1万",
	204: "2.8万",
	205: "6.3万",
	206: "2.5万",
	207: "3.9万",
	208: "2.1万",
	209: "4.1万",
	210: "3.5万",
	211: "6.1万",
	212: "2.9万",
}

const spotCheckInsMap = {
	101: "12.8万",
	102: "9.5万",
	103: "6.2万",
	104: "11.3万",
	105: "5.8万",
	106: "3.4万",
	107: "7.1万",
	108: "6.5万",
	109: "4.8万",
	110: "3.2万",
	111: "8.4万",
	112: "4.0万",
	113: "10.6万",
	114: "7.2万",
	115: "5.5万",
	116: "9.8万",
	117: "6.9万",
	118: "5.1万",
}

export const foodsList = foods.map((item) => ({
	...item,
	category: "food",
	checked: [201, 202, 211].includes(item.id),
	city: getCityName(item.city_id),
	province: getProvinceName(item.city_id),
	checkIns: foodCheckInsMap[item.id] || "1.2万",
}))

export const spotsList = attractions.map((item) => ({
	...item,
	category: "spot",
	checked: [101, 102, 103, 104, 107, 113].includes(item.id),
	city: getCityName(item.city_id),
	province: getProvinceName(item.city_id),
	checkIns: spotCheckInsMap[item.id] || "1.2万",
}))

export const customsList = customs.map((item) => ({
	...item,
	category: "custom",
	checked: [301, 303].includes(item.id),
	city: getCityName(item.city_id),
	province: getProvinceName(item.city_id),
}))

export const hotCities = cities.map((item) => item.name)
