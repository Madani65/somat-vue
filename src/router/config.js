import Auth from '@/components/layouts/Auth'
import Defaults from '@/components/layouts/Default'
import RouteWrapper from '@/components/layouts/RouteWrapper'
  
  export const publicRoute = [
    {
      path: '*',
      component: () => import('@/views/error/NotFound.vue')
    },
    {
      path: '/auth',
      component: Auth,
      meta: {
        title: 'Login'
      },
      redirect: '/auth/login',
      hidden: true,
      children: [
        {
          path: 'login',
          name: 'login',
          meta: {
            title: 'Login'
          },
          component: () => import('@/views/auth/Login.vue')
        },
        {
          path: 'forget',
          name: 'forget',
          meta: {
            title: 'Forget Password'
          },
          component: () => import('@/views/auth/Forget.vue')
        }
      ]
    },
  
    {
      path: '/404',
      name: '404',
      meta: {
        title: 'Not Found'
      },
      component: () => import('@/views/error/NotFound.vue')
    },
  
    {
      path: '/500',
      name: '500',
      meta: {
        title: 'Server Error'
      },
      component: () => import('@/views/error/Error.vue')
    }
  ]
  
  export const protectedRoute = [
    {
      path: '/',
      redirect: '/dashboard',
      component: Defaults,
      meta: {
        title: 'Home',
        icon: 'mdi-home'
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard'
          },
          component: () => import('@/views/pages/Dashboard.vue')
        },
        {
          path: '/magazine',
          name: 'magazine',
          redirect: '/magazine/school',
          component: RouteWrapper,
          meta: {
            title: 'Mading Sekolah',
            icon: 'mdi-newspaper'
          },
          children: [
            {
              path: '/magazine/school',
              name: 'magazine.school',
              meta: {
                title: 'Mading Sekolah',
              },
              component: () => import('@/views/pages/magazine/Mading.vue')
            },
            {
              path: '/magazine/news',
              name: 'magazine.news',
              meta: {
                title: 'Daftar Berita',
              },
              component: () => import('@/views/pages/Soon.vue')
            },
            {
              path: '/magazine/category',
              name: 'magazine.category',
              meta: {
                title: 'Kategori Berita',
              },
              component: () => import('@/views/pages/Soon.vue')
            }
          ]
        },
        {
          path: '/registrations',
          name: 'registration',
          redirect: '/registrations/school',
          meta: {
            title: 'Registrasi Data',
            icon: 'mdi-clipboard-text'
          },
          component: RouteWrapper,
          children: [
            {
              path: '/registrations/school',
              name: 'registrations.school',
              meta: {
                title: 'Data Sekolah',
                icon: 'mdi-account-multiple'
              },
              redirect: '/registrations/school/data',
              component: RouteWrapper,
              children: [
                {
                  path: '/registrations/school/data',
                  name: 'registrations.school.data',
                  meta: {
                    title: 'Identitas Sekolah',
                    icon: 'mdi-account-multiple'
                  },
                  component: () => import('@/views/pages/registration/school/Identity.vue')
                },
                {
                  path: '/registrations/school/setup',
                  name: 'registrations.school.setup',
                  meta: {
                    title: 'Pengaturan Sekolah',
                    icon: 'mdi-account-multiple'
                  },
                  component: () => import('@/views/pages/Soon.vue')
                }
              ]
            },
            {
              path: '/registrations/account',
              name: 'registrations.account',
              meta: {
                title: 'Data Pengguna',
                icon: 'mdi-account-multiple'
              },
              redirect: '/registrations/account/employees',
              component: RouteWrapper,
              children: [
                {
                  path: '/registrations/account/employees',
                  name: 'registrations.account.employees',
                  meta: {
                    title: 'Data Pegawai',
                    icon: 'mdi-account-multiple'
                  },
                  component: () => import('@/views/pages/registration/employee/Index.vue')
                },
                {
                  path: '/registrations/account/students',
                  name: 'registrations.account.students',
                  meta: {
                    title: 'Data Siswa',
                    icon: 'mdi-account-multiple'
                  },
                  component: () => import('@/views/pages/registration/student/Index.vue')
                }
              ]
            }
          ]
        },
        {
          path: '/schedullers',
          name: 'scheduller',
          meta: {
            title: 'Penjadwalan',
            icon: 'mdi-calendar-clock'
          },
          component: RouteWrapper,
          children: [
            {
              path: '/schedullers/lesson',
              name: 'schedullers.lesson',
              meta: {
                title: 'Jadwal Pelajaran',
                icon: 'mdi-calendar-clock'
              },
              component: () => import('@/views/pages/schedule/lesson/Index.vue')
            },
          ]
        },
        {
          path: '/lessons',
          name: 'lesson',
          meta: {
            title: 'Mata Pelajaran',
            icon: 'mdi-content-copy'
          },
          redirect: '/lessons/master',
          component: RouteWrapper,
          children: [
            {
              path: '/lessons/master',
              name: 'lesson.master',
              meta: {
                title: 'Daftar Mata Pelajaran',
                icon: 'mdi-content-copy'
              },
              component: () => import('@/views/pages/lesson/Index.vue')
            },
            {
              path: '/lessons/teacher-distributions',
              name: 'lesson.teacher.distributions',
              meta: {
                title: 'Distribusi Guru',
                icon: 'mdi-content-copy'
              },
              component: () => import('@/views/pages/assignments/Teacher.vue')
            }
          ]
        },
        {
          path: '/classes',
          name: 'class',
          meta: {
            title: 'Kelola Kelas',
            icon: 'mdi-book-account'
          },
          redirect: '/classes/master',
          component: RouteWrapper,
          children: [
            {
              path: '/classes/major',
              name: 'class.major',
              meta: {
                title: 'Daftar Jurusan',
                icon: 'mdi-book-account'
              },
              component: () => import('@/views/pages/class/Major.vue')
            },
            {
              path: '/classes/master',
              name: 'class.master',
              meta: {
                title: 'Daftar Kelas',
                icon: 'mdi-book-account'
              },
              component: () => import('@/views/pages/class/Index.vue')
            },
            {
              path: '/classes/mapping',
              name: 'class.mapping',
              meta: {
                title: 'Pembagian Kelas',
                icon: 'mdi-book-account'
              },
              component: () => import('@/views/pages/class/Mapping.vue')
            }
          ]
        },
        {
          path: '/myattendence',
          name: 'myattendence',
          meta: {
            title: 'Absensi',
            icon: 'mdi-fingerprint'
          },
          component: RouteWrapper,
          redirect: '/myattendence/student',
          children: [
            {
              path: '/myattendence/student',
              name: 'myattendence.student',
              meta: {
                title: 'Absensi Siswa',
                icon: 'mdi-fingerprint'
              },
              component: () => import('@/views/pages/myattendence/student/Index.vue'),
            }
          ]
        },
        {
          path: '/attendences',
          name: 'attendence',
          meta: {
            title: 'Manage Absensi',
            icon: 'mdi-fingerprint'
          },
          component: RouteWrapper,
          redirect: '/attendences/student',
          children: [
            {
              path: '/attendences/student',
              name: 'attendence.student',
              meta: {
                title: 'Absensi Siswa',
                icon: 'mdi-fingerprint'
              },
              component: () => import('@/views/pages/attendences/Index.vue'),
            },
            {
              path: '/attendences/teacher',
              name: 'attendence.teacher',
              meta: {
                title: 'Absensi Guru',
                icon: 'mdi-fingerprint'
              },
              component: () => import('@/views/pages/Soon.vue'),
            }
          ]
        },
        {
          path: '/users',
          redirect: '/users/setup',
          name: 'users',
          meta: {
            title: 'Akun Pengguna',
            icon: 'mdi-account-cog'
          },
          component: RouteWrapper,
          children: [
            {
              path: '/users/setup',
              name: 'users.setup',
              meta: {
                title: 'Pengaturan Akun'
              },
              component: () => import('@/views/pages/settings/User.vue')
            },
            {
              path: '/users/role',
              name: 'users.role',
              meta: {
                title: 'Hak Akses'
              },
              component: () => import('@/views/pages/settings/authorization/Role.vue')
            }
          ]
        },
        {
          path: '/setups',
          name: 'setup',
          meta: {
            title: 'Setup',
            icon: 'mdi-cogs'
          },
          component: RouteWrapper,
          children: [
            {
              path: '/setups/menu',
              name: 'setup.menu',
              meta: {
                title: 'Menu'
              },
              component: () => import('@/views/pages/settings/Menu.vue')
            },
            {
              path: '/setups/permission',
              name: 'setup.permission',
              meta: {
                title: 'Permissions'
              },
              component: () => import('@/views/pages/settings/authorization/Template.vue')
            },
            {
              path: '/setups/lookups',
              name: 'setup.lookup',
              meta: {
                title: 'Lookups'
              },
              component: () => import('@/views/pages/settings/Lookup.vue')
            },
            {
              path: '/setups/categories',
              name: 'setup.category',
              meta: {
                title: 'Category'
              },
              component: () => import('@/views/pages/settings/category/Index.vue')
            },
            {
              path: '/setups/times',
              name: 'setup.times',
              meta: {
                title: 'Setup Jam'
              },
              component: () => import('@/views/pages/settings/time/Index.vue')
            },
            {
              path: '/setups/organizations',
              name: 'setup.organizations',
              meta: {
                title: 'Setup Organisasi/Divisi'
              },
              component: () => import('@/views/pages/settings/organization/Index.vue')
            },
            {
              path: '/setups/levels',
              name: 'setup.levels',
              meta: {
                title: 'Setup Jenjang Sekolah'
              },
              component: () => import('@/views/pages/settings/level/Index.vue')
            },
            {
              path: '/setups/period-academic',
              name: 'setup.period.academic',
              meta: {
                title: 'Periode Akademik'
              },
              component: () => import('@/views/pages/academic/Period.vue')
            }
          ]
        },
        {
          path: '/menu',
          name: 'menu',
          redirect: '/menu/test/list',
          component: RouteWrapper,
          meta: {
            title: 'Menu 1',
            icon: 'mdi-format-list-bulleted'
          },
          children: [
            {
              path: '/menu/test',
              name: 'menu.1',
              meta: {
                title: 'Menu 1.1',
                icon: 'mdi-account-multiple'
              },
              redirect: '/menu/test/list',
              component: RouteWrapper,
              children: [
                {
                  path: '/menu/test/list',
                  name: 'menu.1.1',
                  meta: {
                    title: 'Menu 1.1.1',
                    icon: 'mdi-account-multiple'
                  },
                  component: () => import('@/views/pages/Soon.vue')
                },
                {
                  path: '/menu/test/create',
                  name: 'menu.1.2',
                  meta: {
                    title: 'Menu 1.1.2',
                    icon: 'mdi-view-grid'
                  },
                  component: () => import('@/views/pages/Soon.vue')
                }
              ]
            }
          ]
        },
        {
          path: '/403',
          name: 'Forbidden',
          meta: {
            title: 'access_denied',
            hiddenInMenu: true
          },
          component: () => import('@/views/error/Deny.vue')
        },
      ]
    },
  ]
  