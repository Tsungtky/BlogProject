import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Main from "@/pages/Main";

const router = createBrowserRouter([
    {
      path:"/",
      element: <Main/>,
      children:[
        {
          index: true,
          element:<Login/>
        },
        {
            path:"/main",
            element:(
              <ProtectedRoute>
                <Layout/>
              </ProtectedRoute>
            ),
            children:[
              {
                index:true,
                element:<Home/>
              },
              {
                path:"/main/home",
                element:<Home/>
              },
              {
                path:"/main/article",
                element:<Article/>
              },
              {
                path:"/main/publish",
                element:<Publish/>
              }
            ]
        },
            {
              path:"/login",
              element:<Login/>
            },
            {
              path:"/register",
              element:<Register/>
            }
      ]
    }
]);

export default router;
