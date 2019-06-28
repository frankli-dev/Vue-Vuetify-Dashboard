const Menu = [
  {
    title: "Dashboard",
    icon: "dashboard",
    name: "Dashboard"
  },
  {
    title: "Users",
    icon: "supervisor_account",
    name: "Users"
  },
  {
    title: "Deals",
    icon: "description",
    name: "Deals"
  },
  {
    title: "Solutions",
    icon: "thumb_up",
    name: "Solutions"
  }
];
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
});

export default Menu;
