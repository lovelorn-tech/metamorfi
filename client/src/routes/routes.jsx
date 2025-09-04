// Layouts
import MainLayout from "../layouts/main/Main.layout";
import AuthPage from "../pages/auth/Auth.page";

// Pages
import  HomePage  from "../pages/home/Home.page";
import ProductPage from "../pages/product/Product.page";

export const routes = [
    {
        path: "",
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> }, 
            { path: "/product/:id", element: <ProductPage/>}
        ],
    },
    {
        path: "/auth",
        element: <AuthPage/>
    }
];