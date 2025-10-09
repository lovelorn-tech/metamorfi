import { RouterProvider } from "react-router-dom";
import {router} from "./routes/router"; 
import CartContextl from "./contexts/cart/cart.context.jsx";

export default function App() {
  return (
    <CartContextl>
      <RouterProvider router={router}/>
    </CartContextl>
  )
}

