
const ordersTable = document.getElementById("ordersTable");

const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");
const pendingOrders = document.getElementById("pendingOrders");
const completedOrders = document.getElementById("completedOrders");
const emptyOrders = document.getElementById("emptyOrders");

let orders = JSON.parse(
    localStorage.getItem("gadgetGridOrders") || "[]"
);

function formatPrice(price) {
    return "৳" + Number(price).toLocaleString("en-BD");
}

function saveOrders() {
    localStorage.setItem("gadgetGridOrders", JSON.stringify(orders));
}

function createCell(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
}

function updateDashboard() {
    totalOrders.textContent = orders.length;

    const revenue = orders.reduce(
        (sum, order) => sum + Number(order.subtotal || 0),
        0
    );

    totalRevenue.textContent = formatPrice(revenue);

    pendingOrders.textContent = orders.filter(
        order => order.status === "Pending"
    ).length;

    completedOrders.textContent = orders.filter(
        order => order.status === "Completed"
    ).length;

    ordersTable.innerHTML = "";

    emptyOrders.hidden = orders.length !== 0;

    orders.forEach(order => {
        const row = document.createElement("tr");

        const customer = order.customer || {};

        row.appendChild(createCell(order.orderId || "Unknown"));
        row.appendChild(createCell(customer.name || "Unknown"));
        row.appendChild(createCell(customer.phone || "N/A"));
        row.appendChild(createCell(formatPrice(order.subtotal)));

        const statusCell = document.createElement("td");
        const statusSelect = document.createElement("select");

        statusSelect.className = "status-select";

        const statuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Completed",
            "Cancelled"
        ];

        statuses.forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;

            if ((order.status || "Pending") === status) {
                option.selected = true;
            }

            statusSelect.appendChild(option);
        });

        statusSelect.addEventListener("change", () => {
            order.status = statusSelect.value;
            saveOrders();
            updateDashboard();
        });

        statusCell.appendChild(statusSelect);
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-order-btn";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm(
                "Are you sure you want to delete this demo order?"
            );

            if (!confirmed) return;

            orders = orders.filter(
                item => item.orderId !== order.orderId
            );

            saveOrders();
            updateDashboard();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        ordersTable.appendChild(row);
    });
}

document.getElementById("refreshOrders").addEventListener("click", () => {
    orders = JSON.parse(
        localStorage.getItem("gadgetGridOrders") || "[]"
    );

    updateDashboard();
});

updateDashboard();
