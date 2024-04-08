import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Following from '../Pages/Following/Following';
import HomePage from '../Pages/HomePage/HomePage'
import Type from '../Pages/Type/Type';
import New from '../Pages/New/New';
import Mobile from '../Pages/Mobile/Mobile';
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/following', component: Following },
    { path: '/mobile', component: Mobile },
    { path: '/new', component: New },
    { path: '/type', component: Type }
]
export { publicRoutes };