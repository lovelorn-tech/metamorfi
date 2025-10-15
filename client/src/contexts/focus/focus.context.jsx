import { useState } from "react";
import { FocusContext } from "./focus.context";
import { focusService } from "../../services/focus.service";

export default function FocusContextl({children}) {
  const [url, _setUrl] = useState(window.location.pathname);

  function setUrl(nUrl) {
    _setUrl(() => nUrl);
    focusService.focusAnchor(url, "header-as")
  }
  
  return (
    <FocusContext.Provider value={{ url, setUrl }}>
      {children}
    </FocusContext.Provider>
  );
}
