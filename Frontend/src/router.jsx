import SignupLogin from './pages/signupLogin/SignupLogin'
import Home from './pages/home/Home.jsx'
import NotFound from './pages/notfound/NotFound.jsx'

let router = [
    {path: '/', element:<Home/>},
    {path: 'login' , element:<SignupLogin/>},
    {path: 'signup' , element:<SignupLogin/>},
    {path: '*' , element:<NotFound/>}
]

export default router