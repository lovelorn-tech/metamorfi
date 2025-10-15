import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import CartContextl from "./contexts/cart/cart.context.jsx";
import FocusContextl from "./contexts/focus/focus.context.jsx";

export default function App() {
  return (
    <FocusContextl>
      <CartContextl>
        <RouterProvider router={router} />
      </CartContextl>
    </FocusContextl>
  );
}
