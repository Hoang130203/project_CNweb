import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Following from '../Pages/Following/Following';
import HomePage from '../Pages/HomePage/HomePage'
import Type from '../Pages/Type/Type';
import New from '../Pages/New/New';
import Mobile from '../Pages/Mobile/Mobile';
import ProductDetailPage from '../Pages/ProductDetailPage/ProductDetailPage';
import AdminLayout from '../Layout/AdminLayout/AdminLayout';
import Dashboard from '../Pages/Admin/Dashboard';
import Products from '../Pages/Admin/Products';
import Orders from '../Pages/Admin/Orders';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/following', component: Following },
    { path: '/mobile', component: Mobile },
    { path: '/new', component: New },
    { path: '/type', component: Type },
    { path: '/product-detail/:id', component: ProductDetailPage },
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/products', component: Products, layout: AdminLayout },
    { path: '/orders', component: Orders, layout: AdminLayout }
]
export { publicRoutes };