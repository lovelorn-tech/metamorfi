// Layouts
import MainLayout from "../layouts/main/Main.layout";
import AuthPage from "../pages/auth/Auth.page";

// Pages
import  ProductsPage  from "../pages/products/Products.page";
import ProductPage from "../pages/product/Product.page";
import HomePage from "../pages/home/Home.page";
import CartPage from "../pages/cart/Cart.page";
import PaymentPage from "../pages/payment/Payment.page";
import AddProductPage from "../pages/addProduct/AddProduct.page";

export const routes = [
    {
        path: "",
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> }, 
            { path: "/products", element: <ProductsPage /> }, 
            { path: "/product/:id", element: <ProductPage/>},
            { path: "/cart", element: <CartPage/>},
            { path: "/payment", element: <PaymentPage/>},
            { path: "addproduct", element: <AddProductPage/> }
        ],
    },
    {
        path: "/auth",
        element: <AuthPage/>
    }
];