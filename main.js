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

function getVisibleCount() {
    if (window.innerWidth >= 990) return 6;
    if (window.innerWidth >= 768) return 4;
    return 2;
}

function initRecommendedProducts() {
    const recProducts = document.querySelectorAll(".rec-product");
    const visibleCount = getVisibleCount();
    let currentIndex = 0;

    function showProduct(index) {
        currentIndex = (index + recProducts.length) % recProducts.length;
        recProducts.forEach((product, i) => {
            // pos : Abstand der Karte von currentIndex (0 = erste sichtbare)
            const pos = (i - currentIndex + recProducts.length) % recProducts.length;
            product.classList.toggle("ds-none", pos >=visibleCount);
            product.style.order = pos;
        })
    }

    document.querySelector(".chevron-next").addEventListener("click", () => showProduct(currentIndex + 1));
    document.querySelector(".chevron-prev").addEventListener("click", () => showProduct(currentIndex - 1));

    window.addEventListener("resize", () => {
        visibleCount = getVisibleCount();
        showProduct(currentIndex);
    })
    // Ohne diesen Aufruf wäre beim Laden alle 11 Karten sichtbar(nichts ist im HTML vorab versteckt)
    showProduct(0);
}

initBurger();
initCarousel();
initRecommendedProducts();

