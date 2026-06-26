import cityImage from '@/assets/images/city.jpg'

export const mockUserLocation = {
  province: '广东',
  city: '广州'
}

export const mockExploreData = {
  foods: [
    {
      id: '1',
      name: '广州肠粉',
      category: 'food',
      city: '广州',
      province: '广东',
      image: cityImage,
      rating: 4.9,
      checkIns: '3.2万',
      checked: true,
      story: '肠粉是广州最具代表性的传统美食之一，起源于清朝末年。据传最早由广州泮溪酒家创制，因形似猪肠而得名。薄如蝉翼的米粉皮包裹着鲜美的馅料，淋上特制酱油，口感爽滑嫩鲜。如今肠粉已成为广州人早餐必不可少的一部分，承载着老广州人的味觉记忆。',
      tags: ['早餐', '老字号', '传统手艺']
    },
    {
      id: '2',
      name: '北京烤鸭',
      category: 'food',
      city: '北京',
      province: '北京',
      image: cityImage,
      rating: 4.9,
      checkIns: '5.8万',
      checked: false,
      story: '北京烤鸭是中国最具代表性的名菜之一，历史可追溯至明朝。最初是宫廷御膳，后传入民间。全聚德、便宜坊等老字号将其发扬光大。以果木炭火烤制，皮脆肉嫩，肥而不腻，配上薄饼、葱丝和甜面酱，是来北京必尝的经典美味。',
      tags: ['宫廷菜', '非遗', '必吃']
    },
    {
      id: '3',
      name: '西安肉夹馍',
      category: 'food',
      city: '西安',
      province: '陕西',
      image: cityImage,
      rating: 4.7,
      checkIns: '4.1万',
      checked: false,
      story: '肉夹馍是陕西传统名吃，被誉为"中式汉堡"。其历史可追溯至战国时期，当时的"腊汁肉"便是肉夹馍的前身。选用上等白吉馍，外酥里嫩，夹入炖煮数小时的腊汁肉，肉烂汤浓，肥而不腻，是西安街头最具代表性的小吃。',
      tags: ['街头小吃', '千年传承', '腊汁肉']
    },
    {
      id: '4',
      name: '重庆火锅',
      category: 'food',
      city: '重庆',
      province: '重庆',
      image: cityImage,
      rating: 4.8,
      checkIns: '6.3万',
      checked: false,
      story: '重庆火锅起源于明末清初，最初是嘉陵江畔船工们的简便吃法。将牛毛肚、鸭肠等下水在辣椒花椒汤中烫食，后逐渐演变为今天的麻辣火锅。以"麻、辣、鲜、香"著称，是重庆人热情豪爽性格的最佳体现。',
      tags: ['麻辣', '社交美食', '非遗']
    }
  ],
  spots: [
    {
      id: '5',
      name: '故宫博物院',
      category: 'spot',
      city: '北京',
      province: '北京',
      image: cityImage,
      rating: 4.9,
      checkIns: '12.8万',
      checked: true,
      story: '故宫是中国明清两代的皇家宫殿，始建于明永乐四年（1406年），历时14年建成。是世界上现存规模最大、保存最完整的木质结构古建筑群。占地72万平方米，房屋9999间半，珍藏着186万余件文物。1987年被联合国教科文组织列入世界文化遗产。',
      tags: ['世界遗产', '明清皇宫', '5A景区']
    },
    {
      id: '6',
      name: '西湖',
      category: 'spot',
      city: '杭州',
      province: '浙江',
      image: cityImage,
      rating: 4.8,
      checkIns: '10.5万',
      checked: false,
      story: '西湖是中国最著名的湖泊之一，自古便有"人间天堂"之美誉。2011年被列入世界文化遗产。西湖十景形成于南宋时期，如"断桥残雪"、"雷峰夕照"、"三潭印月"等，每一景都蕴含着深厚的文化底蕴。苏东坡曾在此疏浚湖水，留下了苏堤春晓的千古佳话。',
      tags: ['世界遗产', '十景', '诗意']
    },
    {
      id: '7',
      name: '兵马俑',
      category: 'spot',
      city: '西安',
      province: '陕西',
      image: cityImage,
      rating: 4.9,
      checkIns: '8.7万',
      checked: false,
      story: '秦始皇兵马俑是20世纪最伟大的考古发现之一，被誉为"世界第八大奇迹"。1974年被当地农民偶然发现，目前已发掘三个俑坑，出土陶俑陶马8000余件。每个俑的面容神态各不相同，展现了2200年前秦朝工匠高超的雕塑技艺。',
      tags: ['世界遗产', '考古发现', '秦朝']
    },
    {
      id: '8',
      name: '广州塔',
      category: 'spot',
      city: '广州',
      province: '广东',
      image: cityImage,
      rating: 4.6,
      checkIns: '6.2万',
      checked: false,
      story: '广州塔又称"小蛮腰"，是中国第一高塔，世界第三高塔，海拔600米。2010年建成，以其独特的纤细腰身造型闻名于世。塔内设有观光层、旋转餐厅、摩天轮等娱乐设施，是广州的地标性建筑，也是俯瞰广州夜景的最佳去处。',
      tags: ['地标', '摩天大楼', '夜景']
    }
  ],
  customs: [
    {
      id: '9',
      name: '广州迎春花市',
      category: 'custom',
      city: '广州',
      province: '广东',
      image: cityImage,
      rating: 4.7,
      checkIns: '2.8万',
      checked: false,
      story: '广州迎春花市是岭南地区最具特色的春节民俗活动，历史可追溯至明清时期。每年除夕前三天，广州的大街小巷都会摆满鲜花，以年桔、桃花、水仙为主。"行花街"是广州人过年的重要仪式，寓意"花开富贵、吉祥如意"。这一传统至今依然热闹非凡。',
      tags: ['春节民俗', '岭南文化', '非遗']
    },
    {
      id: '10',
      name: '西双版纳泼水节',
      category: 'custom',
      city: '西双版纳',
      province: '云南',
      image: cityImage,
      rating: 4.8,
      checkIns: '3.5万',
      checked: false,
      story: '泼水节是傣族最盛大的传统节日，一般在傣历新年（公历4月中旬）举行。人们互相泼水祝福，寓意洗去过去一年的不顺，迎接新的美好。节日期间还有放高升、赛龙舟、跳孔雀舞等活动，整个城市沉浸在欢乐祥和的节日氛围中。',
      tags: ['傣族', '民族节日', '祈福']
    },
    {
      id: '11',
      name: '潮汕英歌舞',
      category: 'custom',
      city: '汕头',
      province: '广东',
      image: cityImage,
      rating: 4.6,
      checkIns: '1.2万',
      checked: false,
      story: '英歌舞是潮汕地区流传已久的民间舞蹈，起源于明代，与祭祀活动和武术有关。表演者画着脸谱、手持短棍，伴随着密集的鼓点起舞，气势磅礴、威武雄壮。2006年被列入国家级非物质文化遗产名录，是潮汕文化的重要代表。',
      tags: ['非遗', '民间舞蹈', '潮汕文化']
    },
    {
      id: '12',
      name: '端午赛龙舟',
      category: 'custom',
      city: '佛山',
      province: '广东',
      image: cityImage,
      rating: 4.7,
      checkIns: '2.1万',
      checked: false,
      story: '端午节赛龙舟是中国重要的传统民俗活动，佛山的龙舟竞渡尤为著名。每年农历五月初五，各村镇的龙舟队齐聚河道展开激烈角逐。龙舟文化在广东已有千年历史，不仅是一项体育竞技，更承载着团结协作、奋勇向前的精神内涵。',
      tags: ['端午', '传统体育', '千年传承']
    }
  ]
}
