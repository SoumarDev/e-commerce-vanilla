const params = new URLSearchParams(window.location.search);
const paramCategory = params.get("cat");
const currentProduct = paramCategory
    ? products.filter(p => p.category.toLowerCase() === paramCategory.toLowerCase())
    : null;

function selectProducts() {
    if (!currentProduct) return;

    document.querySelector(".products").innerHTML = currentProduct.map(product => `
        <article class="product-card">
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.alt}">
                <h3>${product.name}</h3>
                <div class="price-box"><span class="price">${product.price}</span><span class="span-text">inkl. MwSt. Versand gratis</span></div>
            </a>
        </article>
    `).join("");
}
selectProducts();
