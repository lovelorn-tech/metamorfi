export const SessionService = {
  setSession: (user) => {
    try {
      let users = JSON.parse(localStorage.getItem("users")) ?? [];
      const u = users.find((x) => x.username === user.username);
      if (u) {
        if (!(user.password === u.password)) {
          return [false, "Credenciales inválidas."];
        }
      } else {
        users = [
          ...users,
          {
            username: user.username,
            password: user.password,
          },
        ];
        localStorage.setItem("users", JSON.stringify(users));
      }
      localStorage.setItem(
        "session",
        JSON.stringify({
          password: user.password,
          username: user.username,
        })
      );
      return [true, "Inicio de sesión exitoso"];
    } catch (ex) {
      return [
        false,
        ex instanceof Error
          ? ex.message
          : "Ocurrió un error al intentar iniciar sesión. Intente otra vez.",
      ];
    }
  },
  removeSession: () => {
    localStorage.setItem("session", undefined);
  },
  getSession: () => {
    return localStorage.getItem("session")
      ? JSON.parse(localStorage.getItem("session"))
      : undefined;
  },
};
