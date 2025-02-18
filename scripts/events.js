import el from "./domElements.js"

export default {
    controllerClick(handleControllersClick) {
        el.controllers.addEventListener('click', handleControllersClick)
    },
}