import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import IndexLayout from "../layouts/indexlayout"
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import MainLayout from "../layouts/mainLayout";
import CreateTransaction from "../pages/CreateTransaction";
import MainTransaction from "../pages/mainPages/transaction";

const route : RouteObject[] =[
    {
        element:<IndexLayout/>,
        children:[{
            index:true,
            element:<Dashboard/>
        }]
    },
    {
        path:"auth",
        element:<AuthLayout/>,
        children:[
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            }
        ]
    },
    {
        path:"main",
        element:<MainLayout/>,
        children:[
            {
                path:":month",
                element:<MainTransaction/>
            },
            {
                path:"addtransaction",
                element:<CreateTransaction/>
            }
        ]
    }
]

export default route