// Layouts
import MainLayout from "../layouts/main/Main.layout";

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
];