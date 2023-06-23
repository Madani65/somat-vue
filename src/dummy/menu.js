const listMenu = [
  {
    id: 1,
    path: '/dashboard',
    name: 'dashboard',
    title: 'Dashboard',
    icon: 'view-dashboard',
    permission: [],
    parent_id: ''
  },
  {
    id: 21,
    name: 'magazine',
    path: '/magazine',
    title: 'Mading Sekolah',
    icon: 'newspaper',
    permission: [],
    parent_id: ''
  },
  {
    id: 211,
    path: '/magazine/school',
    name: 'magazine',
    title: 'Mading Sekolah',
    permission: [],
    parent_id: 21
  },
  {
    id: 212,
    path: '/magazine/news',
    name: 'news',
    title: 'Daftar Berita',
    permission: [],
    parent_id: 21
  },
  {
    id: 213,
    path: '/magazine/category',
    name: 'magazine.category',
    title: 'Kategori Berita',
    permission: [],
    parent_id: 21
  },
  {
    id: 3,
    path: '/registrations',
    name: 'registration',
    title: 'Registrasi Data',
    icon: 'clipboard-text',
    permission: [],
    parent_id: ''
  },
  {
    id: 31,
    path: '/registrations/school',
    name: 'registration.school',
    title: 'Data Sekolah',
    icon: 'clipboard-text',
    permission: [],
    parent_id: 3
  },
  {
    id: 311,
    path: '/registrations/school/data',
    name: 'registration.school.data',
    title: 'Identitas Sekolah',
    icon: 'clipboard-text',
    permission: [],
    parent_id: 31
  },
  {
    id: 312,
    path: '/registrations/school/setup',
    name: 'registration.school.setup',
    title: 'Pengaturan',
    icon: 'clipboard-text',
    permission: [],
    parent_id: 31
  },
  {
    id: 32,
    path: '/registrations/account',
    name: 'registration.account',
    title: 'Data Pengguna',
    icon: '',
    permission: [],
    parent_id: 3
  },
  {
    id: 321,
    path: '/registrations/account/students',
    name: 'registration.account.students',
    title: 'Data Siswa',
    icon: '',
    permission: [],
    parent_id: 32
  },
  {
    id: 322,
    path: '/registrations/account/employees',
    name: 'registration.account.employees',
    title: 'Data Pegawai',
    icon: '',
    permission: [],
    parent_id: 32
  },
  {
    id: 4,
    path: '/schedullers',
    name: 'scheduller',
    title: 'Penjadwalan',
    icon: 'calendar-clock',
    permission: [],
    parent_id: ''
  },
  {
    id: 41,
    path: '/schedullers/lesson',
    name: 'scheduller.lesson',
    title: 'Jadwal Pelajaran',
    icon: 'calendar-clock',
    permission: [],
    parent_id: 4
  },
  {
    id: 5,
    path: '/lessons',
    name: 'lesson',
    title: 'Mata Pelajaran',
    icon: 'content-copy',
    permission: [],
    parent_id: ''
  },
  {
    id: 51,
    path: '/lessons/master',
    name: 'lesson.master',
    title: 'Daftar Mata Pelajaran',
    icon: 'content-copy',
    permission: [],
    parent_id: 5
  },
  {
    id: 52,
    path: '/lessons/teacher-distributions',
    name: 'lesson.teacher.distributions',
    title: 'Distribusi Guru',
    icon: 'content-copy',
    permission: [],
    parent_id: 5
  },
  {
    id: 6,
    path: '/classes',
    name: 'class',
    title: 'Kelola Kelas',
    icon: 'book-account',
    permission: [],
    parent_id: ''
  },{
    id: 61,
    path: '/classes/major',
    name: 'class.major',
    title: 'Daftar Jurusan',
    icon: 'book-account',
    permission: [],
    parent_id: 6
  },{
    id: 62,
    path: '/classes/master',
    name: 'class.master',
    title: 'Daftar Kelas',
    icon: 'book-account',
    permission: [],
    parent_id: 6
  },{
    id: 63,
    path: '/classes/mapping',
    name: 'class.mapping',
    title: 'Pembagian Kelas',
    icon: 'book-account',
    permission: [],
    parent_id: 6
  },
  {
    id: 7,
    path: '/attendences',
    name: 'attendence',
    title: 'Manage Absensi',
    icon: 'fingerprint',
    permission: [],
    parent_id: ''
  },
  {
    id: 71,
    path: '/attendences/student',
    name: 'attendence.student',
    title: 'Absensi Siswa',
    icon: 'fingerprint',
    permission: [],
    parent_id: 7
  },
  {
    id: 72,
    path: '/attendences/teacher',
    name: 'attendence.teacher',
    title: 'Absensi Guru',
    icon: 'fingerprint',
    permission: [],
    parent_id: 7
  },
  {
    id: 8,
    path: '/users',
    name: 'user',
    title: 'Akun Pengguna',
    icon: 'account-cog',
    permission: [],
    parent_id: ''
  },
  {
    id: 81,
    path: '/users/setup',
    name: 'users.setup',
    title: 'Pengaturan Akun',
    permission: [],
    parent_id: 8
  },
  {
    id: 82,
    path: '/users/role',
    name: 'users.role',
    title: 'Hak Akses',
    permission: [],
    parent_id: 8
  },
  {
    id: 9,
    path: '/setups',
    name: 'setup',
    title: 'Setup',
    icon: 'cogs',
    permission: [],
    parent_id: ''
  },
  {
    id: 91,
    path: '/setups/menu',
    name: 'setup.menu',
    title: 'Menu',
    permission: [],
    parent_id: 9
  },
  {
    id: 92,
    path: '/setups/permission',
    name: 'setup.permission',
    title: 'Permissions',
    permission: [],
    parent_id: 9
  },
  {
    id: 93,
    path: '/setups/lookups',
    name: 'setup.lookup',
    title: 'Lookups',
    permission: [],
    parent_id: 9
  },
  {
    id: 94,
    path: '/setups/categories',
    name: 'setup.category',
    title: 'Category',
    permission: [],
    parent_id: 9
  },
  {
    id: 95,
    path: '/setups/times',
    name: 'setup.times',
    title: 'Setup Jam',
    permission: [],
    parent_id: 9
  },
  {
    id: 96,
    path: '/setups/organizations',
    name: 'setup.organizations',
    title: 'Setup Organisasi/Divisi',
    permission: [],
    parent_id: 9
  },
  {
    id: 97,
    path: '/setups/levels',
    name: 'setup.levels',
    title: 'Setup Jenjang Sekolah',
    permission: [],
    parent_id: 9
  },
  {
    id: 98,
    path: '/setups/period-academic',
    name: 'setup.period.academic',
    title: 'Periode Akademik',
    permission: [],
    parent_id: 9
  },
  {
    id:10,
    path: '/menu',
    name: 'menu',
    title: 'Menu 1',
    icon: 'format-list-bulleted',
    permission: [],
    parent_id: ''
  },
  {
    id: 101,
    path: '/menu/test',
    name: 'menu.1',
    title: 'Menu 1.1',
    icon: 'account-multiple',
    permission: [],
    parent_id: 10
  },
  {
    id:1011,
    path: '/menu/test/list',
    name: 'menu.1.1',
    title: 'Menu 1.1.1',
    icon: 'account-multiple',
    permission: [],
    parent_id: 101
  },
  {
    id:1012,
    path: '/menu/test/create',
    name: 'menu.1.2',
    title: 'Menu 1.1.2',
    icon: 'view-grid',
    permission: [],
    parent_id: 101
  },
  {
    id:11,
    path: '/myattendence',
    name: 'myattendence',
    title: 'Absensi',
    icon: 'fingerprint',
    permission: [],
    parent_id: ''
  },
  {
    id:1101,
    path: '/myattendence',
    name: 'myattendence.student',
    title: 'Absensi Siswa',
    icon: 'fingerprint',
    permission: [],
    parent_id: 11
  }
]

export { listMenu }
