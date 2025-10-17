import { useState } from "react";
import { SessionContext } from "./session.context";
import { SessionService } from "../../services/session.service";

export default function SessionContextl({children}) {
  const [session, _setSession] = useState(SessionService.getSession() ?? undefined);

  function setSession() {
    _setSession(SessionService.getSession());
  }
  
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
