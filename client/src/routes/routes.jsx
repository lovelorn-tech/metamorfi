// Layouts
import MainLayout from "../layouts/main/Main.layout";
import AuthPage from "../pages/auth/Auth.page";

// Pages
import  ProductsPage  from "../pages/products/Products.page";
import ProductPage from "../pages/product/Product.page";
import HomePage from "../pages/home/Home.page";

export const routes = [
    {
        path: "",
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> }, 
            { path: "/products", element: <ProductsPage /> }, 
            { path: "/product/:id", element: <ProductPage/>}
        ],
    },
    {
        path: "/auth",
        element: <AuthPage/>
    }
];