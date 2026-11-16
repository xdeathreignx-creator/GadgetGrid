
// =====================================
// GADGETGRID PRODUCT CATALOG
// =====================================

const image = {
    phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    headphone: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    speaker: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    gaming: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600",
    computer: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    charger: "https://images.unsplash.com/photo-1609592806596-b43badae?w=600",
    other: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
};

const products = [
    // SMARTPHONES - 8
    ["Samsung Galaxy S25",89999,"Smartphones","Flagship Android smartphone.",image.phone,12],
    ["iPhone 16",99999,"Smartphones","Premium Apple smartphone.",image.phone,8],
    ["Google Pixel 9",84999,"Smartphones","Google smartphone with advanced camera.",image.phone,7],
    ["OnePlus 13",89999,"Smartphones","High-performance Android phone.",image.phone,9],
    ["Xiaomi 14",69999,"Smartphones","Powerful smartphone with premium design.",image.phone,10],
    ["Samsung Galaxy A56",44999,"Smartphones","Reliable everyday smartphone.",image.phone,15],
    ["Nothing Phone 3",74999,"Smartphones","Unique smartphone design.",image.phone,6],
    ["Redmi Note 14 Pro",32999,"Smartphones","Feature-rich budget smartphone.",image.phone,14],

    // HEADPHONES & EARBUDS - 6
    ["Sony WH-1000XM5",39999,"Headphones & Earbuds","Wireless noise cancelling headphones.",image.headphone,8],
    ["AirPods Pro 2",29999,"Headphones & Earbuds","Premium wireless earbuds.",image.headphone,10],
    ["JBL Tune 770NC",9999,"Headphones & Earbuds","Wireless headphones with noise cancelling.",image.headphone,12],
    ["Sony WF-1000XM5",24999,"Headphones & Earbuds","Premium wireless earbuds.",image.headphone,7],
    ["Anker Soundcore Q30",7999,"Headphones & Earbuds","Comfortable wireless headphones.",image.headphone,15],
    ["Samsung Galaxy Buds3",14999,"Headphones & Earbuds","Compact wireless earbuds.",image.headphone,11],

    // SMARTWATCHES - 5
    ["Galaxy Watch 7",24999,"Smartwatches","Smartwatch with fitness features.",image.watch,9],
    ["Apple Watch SE",29999,"Smartwatches","Everyday Apple smartwatch.",image.watch,7],
    ["Amazfit GTR 4",15999,"Smartwatches","Smartwatch with long battery life.",image.watch,10],
    ["Huawei Watch GT 5",22999,"Smartwatches","Premium smartwatch.",image.watch,8],
    ["Xiaomi Smart Band 9",4999,"Smartwatches","Lightweight fitness tracker.",image.watch,20],

    // SPEAKERS - 4
    ["JBL Flip 6",12999,"Speakers","Portable Bluetooth speaker.",image.speaker,12],
    ["JBL Charge 5",17999,"Speakers","Portable waterproof speaker.",image.speaker,8],
    ["Sony SRS-XB100",5999,"Speakers","Compact wireless speaker.",image.speaker,14],
    ["Anker Soundcore 3",4999,"Speakers","Portable Bluetooth audio.",image.speaker,16],

    // GAMING ACCESSORIES - 5
    ["Logitech G502 Hero",5499,"Gaming Accessories","High-performance gaming mouse.",image.gaming,15],
    ["Razer DeathAdder V3",8999,"Gaming Accessories","Ergonomic gaming mouse.",image.gaming,8],
    ["HyperX Cloud II",9999,"Gaming Accessories","Gaming headset.",image.gaming,9],
    ["Redragon K552",4999,"Gaming Accessories","Mechanical gaming keyboard.",image.gaming,12],
    ["Xbox Wireless Controller",7999,"Gaming Accessories","Wireless gaming controller.",image.gaming,7],

    // COMPUTER ACCESSORIES - 5
    ["Logitech MX Master 3S",10999,"Computer Accessories","Wireless productivity mouse.",image.computer,10],
    ["Logitech K380",3999,"Computer Accessories","Compact wireless keyboard.",image.computer,15],
    ["Dell Webcam Pro",7999,"Computer Accessories","Full HD webcam.",image.computer,8],
    ["USB-C Hub 7-in-1",3499,"Computer Accessories","Multiport USB-C adapter.",image.computer,18],
    ["Laptop Cooling Pad",1999,"Computer Accessories","Cooling stand for laptops.",image.computer,20],

    // CHARGERS & POWER BANKS - 4
    ["Anker PowerCore 20K",4999,"Chargers & Power Banks","20000mAh portable power bank.",image.charger,14],
    ["Anker 65W Charger",3999,"Chargers & Power Banks","Fast USB-C wall charger.",image.charger,16],
    ["Baseus 30W Charger",1999,"Chargers & Power Banks","Compact fast charger.",image.charger,20],
    ["Xiaomi Power Bank 10K",2499,"Chargers & Power Banks","Portable 10000mAh power bank.",image.charger,17],

    // OTHER GADGETS - 3
    ["GoPro HERO",39999,"Other Gadgets","Compact action camera.",image.other,5],
    ["Amazon Echo Dot",6999,"Other Gadgets","Smart home speaker.",image.other,10],
    ["Portable SSD 1TB",9999,"Other Gadgets","Portable storage device.",image.other,12]
].map((item, index) => ({
    id: "GG" + String(index + 1).padStart(3, "0"),
    name: item[0],
    price: item[1],
    category: item[2],
    description: item[3],
    image: item[4],
    stock: item[5]
}));


