import { SessionService } from "./session.service";

export const CartService = {
  addProduct: (product) => {
    try {
      const cart = get();
      if (!cart.products.find((x) => x.id === product.id)) {
        const newCart = {
          user: cart.user,
          products: [...cart.products, product],
        };
        save(newCart);
      }
    } catch (ex) {
      return [
        false,
        ex instanceof Error
          ? ex.message
          : "Ocurrió un error al intentar agregar el producto al carrito.",
      ];
    }
  },
  removeProduct: (product) => {
    try {
      const cart = get();
      cart.products = cart.products.filter((x) => x.id !== product.id);
      save(cart);
    } catch (ex) {
      return [
        false,
        ex instanceof Error
          ? ex.message
          : "Ocurrió un error al intentar eliminar el producto del carrito.",
      ];
    }
  },
  updateProduct: (product) => {
    try {
      const cart = get();
      cart.products.forEach((x) => {
        if (x.id === product.id) {
          x.quantity = product.quantity;
        }
      });
      save(cart);
    } catch (ex) {
      return [
        false,
        ex instanceof Error
          ? ex.message
          : "Ocurrió un error al intentar actualizar el producto del carrito.",
      ];
    }
  },
  get: () => get(),
  clear: () => {
    const cart = get();
    cart.products = [];
    save(cart);
  },
};

function save(cart) {
  const carts = JSON.parse(localStorage.getItem("carts")) ?? [];
  carts.forEach((x) => {
    if (x.user === cart.user) {
      x.products = cart.products;
    }
  });
  localStorage.removeItem("carts");
  localStorage.setItem("carts", JSON.stringify(carts));
}

function get() {
  try {
    const session = SessionService.getSession();
    if (!session) {
      throw new Error(false, "No se ha encontrado ninguna sesión activa");
    }
    const carts = JSON.parse(localStorage.getItem("carts")) ?? [];
    const cart = carts.find((x) => x.user === session.username);
    return cart ?? create();
  } catch (ex) {
    return [
      false,
      ex instanceof Error
        ? ex.message
        : "Ocurrió un error al intentar obtener el carrito.",
    ];
  }
}

function create() {
  try {
    const session = SessionService.getSession();
    if (!session) {
      throw new Error(false, "No se ha encontrado ninguna sesión activa");
    }
    let carts = JSON.parse(localStorage.getItem("carts")) ?? [];
    const cart = {
      user: session.username,
      products: [],
    };
    carts = [...carts, cart];
    localStorage.removeItem("carts");
    localStorage.setItem("carts", JSON.stringify(carts));
    return cart;
  } catch (ex) {
    return [
      false,
      ex instanceof Error
        ? ex.message
        : "Ocurrió un error al intentar obtener el carrito.",
    ];
  }
}
