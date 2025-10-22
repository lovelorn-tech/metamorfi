export const DropDownService = {
  setVisible: (id) => {
    const dropDown = document.getElementById(id);
    if (dropDown) {
      if (dropDown.style.display === "flex") {
        dropDown.style.display = "none";
      } else {
        dropDown.style.display = "flex";
        dropDown.focus();
      }
    }
  },
  hide: (event, id) => {
    if (event.currentTarget && !event.currentTarget.contains(event.relatedTarget)) {
      const dropDown = document.getElementById(id);
      if (dropDown) dropDown.style.display = "none";
    }
  }
}
