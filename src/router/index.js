import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) // register Router as plagin

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: () => import ('../views/Contacts')
    }, {
        path: '/view/:id',
        component: () => import ('../views/ContactView')
    }]
})