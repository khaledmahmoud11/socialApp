
import { createBrowserRouter, RouterProvider} from 'react-router'
import './App.css'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import Login from './Pages/Auth/Login/Login'
import MainLayout from './Layouts/MainLayout/MainLayout'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import UserPosts from './Pages/UserPosts/UserPosts'
import NotFound from './Pages/NotFound/NotFound'
import Register from './Pages/Auth/Register/Register'
import PostDetails from './Pages/PostDetails/PostDetails'
import Profile from './Pages/Profile/Profile'
import Settings from './Pages/Settings/Settings'
import AppProtectedRoutes from './Component/ProtectedRoutes/AppProtectedRoutes'
import AuthProtectedRoutes from './Component/ProtectedRoutes/AuthProtectedRoutes'

function App() {
  let routes = createBrowserRouter([
    {path:"/",element:<MainLayout /> , children:[
      {index:true , element: <AppProtectedRoutes> <NewsFeed /> </AppProtectedRoutes>},
      {path:"profile/:id?" , element: <AppProtectedRoutes> <Profile /> </AppProtectedRoutes>},
      {path:"settings" , element: <AppProtectedRoutes> <Settings /> </AppProtectedRoutes>},
      {path:"postDetails/:id" , element: <AppProtectedRoutes> <PostDetails /> </AppProtectedRoutes>},
      {path:"*" , element: <NotFound />},
    ]},
    {path:"/",element:<AuthLayout /> , children:[
      {path:"login",element: <AuthProtectedRoutes>  <Login /> </AuthProtectedRoutes>},
      {path:"register",element: <AuthProtectedRoutes>  <Register/> </AuthProtectedRoutes>},
    ]}
  ])

  return (
    <>
        <RouterProvider router={routes} ></RouterProvider>
    </>
  )
}

export default App
