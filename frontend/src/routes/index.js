import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Following from '../Pages/Following/Following';
import HomePage from '../Pages/HomePage/HomePage'
import Type from '../Pages/Type/Type';
import Hot from '../Pages/Hot/Hot';
import New from '../Pages/New/New';
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/following', component: Following },
    { path: '/hot', component: Hot },
    { path: '/new', component: New },
    { path: '/type', component: Type }
]
export { publicRoutes };