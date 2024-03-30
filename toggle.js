const toggler = document.body;
const darkModeButton = document.getElementById('dark-mode');

function toggleLightMode() {
    if (localStorage.lightMode === "dark") {
        localStorage.lightMode = "light";
        toggler.setAttribute("data-light-mode", "light");
    } else {
        localStorage.lightMode = "dark";
        toggler.setAttribute("data-light-mode", "dark");
    }
    console.log("lightMode = " + localStorage.lightMode);
}

darkModeButton.addEventListener('click', function (e) {
    toggler.classList.toggle('dark-mode');
    darkModeButton.querySelector('i').classList.toggle('fa-moon');
    darkModeButton.querySelector('i').classList.toggle('fa-sun');
});

if (localStorage.lightMode === "dark") {
    toggler.setAttribute("data-light-mode", "dark");
}

const elementsToDisableRightClick = document.querySelectorAll('.prevent-right-click');

elementsToDisableRightClick.forEach(element => {
    element.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
});