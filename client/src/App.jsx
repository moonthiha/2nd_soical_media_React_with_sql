import Login from "./Pages/Login/Login";
import {createBrowserRouter , RouterProvider , Outlet, Navigate} from 'react-router-dom';
import Register from "./Pages/Register/Register";
import NavBar from "./components/Navbar/NavBar";
import LeftBar from "./components/LeftBar/LeftBar";
import RightBar from "./components/RightBar/RightBar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkContext } from "./contexts/themeContext";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ProfilePost from "./components/ProfilePost/ProfilePost";
import { AuthUser } from "./contexts/AuthContext";
export default function App() {

  const {currentUser} = useContext(AuthUser)

  const {darkMode} = useContext(DarkContext);

  const queryClient = new QueryClient()


  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <NavBar />

           <div style={{display:"flex"}}>
              <LeftBar />

            <div style={{flex:"6"}}>
              <Outlet />
            </div>

            <RightBar />
            </div>
            
          </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({children}) => {

    if(!currentUser){
      return <Navigate to={"/login"} />
    }

    return children;
  }

  const router = createBrowserRouter ([
    {
      path : "/",
      element : <ProtectedRoute> <> <Layout /></>  </ProtectedRoute>,
      children : [
        {
          path : "/profile/:id",
          element : <Profile />
        },
        {
          path : "/",
          element : <Home />
        },
       
      ]
    },
    {
      path : "/login",
      element : <Login />
    },
    {
      path : "/register",
      element : <Register />
    }
  ]);

  return (
   <>
     <RouterProvider router={router} />
   </>
  )
}
