export const focusService = {
  focusAnchor: (location, anchorGroupClass) => {
    location ??= window.location.pathname;
    const as = document.getElementsByClassName(anchorGroupClass);
    [].forEach.call(as, function (a) {
      if (a.getAttribute("href") === location) a.classList.add("target");
      else a.classList.remove("target");
    });
  },
};
