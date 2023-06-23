const hasilBelajar = [
  {
    type: 'IPA',
    value: 80
  },
  {
    type: 'MTK',
    value: 70
  },
  {
    type: 'IPS',
    value: 95
  },
  {
    type: 'BHS IND',
    value: 78
  },
  {
    type: 'ENG',
    value: 88
  },
  {
    type: 'PJOK',
    value: 80
  },
  {
    type: 'PKN',
    value: 84
  },
  {
    type: 'AGM',
    value: 98
  },
  {
    type: 'ART',
    value: 66
  },
  {
    type: 'WRH',
    value: 78
  },
  {
    type: 'EKL',
    value: 72
  },
  {
    type: 'KMA',
    value: 60
  }
]

const absensi = [
  {
    type: 'Hadir',
    value: 78
  },
  {
    type: 'Izin',
    value: 2
  },
  {
    type: 'Sakit',
    value: 3
  },
  {
    type: 'Alpa',
    value: 1
  }
]

const nilaiUjian = {
  MTK: [
    { type: 'UH1', value: 60 },
    { type: 'UH2', value: 75 },
    { type: 'UH3', value: 80 },
    { type: 'UTS', value: 77 },
    { type: 'UAS', value: 95 }
  ],
  IPA: [
    { type: 'UH1', value: 60 },
    { type: 'UH2', value: 75 },
    { type: 'UTS', value: 77 },
    { type: 'UAS', value: 100 }
  ],
  IPS: [
    { type: 'UH1', value: 80 },
    { type: 'UH2', value: 75 },
    { type: 'UH3', value: 70 },
    { type: 'UTS', value: 77 },
    { type: 'UAS', value: 80 }
  ],
  BHSIND: [
    { type: 'UH1', value: 60 },
    { type: 'UH2', value: 75 },
    { type: 'UH3', value: 55 },
    { type: 'UTS', value: 77 },
    { type: 'UAS', value: 87 }
  ],
  AGM: [
    { type: 'UH1', value: 80 },
    { type: 'UH2', value: 75 },
    { type: 'UH3', value: 80 },
    { type: 'UTS', value: 77 },
    { type: 'UAS', value: 85 }
  ]
}

const eventCategories = [
  {
    id: 1,
    title: 'Holiday',
    color: 'red'
  },
  {
    id: 2,
    title: 'Event',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Special',
    color: 'amber'
  }
]

const events = [
  {
    title: 'Event 1',
    start: '2020-12-02',
    end: '2020-12-04',
    categoryId: 1
  },
  {
    title: 'Event 2',
    start: '2020-12-04',
    end: '2020-12-04',
    categoryId: 3
  },
  {
    title: 'Event Special',
    start: '2020-12-08',
    end: '2020-12-08',
    categoryId: 3
  },
  {
    title: 'Event 3',
    start: '2021-01-01',
    end: '2021-01-02',
    categoryId: 2
  },
  {
    title: 'Event 4',
    start: '2020-12-04',
    end: '2020-12-05',
    categoryId: 2
  }
]

const news = [
  {
    title: 'Pendaftaran Lomba Cerdas Cermat dibuka hingga 31-Desember-2020'
  },
  {
    title: 'Selamat! Tari Saman SMP karya anak bangsa meraih gelar juara pertama'
  }
]

const permitLetter = [
  {
    id: 1,
    title: 'Izin tidak masuk, acara keluarga',
    start: '2020-12-02',
    end: '2020-12-04'
  },
  {
    id: 2,
    title: 'Izin tidak masuk, sakit demam',
    start: '2020-12-04',
    end: '2020-12-04'
  },
  {
    id: 3,
    title: 'Izin tidak masuk, acara keluarga',
    start: '2020-12-08',
    end: '2020-12-08'
  },
]

export { hasilBelajar, absensi, nilaiUjian, events, eventCategories, news, permitLetter }
