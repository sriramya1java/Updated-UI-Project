import Vue from 'vue'
import Router from 'vue-router'
import UpdatedTablesList from '@/components/Tables/UpdatedTablesList'
import CreateEditTable from '@/components/Tables/CreateEditTable'
import UpdatedNotesList from '@/components/Notes/UpdatedNotesList'
import CreateEditNote from '@/components/Notes/CreateEditNote'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'UpdatedTablesList',
      component: UpdatedTablesList,
      meta: {
        breadCrumb: 'Tables'
      },
      children: [
        {
          path: 'edittable/:tableString',
          name: 'edittable',
          props: true,
          component: CreateEditTable,
          meta: {
            breadCrumb: 'Table Metadata'
          }
        }
      ]
    },
    {
      path: '/updatedNotesList',
      name: 'UpdatedNotesList',
      component: UpdatedNotesList,
      meta: {
        breadCrumb: 'Notes'
      },
      children: [
        {
          path: 'editnote/:noteString',
          name: 'editnote',
          props: true,
          component: CreateEditNote,
          meta: {
            breadCrumb: 'Note Metadata'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
