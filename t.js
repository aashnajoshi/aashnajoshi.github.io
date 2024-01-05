function toggleLightMode() {
    const app = document.body;
    if (localStorage.lightMode === "dark") {
        localStorage.lightMode = "light";
        app.setAttribute("data-light-mode", "light");
    } else {
        localStorage.lightMode = "dark";
        app.setAttribute("data-light-mode", "dark");
    }
    console.log("lightMode = " + localStorage.lightMode);
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
