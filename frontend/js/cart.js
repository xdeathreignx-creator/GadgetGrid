
const cartItemsContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const cartCountElement = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("gadgetGridCart") || "[]");

function saveCart() {
    localStorage.setItem("gadgetGridCart", JSON.stringify(cart));
}

function updateCart() {
    cartItemsContainer.innerHTML = "";

    let subtotal = 0;
    let count = 0;

    cart.forEach(item => {
        subtotal += Number(item.price) * Number(item.quantity);
        count += Number(item.quantity);

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "৳" + item.price;

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.onclick = () => changeQuantity(item.id, -1);

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.onclick = () => changeQuantity(item.id, 1);

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.onclick = () => removeItem(item.id);

        div.append(name, price, minus, quantity, plus, remove);
        cartItemsContainer.appendChild(div);
    });

    if (cart.length === 0) {
        cartItemsContainer.textContent = "Your cart is empty.";
    }

    subtotalElement.textContent = "৳" + subtotal.toLocaleString("en-BD");
    totalElement.textContent = "৳" + subtotal.toLocaleString("en-BD");
    cartCountElement.textContent = count;

    checkoutBtn.style.opacity = cart.length ? "1" : "0.5";
    checkoutBtn.style.pointerEvents = cart.length ? "auto" : "none";
    checkoutBtn.href = cart.length ? "checkout.html" : "#";
}

function changeQuantity(id, amount) {
    const item = cart.find(product => String(product.id) === String(id));

    if (!item) return;

    item.quantity = Number(item.quantity) + amount;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }

    saveCart();
    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => String(item.id) !== String(id));
    saveCart();
    updateCart();
}

updateCart();
