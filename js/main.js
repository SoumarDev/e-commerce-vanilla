function initBurger() {
    const burgerIcon = document.querySelector(".bars");
    burgerIcon.addEventListener("click", () => {
        document.querySelector(".links").classList.toggle("open");
    });
}

function initCarousel() {
    const carouselNext = document.querySelector(".carousel-next");
    if (!carouselNext) return;// kein Carousel da einfach überspringen.

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
    const chevronNext = document.querySelector(".chevron-next");
    if (!chevronNext) return; // Seite hat Keine Produktempfehlung, nichts zu tun.

    const recProducts = document.querySelectorAll(".rec-product");
    let visibleCount = getVisibleCount();
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

/*Objektive*/
function initPriceFilter(sortValue) {
    const priceElements = document.querySelectorAll(".obj-content .product .price-box .price");
    if (priceElements.length === 0) return; //Seite hat keine Preisliste, nichts zu tun.

    // Preis und dazugeöhrige Kartenelement zusammen behalten
    const products = Array.from(priceElements).map(el => ({
        element: el.closest(".product"),
        price: parseFloat(el.textContent.replace("€", "").replace(",", ".").trim())
    }));

    if (sortValue === "price-asc") {
        products.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
        products.sort((a, b) => b.price - a.price);
    } else {
        return;
    }

    // Karten anhand ihrer sortierten Position visuell umordnen
    products.forEach((product, index) => {
        product.element.style.order = index;
    });
}

function sortPrice() {
    const selectElement = document.getElementById("sort-filter");
    if (!selectElement) return; // Seite hat keinen Sortier-Filter, nichts zu tun.
    selectElement.addEventListener("change", (e) => {
        initPriceFilter(e.target.value);
    })
}

sortPrice();

/* Start Product Side */
function initProductGallery() {
    const productImages = document.querySelector(".product-images");
    if (!productImages) return; // Seite hat keine Produktgalerie, nichts zu tun.

    const activeImg = document.querySelector(".active-img");

    productImages.addEventListener("click", (e) => {
        e.preventDefault();
        const link = e.target.closest("a");
        if (!link) return;

        productImages.querySelector("a.active")?.classList.remove("active");
        link.classList.add("active");
        activeImg.src = link.querySelector("img").src;
    });
}

initProductGallery();
/* End Product Side */
