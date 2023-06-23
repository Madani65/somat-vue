import en from 'vuetify/es5/locale/en'

export default {
  label: 'English',
  translate: 'Translations',
  //school
  school: {
    identity: 'School Identity',
    name : 'School Name',
    level: {
      title: 'School Level',
      class: 'Class Level',
    }
  },
  academic: {
    period: {
      title: 'Periode Akademik',
      year: 'Tahun Ajaran',
      name: 'Nama Periode'
    }
  },
  attendence: {
    student: 'Absensi Siswa',
    teacher: 'Absensi Guru',
    today: 'Absensi Hari Ini',
    daily: 'Absensi Harian',
    lesson: 'Absensi Mata Pelajaran',
    class_now: 'Kelas saat ini',
    attend_all: 'Hadir Semua',
    status: 'Status Kehadiran',
    present: 'Hadir',
    permit: 'Ijin',
    sick: 'Sakit',
    absence: 'Alpa',
    new_letter: 'Buat Surat Izin',
    detail: 'Keterangan',
    permit_letter_title: 'Surat Perizinan',
    percentage: 'Persentase Kehadiran',
    please_select_period: 'Silahkan pilih periode absensi'
  },
  class: {
    title: 'Class',
    manage: 'Class Management',
    list: 'List of Class',
    level: 'Class Level',
    code: 'Class Code',
    name: 'Class Name',
    teacher: 'Wali Kelas',
    capacity: 'Class Capacity',
    total: 'Total Student Registered',
    major: {
      list: 'List of Majors',
      code: 'Major Code',
      name: 'Major Name',
      title: 'Major'
    },
    mapping: {
      title: 'Mapping Class'
    }
  },
  lesson: {
    title: 'Lesson',
    list: 'Lesson Lists',
    name: 'Lesson Name',
    category: 'Lesson Category'
  },
  schedule: {
    lesson: {
      title: 'Jadwal Pelajaran',
      form: 'Form Penjadwalan',
      setup: 'Atur Jadwal',
      teacher: 'Jadwal Guru',
      intersect: 'Daftar Jadwal Beririsan'
    },
    activity: {
      title: 'Jadwal Kegiatan'
    }
  },
  employee: {
    title: 'Employee Management',
    full_name: 'Employee Name',
    nip: 'NIP',
    nuptk: 'NUPTK',
    status: 'Status Pegawai',
    sk: 'SK Pengangkatan',
    active_start: 'Tanggal Gabung Mulai',
    active_end: 'Tanggal Gabung Sampai',
    skill: 'Bidang Studi/Keahlian'
  },
  student: {
    title: 'Data Siswa',
    name: 'Nama Siswa',
    nis: 'NIS',
    nisn: 'NISN',
    son_of: 'Anak Ke-',
    in_period_year : 'Tahun Masuk',
    out_period_year : 'Tahun Keluar',
    ppdb: 'PPDB',
    mutation_from: 'Pindahan',
    mutation_to: 'Keluar/Mutasi',
    passed: 'Lulus',
    school_from: 'Asal Sekolah',
    certificate_no: 'No. Ijazah',
    skhun: 'SKHUN',
    parents: {
      data: 'Data Orang Tua & Wali',
      relation: 'Hubungan',
      job: 'Pekerjaan',
    }
  },
  personal: {
    name: 'Nama',
    fullname: 'Nama Lengkap',
    placeofbirth: 'Place of Birth',
    dateofbirth: 'Date of Birth',
    empstatus: 'Employee Status',
    position: 'Position',
    data: 'Personal Data',
    nik: 'NIK',
    kk: 'No. Kartu Keluarga',
    npwp: 'NPWP',
    first_name: 'Nama Depan',
    last_name: 'Nama Belakang',
    title_first: 'Gelar Depan',
    title_last: 'Gelar Belakang',
    gender: 'Jenis Kelamin',
    religion: 'Agama',
    citizenship: 'Kewarganegaraan',
    blood_type: 'Golongan Darah',
    marriage_status: 'Status Perkawinan',
    last_graduated: 'Pendidikan Terakhir',
    phone: 'No. Telp',
    mobile: 'No. HP',
    email: 'Email',
    status: 'Status',
    job: 'Pekerjaan',
    salary: 'Gaji',
    location: {
      address : 'Alamat',
      province: 'Provinsi',
    }
  },
  organization: {
    manage: 'Organization/Divisi Management',
    division: {
      title: 'Organization/Division'
    },
    position: {
      title: 'Position'
    },
    job: {
      title: 'Job',
      type: 'Pekerjaan'
    }
  },
  assignment : {
    title: 'Penugasan',
    teacher : {
      title : 'Distribusi Guru',
      sk_agreement : 'SK Mengajar',
      decree_number: 'Nomor SK',
      name : 'Nama Pengajar',
      upload_sk : 'Upload File SK'
    }
  },
  setup: {
    category: {
        title: 'Setup Category',
        lesson: {
            title: 'Lesson Category',
        },
        extschool: {
            title: 'Extra Curricular Category'
        },
        activity: {
            title: 'Activity Category',
            select: 'Pilih Kegiatan'
        }
    },
    time: {
      title: 'Time Setup',
      lesson: {
        title: 'Study Time'
      },
      extschool: {
        title: 'Extra Curricular Time'
      },
      start: 'Start Time',
      end: 'End Time',
      activity: 'Activity Time'
    }
  },
  button: {
      add: 'Add New',
      cancel: 'Cancel',
      update: 'Update',
      save: 'Save',
      bulkaction: 'Bulk Action',
      yes: 'Yes',
      no: 'No',
      delete: 'Delete',
      print: 'Print',
      view: 'View',
      publish: 'Publish',
      search: 'Cari'
  },
  bulkaction: {
      delete: 'Delete Selected',
      export: 'Export Data',
      print: 'Cetak Data',
      autofix: 'Auto Fix'
  },
  days_in_week: {
    mon: 'Senin',
    tue: 'Selasa',
    wed: 'Rabu',
    thu: 'Kamis',
    fri: 'Jum\'at',
    sat: 'Sabtu',
    sun: 'Minggu'
  },
  months_in_year: {
    jan: 'Januari',
    feb: 'Februari',
    mar: 'Maret',
    apr: 'April',
    may: 'Mei',
    jun: 'Juni',
    jul: 'Juli',
    aug: 'Agustus',
    sep: 'September',
    oct: 'Oktober',
    nov: 'November',
    dec: 'Desember'
  },
  day: 'Hari',
  time: 'Waktu',
  month: 'Bulan',
  description : 'Description',
  status: 'Status',
  active: 'Active',
  inactive: 'Inactive',
  effective_start_date: 'Effective Start Date',
  effective_end_date: 'Effective End Date',
  select: 'Select',
  control: 'Control',
  loadingdata: 'Loading... Please wait',
  confirmdelete: 'To delete this record.',
  confirmsure: 'Are You Sure ?',
  grade: 'Grade',
  pick_before_add: 'Pick one before add some data.',
  make_it_group: 'Buat Sebagai Group',
  add_new_line: 'Tambah Baris Baru',
  group: 'Group',
  start: 'Start',
  until: 'End',
  date: 'Tanggal',
  nodata: 'Data tidak ditemukan.',
  others: 'Others',
  total: 'Total',
  //page login
  login: 'Login',
  register: 'Register',
  username: 'Username',
  password: 'Password',
  login_account: 'Login accoount',
  detail_loc: 'Alamat Lengkap',
  //app drawer
  sponsor: 'Sponsor',
  // menu
  menu: {
    home: 'Home',
    media: 'Media',
    dashboard: 'Dashboard',
    task: 'Task',
    CMS: 'CMS',
    widget: 'Widget',
    chart: 'Chart',
    list: 'List',
    social: 'Social',
    statistic: 'Statistic',
    echart: 'Echart',
    g2: 'G2',
    mail: 'Mail',
    inbox: 'Inbox',
    table: 'Table',
    access_denied: 'Access Deny',
    basic_form: 'Basic Form',
    step_form: 'Wizard Form',
    form: 'Form',
    acl: 'ACL',
    users: 'Users',
    user_list: 'User List',
    edit_user: 'Edit User',
    create_user: 'Create User',
    changelog: 'Changelog',
    calendar: 'Calendar',
    all: 'All',
    dir: 'Directory'
  },
  //media
  media: 'Media',
  // rules
  rule: {
    required: '{0} is required'
  },

  //error

  ...en
}
