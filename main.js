let burgerIcon = document.querySelector(".bars");

burgerIcon.addEventListener("click", (e) => {
    let links = document.querySelector(".links");
    links.classList.toggle("open");
});
