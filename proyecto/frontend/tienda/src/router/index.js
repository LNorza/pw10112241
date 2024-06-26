import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientsView from '@/views/ClientsView.vue'
import ClientCreateView from '@/views/ClientCreateView.vue';
import SupplierView from '@/views/SuppliersView.vue'
import SaleView from '@/views/SaleView.vue'
import ClientsEdit from '@/views/ClientEdit.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/Customers',
            name: 'Customers',
            component: ClientsView
        },
        {
            path: '/Customers/create',
            name: 'AddCustomer',
            component: ClientCreateView
        },
        {
            path: '/Customers/:id/edit',
            name: 'EditCustomer',
            component: ClientsEdit
        },
        {
            path: '/suppliers',
            name: 'Suppliers',
            component: SupplierView
        },
        {
            path: '/sale',
            name: 'Sales',
            component: SaleView
        }
    ]
})

export default router
