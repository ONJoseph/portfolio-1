//Toggles happening during mobile menu open/close should happen only when hamburger button is available, i.e. in non-desktop view
let hamburgerView = window.matchMedia("(max-width: 768px)");

function checkView() {
  if (hamburgerView.matches) {
    
    //Store objects to be used in mobile menu open/close
    const hamburgerButton = document.querySelector("nav button");
    const menu = document.querySelector(".menu");
    const closeButton = menu.querySelector("button");
    let activeMenuButton = document.querySelector(".menu-button");
    let menuItems = menu.querySelectorAll("a");

    //When mobile menu is expanded/collapsed, style menu items in h3/span respectively.
    function styleMenuItems(newElement, oldElement) {
      menuItems = menu.querySelectorAll(oldElement);
      menuItems.forEach(menuItem => {
        const element = document.createElement(newElement);
        element.textContent = menuItem.textContent;
        menuItem.replaceWith(element);    
      });
    }

    //When mobile menu is collapsed/expanded, the active menu button (i.e. the button that should receive action) is the hamburger/close button respectively.
    function switchActiveMenuButton() {
      menu.classList.toggle("mobile-menu");
      activeMenuButton.classList.toggle("menu-button");
      if (activeMenuButton == closeButton) {
        hamburgerButton.classList.toggle("menu-button");
        styleMenuItems("span", "h3");
      } else {
        closeButton.classList.toggle("menu-button");
        styleMenuItems("h3", "span");
      }
      activeMenuButton = document.querySelector(".menu-button")
      activeMenuButton.addEventListener("click", switchActiveMenuButton);
    }

    //Clicking on active menu button / on menu items toggles the mobile menu
    activeMenuButton.addEventListener("click", switchActiveMenuButton);
    menuItems.forEach(menuItem => menuItem.addEventListener("click", switchActiveMenuButton));
  }
}

//Check whenever view is changed
checkView(hamburgerView);
hamburgerView.addEventListener("change", checkView);