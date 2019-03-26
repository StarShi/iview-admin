import Vue from 'vue';
import Router from 'vue-router';

import AdminHome from '@/admin/home/home'
import ContentArticle from '@/admin/content/article'
import ContentWorks from '@/admin/content/works'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            name: 'AdminHome',
            path: '/',
            component: AdminHome
        },
        {
            name: 'ContentWorks',
            path: '/content/works',
            component: ContentWorks
        },
        {
            name: 'ContentArticle',
            path: '/content/article',
            component: ContentArticle
        }

    ]
});



export default router;