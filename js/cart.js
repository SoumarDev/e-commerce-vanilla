function readCart() {
    return JSON.parse(localStorage.getItem("kamera-shop-cart")) || [];
}

function updateCartBadge() {
    const totalQty = readCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelector(".cart-badge").textContent = totalQty;
}

function writeCart(cart) {
    localStorage.setItem("kamera-shop-cart", JSON.stringify(cart));
}

function addToCart(id, qty) {
    const cart = readCart();
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({id, qty});
    }

    writeCart(cart);
}

function updateQty(id, newQty) {
    const cart = readCart();
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.qty = newQty;
    writeCart(cart);
}

function removeFromCart(id) {
    const cart = readCart();
    const updatedCart = cart.filter(item => item.id !== id);
    writeCart(updatedCart);
}

function renderCart() {
    const container = document.querySelector(".cart-container");
    if (!container) return;

    const cart = readCart();
    const premiumBox = document.querySelector(".premium-box");
    const subTotalBox = document.querySelector(".subtotal-and-delivery-box");


    if (cart.length === 0) {
        premiumBox.style.display = "none";
        subTotalBox.style.display = "none";
        container.innerHTML = `<p class="cart-empty">Ihr Warenkorb enthält keine Produkte.</p>`;
        document.querySelector(".subtotal-price").textContent = "0,00 €";
        return;
    }
    
    premiumBox.style.display = "";
    subTotalBox.style.display = "";

    container.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    const {priceBeforeDiscount, priceAfterDiscount, discountAmount} = getDiscountedPrice(product);
    
    const picePrice = priceBeforeDiscount.toFixed(2).replace(".", ",");
    const linePrice = (priceAfterDiscount * item.qty).toFixed(2).replace(".", ",");
    const lineDiscount = (discountAmount * item.qty).toFixed(2).replace(".", ",");

    const subtotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    const { priceAfterDiscount } = getDiscountedPrice(product);
        return sum + priceAfterDiscount * item.qty;
    }, 0);

    document.querySelector(".subtotal-price").textContent = `${subtotal.toFixed(2).replace(".", ",")} €`;

    const premiumSelected = isPremiumShippingSelected();
    const deliveryPrice = premiumSelected ? 4.90 : 0;

    document.querySelector(".delivery-text").textContent = premiumSelected ? "Premiumversand:" : "Versandkostenfrei:";
    document.querySelector(".delivery-price").textContent = `${deliveryPrice.toFixed(2).replace(".", ",")} €`;
    
    document.querySelector(".prm-war-kor-btn").style.display = premiumSelected ? "none" : "inline-block";
    document.querySelector(".prm-remove-btn").style.display = premiumSelected ? "inline-block" : "none";
    return `
        <div class="cart-item">
                <div class="product-box">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h2 class="product-title">${product.name}</h2>
                        <input type="checkbox" id="des-${product.id}" class="des-toggle-input visually-hidden">
                        <p class="product-des">${product.description}</p>
                        <label for="des-${product.id}" class="des-toggle">
                            <span class="des-toggle-more">Mehr anzeigen</span>
                            <span class="des-toggle-less">Weniger anzeigen</span>
                        </label>
                        <span class="dealDiscount">Dealrabatt: ${lineDiscount} €</span>
                    </div>
                </div>
                <div class="product-price-box">
                    <span class="piece-price">Stückpreis: ${picePrice} €</span>
                    <div class="cart-action">
                        <label for="${product.id}" class="visually-hidden">Menge</label>
                        <input type="number" id="${product.id}" name="qty" min="1" value="${item.qty}" data-id="${product.id}">
                    </div>
                    <span class="article-price">${linePrice} €</span>
                    <button type="button" class="from-cart-dlt-btn" data-id="${product.id}" aria-label="Artikel aus dem Warenkorp entfernen">
                        <i class="fa-solid fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

updateCartBadge();
renderCart();

document.querySelector(".cart-container").addEventListener("change", (e) => {
    if (e.target.type !== "number") return;

    const newQty = parseInt(e.target.value);
    updateQty(e.target.dataset.id, newQty);

    renderCart();
    updateCartBadge();
});

document.querySelector(".cart-container").addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".from-cart-dlt-btn");
    if (!deleteBtn) return;

    removeFromCart(deleteBtn.dataset.id);
    renderCart();
    updateCartBadge();
});

function isPremiumShippingSelected() {
    return localStorage.getItem("kamera-shop-premium-shipping")  === "true";
}

function setPremiumShipping(selected) {
    localStorage.setItem("kamera-shop-premium-shipping", selected)
}

document.querySelector(".prm-war-kor-btn").addEventListener("click", () => {
    setPremiumShipping(true);
    renderCart();
})

document.querySelector(".prm-remove-btn").addEventListener("click", () => {
    setPremiumShipping(false);
    renderCart();
});