// =====================================
// CART
// =====================================

let cart = JSON.parse(localStorage.getItem("gadgetGridCart")) || [];

const cartCount = document.getElementById("cartCount");

function updateCartCount() {
    const total = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    cartCount.textContent = total;

    localStorage.setItem(
        "gadgetGridCart",
        JSON.stringify(cart)
    );
}


// =====================================
// RENDER PRODUCTS
// =====================================

const productGrid = document.getElementById("productGrid");

function renderProducts(list) {

    productGrid.innerHTML = "";

    document.getElementById("productCount").textContent =
        `Showing ${list.length} products`;

    document.getElementById("emptyMessage").hidden =
        list.length !== 0;

    list.forEach(product => {

        const card = document.createElement("article");
        card.className = "product-card";

        const stockStatus = product.stock > 0
            ? "In Stock"
            : "Out of Stock";

        card.innerHTML = `
    <div class="product-image">
        <span class="product-stock ${product.stock === 0 ? "out" : ""}">
            ${stockStatus}
        </span>

        <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>

    <div class="product-info">
        <span class="product-category">${product.category}</span>

        <h3>${product.name}</h3>

      <a class="view-details" href="product-details.html?id=${product.id}">
            View Details →
        </a>

        <p class="product-description">
            ${product.description}
        </p>

        <strong class="product-price">
            ৳${product.price.toLocaleString("en-BD")}
        </strong>

        <button
            class="add-cart"
            data-id="${product.id}"
            ${product.stock === 0 ? "disabled" : ""}>
            ${product.stock === 0 ? "Out of Stock" : "Add to Cart +"}
        </button>
    </div>
`;

        productGrid.appendChild(card);
    });
}


// =====================================
// ADD TO CART
// =====================================

productGrid.addEventListener("click", function(event) {

    // =====================================
// ADD TO CART
// =====================================

if (productGrid) {
    productGrid.addEventListener("click", function(event) {

        const button = event.target.closest(".add-cart");

        if (!button || button.disabled) return;

        const product = products.find(
            item => item.id === button.dataset.id
        );

        if (!product) return;

        const existing = cart.find(
            item => item.id === product.id
        );

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

        updateCartCount();

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "Add to Cart +";
        }, 1000);
    });
}

        updateCartCount();

        const originalText = button.textContent;
        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = originalText;
        }, 1000);
    });



// =====================================
// SEARCH AND FILTER
// =====================================

const searchInput = document.getElementById("searchProducts");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortProducts");

function filterProducts() {

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortSelect.value;

    let filtered = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;

    });

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", filterProducts);


// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// =====================================
// INITIALIZE
// =====================================

if (productGrid) {
    renderProducts(products);
}

updateCartCount();