import cityImage from '@/assets/images/city.jpg'

export const mockHomeData = {
  greeting: '',
    activityCount: 123,
  visitedCities: 9,
  totalCheckIns: 23,
  badgeCount: 47,
  level: 3,
  levelTitle: '探索者',
  signInDays: 7,
  mapProgress: 28,
  provinces: [
    { name: '北京', abbr: '京', lit: true }, { name: '上海', abbr: '沪', lit: true }, { name: '广东', abbr: '粤', lit: true },
    { name: '河南', abbr: '豫', lit: false }, { name: '四川', abbr: '川', lit: true }, { name: '西藏', abbr: '藏', lit: false },
    { name: '新疆', abbr: '新', lit: false }, { name: '浙江', abbr: '浙', lit: true }, { name: '陕西', abbr: '陕', lit: false },
    { name: '江苏', abbr: '苏', lit: true }, { name: '云南', abbr: '滇', lit: false }, { name: '内蒙古', abbr: '蒙', lit: false },
    { name: '山东', abbr: '鲁', lit: false }, { name: '湖南', abbr: '湘', lit: true }, { name: '湖北', abbr: '鄂', lit: false },
    { name: '福建', abbr: '闽', lit: true }, { name: '贵州', abbr: '黔', lit: false }, { name: '广西', abbr: '桂', lit: false },
    { name: '山西', abbr: '晋', lit: false }, { name: '重庆', abbr: '渝', lit: true }, { name: '辽宁', abbr: '辽', lit: false },
    { name: '吉林', abbr: '吉', lit: false }, { name: '黑龙江', abbr: '黑', lit: false }, { name: '河北', abbr: '冀', lit: false },
    { name: '安徽', abbr: '皖', lit: false }, { name: '江西', abbr: '赣', lit: false }, { name: '甘肃', abbr: '甘', lit: false },
    { name: '海南', abbr: '琼', lit: false }, { name: '宁夏', abbr: '宁', lit: false }, { name: '青海', abbr: '青', lit: false },
    { name: '天津', abbr: '津', lit: false }, { name: '香港', abbr: '港', lit: false }, { name: '澳门', abbr: '澳', lit: false },
    { name: '台湾', abbr: '台', lit: false }
  ],
  featuredCities: [
    { id: '1', name: '北京', province: '北京市', image: cityImage, rating: 4.9, checkIns: '12.8万', tags: ['故宫', '烤鸭', '胡同'], desc: '千年古都，文化底蕴深厚' },
    { id: '3', name: '成都', province: '四川省', image: cityImage, rating: 4.8, checkIns: '9.6万', tags: ['火锅', '熊猫', '川剧'], desc: '美食之都，悠闲慢生活' },
    { id: '2', name: '杭州', province: '浙江省', image: cityImage, rating: 4.7, checkIns: '8.2万', tags: ['西湖', '龙井', '丝绸'], desc: '人间天堂，诗意江南' },
    { id: '5', name: '西安', province: '陕西省', image: cityImage, rating: 4.8, checkIns: '7.5万', tags: ['兵马俑', '肉夹馍', '古城墙'], desc: '十三朝古都，历史印记' },
    { id: '6', name: '长沙', province: '湖南省', image: cityImage, rating: 4.6, checkIns: '6.3万', tags: ['臭豆腐', '橘子洲', '茶颜悦色'], desc: '网红城市，烟火气十足' }
  ],
  foodItems: [
    { id: '1', name: '北京烤鸭', origin: '北京', image: cityImage, rating: 4.9, checkIns: '3.2万', status: 'done', statusText: '已解锁' },
    { id: '2', name: '重庆火锅', origin: '重庆', image: cityImage, rating: 4.8, checkIns: '2.8万', status: 'done', statusText: '已解锁' },
    { id: '3', name: '西安肉夹馍', origin: '陕西', image: cityImage, rating: 4.7, checkIns: '1.9万', status: 'new', statusText: '待探索' },
    { id: '4', name: '兰州拉面', origin: '甘肃', image: cityImage, rating: 4.6, checkIns: '1.5万', status: 'new', statusText: '待探索' }
  ],
  footprints: [
    { id: '1', name: '故宫博物院', city: '北京', time: '2026-06-20', image: cityImage },
    { id: '2', name: '宽窄巷子', city: '成都', time: '2026-06-15', image: cityImage },
    { id: '3', name: '西湖断桥', city: '杭州', time: '2026-05-10', image: cityImage },
    { id: '4', name: '回民街', city: '西安', time: '2026-04-05', image: cityImage }
  ]
}

export const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return '早安，旅行者'
  if (hour < 18) return '午安，旅行者'
  return '晚安，旅行者'
}
