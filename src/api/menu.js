const Menu = [
  {
    title: "Users",
    icon: "assignment_ind",
    name: "Users"
  },
  {
    title: "Deals",
    icon: "assignment",
    name: "Deals"
  },
  {
    title: "Solutions",
    icon: "assignment_turned_in",
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
