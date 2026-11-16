
// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});


// =========================
// SHOPPING CART
// =========================

let cart = JSON.parse(localStorage.getItem("gadgetGridCart")) || [];

const cartCount = document.getElementById("cartCount");

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

    localStorage.setItem(
        "gadgetGridCart",
        JSON.stringify(cart)
    );
}


// =========================
// ADD TO CART BUTTONS
// =========================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.id === id
        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCartCount();

        alert(name + " added to your cart!");

    });

});


// INITIAL CART LOAD

updateCartCount();
