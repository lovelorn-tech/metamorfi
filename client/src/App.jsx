import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import CartContextl from "./contexts/cart/cart.context.jsx";
import FocusContextl from "./contexts/focus/focus.context.jsx";
import SessionContextl from "./contexts/session/session.context.jsx";

export default function App() {
  return (
    <SessionContextl>
      <FocusContextl>
        <CartContextl>
          <RouterProvider router={router} />
        </CartContextl>
      </FocusContextl>
    </SessionContextl>
  );
}
