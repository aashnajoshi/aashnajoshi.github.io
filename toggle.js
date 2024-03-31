function toggleLightMode() {
    const app = document.body;
    const lightMode = localStorage.lightMode === "dark" ? "light" : "dark";
    localStorage.lightMode = lightMode;
    app.setAttribute("data-light-mode", lightMode);
    console.log("lightMode = " + lightMode);
}

document.getElementById('dark-mode').addEventListener('click', function (e) {
    const toggler = document.body;
    toggler.classList.toggle('dark-mode');
    const target = e.target;
    target.classList.toggle('fa-moon');
    target.classList.toggle('fa-sun');
});
if (localStorage.lightMode === "dark") {
    document.body.setAttribute("data-light-mode", "dark");
}

const elementsToDisableRightClick = document.querySelectorAll('.prevent-right-click');
elementsToDisableRightClick.forEach(element => {
    element.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
});