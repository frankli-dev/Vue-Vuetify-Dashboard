const Menu = [
  {
    title: "Dashboard",
    icon: "dashboard",
    name: "Dashboard"
  },
  {
    title: "Daily Data",
    icon: "calendar_today",
    name: "Daily Data"
  }
]
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase()
      let textB = y.title.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
  }
})

export default Menu
