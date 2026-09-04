
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const currentProduct = productId
    ? products.find(product => product.id.toLowerCase() === productId.toLowerCase())
    : null;

function calculatePrice() {
    document.querySelector(".price-before-discount").textContent = currentProduct.price;
    let priceBeforDescount = currentProduct.price.replace(",", ".").replace("€", "").trim();
    let discountAmount = (priceBeforDescount * 0.1).toFixed(2);
    document.querySelector(".discount").textContent = `- ${discountAmount.replace(".", ",")} €`;
    let endPrice = (priceBeforDescount - discountAmount).toFixed(2).replace(".", ",");
    document.querySelector(".end-price-box .price").textContent = `${endPrice}€`;
}

function selectProduct() {

    if (!currentProduct) return;
    // Navigation aktualisieren
    document.querySelector(".page").textContent = currentProduct.name;
    // Produkt Title hinzufügen
    document.querySelector(".product-content .product-title").textContent = currentProduct.name
    // Hauptbild des Products hinzufügen
    document.querySelector(".product-container .product-media .active-img").src = currentProduct.image;
    // Gallery Bilder hinzufügen
    const galleryList = document.querySelector(".product-container .product-images");
    galleryList.innerHTML = ""; // alte Gallery-Liste entfernen.
    currentProduct.gallery.forEach(element => {
        const a = document.createElement("a");
        const img = document.createElement("img");
        img.src = element;
        a.appendChild(img);
        galleryList.appendChild(a);
    });
    // Preis des Artikels + Dicountberechnung hinzugügen 
    calculatePrice();
    // Produktbeschreibung hinufügen
    document.querySelector(".product-container .product-description p").textContent = currentProduct.description;
    // Features hinzufügen
    const featuresList = document.querySelector(".product-description ul");
    currentProduct.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

selectProduct();