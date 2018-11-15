import Vue from 'vue'
import Router from 'vue-router'
import Tables from '@/components/Tables/Tables'
import CreateEditTable from '@/components/Tables/CreateEditTable'
import Notes from '@/components/Notes/Notes'
import CreateEditNote from '@/components/Notes/CreateEditNote'
import TableBasic from '@/components/Tables/TableBasicMetadata'
import EditTableCategories from '@/components/Tables/EditTableCategories'
/*
import TableNotes from '@/components/Tables/TableNotes'
import TableDimensions from '@/components/Tables/TableDimensions' */

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/tables'
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables
    },
    {
      path: '/categories',
      name: 'EditTableCategories',
      component: EditTableCategories
    },
    {
      path: '/tables/edittable/:tableString',
      name: 'edittable',
      props: true,
      component: CreateEditTable,
      children: [
        {
          path: '/tablebasic',
          name: 'tablebasic',
          component: TableBasic
        }
      ]
      /* ,
      redirect: '/tables/tablebasic',
      children: [
        {
          path: '/tables/tablebasic',
          name: 'tablebasic',
          component: TableBasic
        },
        {
          path: '/tables/tablenotes',
          name: 'tablenotes',
          component: TableNotes
        },
        {
          path: '/tables/tabledimensions',
          name: 'tabledimensions',
          component: TableDimensions
        }
      ] */
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes
    },
    {
      path: '/notes/editnote/:programString/:noteString',
      name: 'editnote',
      props: true,
      component: CreateEditNote
    }
  ]
})
