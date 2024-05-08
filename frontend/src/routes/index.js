import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import ResetPassword from '../Pages/Auth/ResetPassword';
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
import Users from '../Pages/Admin/Users';
import Chats from '../Pages/Admin/Chats';
import Notifications from '../Pages/Admin/Notifications';
import Setting from '../Pages/Admin/Setting';

import UserProfile from '../Pages/User/UserProfle/UserProfile';
import UserOrders from '../Pages/User/UserOrders';
import UserNotification from '../Pages/User/UserNotification';
import UserLayout from '../Layout/UserLayout/UserLayout';
import ShoppingList from '../Pages/ShoppingList/ShoppingList';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/reset_password', component: ResetPassword },
    { path: '/following', component: Following },
    { path: '/mobile', component: Mobile },
    { path: '/new', component: New },
    { path: '/shoppingList', component: ShoppingList },
    { path: '/type', component: Type },
    { path: '/product-detail/:id', component: ProductDetailPage },
    { path: '/user/profile', component: UserProfile, layout: UserLayout },
    { path: '/user/orders', component: UserOrders, layout: UserLayout },
    { path: '/user/notification', component: UserNotification, layout: UserLayout },
    { path: '/admin/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/admin/products', component: Products, layout: AdminLayout },
    { path: '/admin/orders', component: Orders, layout: AdminLayout },
    { path: '/admin/users', component: Users, layout: AdminLayout },
    { path: '/admin/chat', component: Chats, layout: AdminLayout },
    { path: '/admin/notification', component: Notifications, layout: AdminLayout },
    { path: '/admin/setting', component: Setting, layout: AdminLayout }
]
export { publicRoutes };