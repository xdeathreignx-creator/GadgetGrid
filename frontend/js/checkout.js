
const cart = JSON.parse(localStorage.getItem("gadgetGridCart") || "[]");

const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutLayout = document.getElementById("checkoutLayout");
const orderSuccess = document.getElementById("orderSuccess");

function formatPrice(price) {
    return "৳" + Number(price).toLocaleString("en-BD");
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function getSubtotal() {
    return cart.reduce((sum, item) => {
        return sum + Number(item.price) * Number(item.quantity);
    }, 0);
}

function displayCheckout() {
    const count = cart.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
    );

    document.getElementById("cartCount").textContent = count;

    if (cart.length === 0) {
        checkoutLayout.innerHTML = `
            <div class="checkout-card">
                <h2>Your cart is empty</h2>
                <p>Add some products before checking out.</p>
                <a href="products.html">Explore Products</a>
            </div>
        `;
        return;
    }

    checkoutItems.innerHTML = "";

    cart.forEach(item => {
        const product = document.createElement("div");
        product.className = "checkout-product";

        product.innerHTML = `
            <div>
                <div class="checkout-product-name">
                    ${escapeHTML(item.name)}
                </div>
                <span class="checkout-product-quantity">
                    Quantity: ${Number(item.quantity)}
                </span>
            </div>

            <strong>
                ${formatPrice(Number(item.price) * Number(item.quantity))}
            </strong>
        `;

        checkoutItems.appendChild(product);
    });

    checkoutSubtotal.textContent = formatPrice(getSubtotal());
    checkoutTotal.textContent = formatPrice(getSubtotal());
}

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!checkoutForm.reportValidity()) {
        return;
    }

    const customer = {
        name: document.getElementById("customerName").value.trim(),
        phone: document.getElementById("customerPhone").value.trim(),
        email: document.getElementById("customerEmail").value.trim(),
        address: document.getElementById("customerAddress").value.trim(),
        payment: document.getElementById("paymentMethod").value
    };

    const orderId = "GG-" + Date.now();

    const order = {
        orderId: orderId,
        customer: customer,
        items: cart,
        subtotal: getSubtotal(),
        status: "Pending",
        createdAt: new Date().toISOString()
    };

    const orders = JSON.parse(
        localStorage.getItem("gadgetGridOrders") || "[]"
    );

    orders.push(order);

    localStorage.setItem("gadgetGridOrders", JSON.stringify(orders));

    localStorage.removeItem("gadgetGridCart");

    checkoutLayout.hidden = true;
    orderSuccess.hidden = false;

    document.getElementById("successOrderId").textContent = orderId;
    document.getElementById("successCustomer").textContent =
        "Customer: " + customer.name;

    document.getElementById("successTotal").textContent =
        "Order total: " + formatPrice(order.subtotal);

    window.scrollTo({ top: 0, behavior: "smooth" });
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

displayCheckout();
