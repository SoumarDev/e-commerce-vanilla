function initBurger() {
    const burgerIcon = document.querySelector(".bars");
    burgerIcon.addEventListener("click", () => {
        document.querySelector(".links").classList.toggle("open");
    });
}

function initCarousel() {
    const carouselItems = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");
        currentIndex = (index +  carouselItems.length) % carouselItems.length;
        carouselItems[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    document.querySelector(".carousel-next").addEventListener("click", () => showSlide(currentIndex + 1));
    document.querySelector(".carousel-prev").addEventListener("click", () => showSlide(currentIndex - 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
}

initBurger();
initCarousel();