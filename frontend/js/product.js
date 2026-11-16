
const productId = new URLSearchParams(window.location.search).get("id");

const product = products.find(item => item.id === productId);

const detailsContainer = document.getElementById("productDetails");

if (!product) {
    detailsContainer.innerHTML = `
        <h2>Product Not Found</h2>
        <p>This product doesn't exist.</p>
        <a href="products.html">Back to Products</a>
    `;
} else {
    detailsContainer.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="detail-info">
            <span>${product.category}</span>
            <h1>${product.name}</h1>
            <p>${product.description}</p>

            <h2>৳${product.price.toLocaleString("en-BD")}</h2>

            <p class="${product.stock > 0 ? "in-stock" : "out-stock"}">
                ${product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
            </p>

            <button id="addDetailCart" ${product.stock === 0 ? "disabled" : ""}>
                Add to Cart
            </button>
        </div>
    `;

    document.getElementById("addDetailCart").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("gadgetGridCart")) || [];

        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        localStorage.setItem("gadgetGridCart", JSON.stringify(cart));

        const count = document.getElementById("cartCount");
        if (count) {
            count.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        document.getElementById("addDetailCart").textContent = "Added ✓";
    });
}
