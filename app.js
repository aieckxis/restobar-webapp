// ==========================================
// 🍹 BACKENDLESS DATASET (20 EXPANSED ITEMS MATRIX)
// ==========================================
const MENU_DATA = [
    // --- 10 CRAFT DRINKS ---
    { id: "sangria", name: "Sunset Sangria", price: 290, category: "drinks", desc: "Red wine blend infused with fresh citrus slices, triple sec, and a splash of bright soda.", premium: false },
    { id: "horizon", name: "Neon Horizon Cocktail", price: 320, category: "drinks", desc: "Blue curaçao, premium gin, and tonic water, served with a glowing pink sugar rim.", premium: true },
    { id: "mojito", name: "Classic Sundown Mojito", price: 280, category: "drinks", desc: "White rum, crushed mint twigs, squeezed lime, raw brown sugar syrup, and fizzy soda water.", premium: false },
    { id: "margarita", name: "Spiced Calamansi Margarita", price: 290, category: "drinks", desc: "Tequila Blanco and triple sec mixed with fresh calamansi extract and a chili-salt rim.", premium: false },
    { id: "espressomart", name: "Midnight Espresso Martini", price: 340, category: "drinks", desc: "Freshly pulled espresso shot shaken with premium vodka and dark coffee liqueur.", premium: true },
    { id: "oldfashioned", name: "Smoked Rosemary Old Fashioned", price: 350, category: "drinks", desc: "Bourbon whiskey infused with aromatic bitters, cold-smoked with dried rosemary twigs.", premium: false },
    { id: "ginbotanical", name: "Twilight Lavender Tonic", price: 310, category: "drinks", desc: "Local craft gin mixed with lavender syrup, elderflower tonic, and an edible flower garnish.", premium: false },
    { id: "draftbeer", name: "Sundown Draft Craft Ale", price: 180, category: "drinks", desc: "Crisp, ice-cold local blonde ale served straight from the draft tap barrel.", premium: false },
    { id: "rumpunch", name: "Boracay Rum Punch", price: 260, category: "drinks", desc: "Dark rum combined with pineapple juice, mango puree, grenadine, and a lime wheel.", premium: false },
    { id: "mocktail", name: "Zero-Proof Virgin Sunrise", price: 220, category: "drinks", desc: "A refreshing non-alcoholic blend of orange juice, cranberry nectar, and fizzing ginger ale.", premium: false },

    // --- 10 PREMIUM BAR BITES (FOOD) ---
    { id: "sisig", name: "Glazed Pork Sisig Bites", price: 360, category: "bites", desc: "Crunchy, savory pork sisig served on cast-iron mini skillets with a lingering citrus zest.", premium: true },
    { id: "nachos", name: "Loaded Overload Nachos", price: 340, category: "bites", desc: "Tortilla chips loaded with beef bits, hot cheese streams, pimiento cubes, and mild salsa sauce.", premium: true },
    { id: "wings", name: "Salted Egg Dynamite Wings", price: 380, category: "bites", desc: "Crispy chicken wings glazed in a rich, creamy salted egg sauce with minced green chilies.", premium: false },
    { id: "calamares", name: "Crispy Pepper Calamares", price: 350, category: "bites", desc: "Tender squid rings battered and deep-fried, tossed in sea salt and cracked black pepper.", premium: false },
    { id: "fries", name: "Truffle Parmesan Fries", price: 240, category: "bites", desc: "Thick-cut potato fries drizzled with aromatic truffle oil and grated parmesan snow.", premium: false },
    { id: "skewers", name: "Sweet Soy Yakitori Skewers", price: 290, category: "bites", desc: "Charcoal-grilled chicken thigh cubes and scallions glazed in a rich sweet soy tare.", premium: false },
    { id: "gambas", name: "Sizzling Garlic Gambas", price: 420, category: "bites", desc: "Plump shrimps swimming in hot olive oil infused with toasted garlic and chili flakes.", premium: true },
    { id: "tokwatbaboy", name: "Crispy Tokwa't Baboy", price: 280, category: "bites", desc: "Deep-fried tofu blocks and crispy pork ears tossed in a sweet-sour soy vinegar dressing.", premium: false },
    { id: "sliders", name: "Wagyu Beef Mini Sliders", price: 390, category: "bites", desc: "Three mini brioche buns stacking juicy wagyu patties, cheddar, and caramelized onions.", premium: false },
    { id: "cheesesticks", name: "Mozzarella Dynamite Sticks", price: 260, category: "bites", desc: "Stretched mozzarella cheese wrapped in lumpia wrappers with green siling haba, fried crisp.", premium: false }
];

let selectedCategory = "all";
let searchFilterQuery = "";

// CORE DOM PANEL HOOKS
const dynamicMenuGrid = document.getElementById('dynamic-menu-grid');
const dynamicOrderRowsBox = document.getElementById('dynamic-order-rows-box');
const searchInput = document.getElementById('menu-search-input');
const categoryTabs = document.querySelectorAll('.category-tab');

// ==========================================
// 🛠️ ENGINE 1: INSTANT DISPLAY SHOWROOM CARD GENERATOR
// ==========================================
function renderMenuAndOrderForms() {
    dynamicMenuGrid.innerHTML = "";
    const filteredMenu = MENU_DATA.filter(item => {
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchFilterQuery.toLowerCase()) || 
                              item.desc.toLowerCase().includes(searchFilterQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filteredMenu.forEach(item => {
        const card = document.createElement('div');
        card.className = `menu-item-card ${item.premium ? 'premium' : ''}`;
        card.innerHTML = `
            ${item.premium ? '<span class="badge-pink">Bestseller</span>' : ''}
            <div class="item-main">
                <h3 class="gold-heading">${item.name}</h3>
                <span class="price">₱${item.price}</span>
            </div>
            <p class="desc">${item.desc}</p>
        `;
        dynamicMenuGrid.appendChild(card);
    });

    if (dynamicOrderRowsBox.children.length === 0) {
        MENU_DATA.forEach(item => {
            const orderRow = document.createElement('div');
            orderRow.className = "order-item-row";
            orderRow.dataset.id = item.id;
            orderRow.innerHTML = `
                <div class="order-item-info">
                    <span class="order-item-name gold-heading">${item.name}</span>
                    <span class="order-item-price">₱${item.price}</span>
                </div>
                <div class="quantity-control">
                    <button type="button" class="qty-btn counter-minus">-</button>
                    <input type="number" id="qty-${item.id}" class="item-qty" value="0" min="0" readonly>
                    <button type="button" class="qty-btn counter-plus" data-price="${item.price}">+</button>
                </div>
            `;
            dynamicOrderRowsBox.appendChild(orderRow);
        });
        bindIncrementCounters();
    }
}

searchInput.addEventListener('input', (e) => { searchFilterQuery = e.target.value; renderMenuAndOrderForms(); });
categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        selectedCategory = this.dataset.category;
        renderMenuAndOrderForms();
    });
});

// ==========================================
// 🧭 ENGINE 2: SPATIAL ZONE LOUNGE FLOOR MAP
// ==========================================
const mapTables = document.querySelectorAll('.table-node');
const orderTableInput = document.getElementById('order_table');
const bookingTableInput = document.getElementById('booking_table_select');

mapTables.forEach(table => {
    table.addEventListener('click', function() {
        if (this.classList.contains('reserved')) return;
        mapTables.forEach(t => t.classList.remove('active-select'));
        this.classList.add('active-select');

        const selectedTableName = this.dataset.table;
        if (!orderTableInput.disabled) { orderTableInput.value = selectedTableName; }
        bookingTableInput.value = selectedTableName;
    });
});

// ==========================================
// 🛒 ENGINE 3: TRANSLUCENT SIDE BASKET DRAWER ARITHMETIC
// ==========================================
const floatingCartTrigger = document.getElementById('floating-cart-trigger');
const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
const closeDrawerBtn = document.getElementById('close-drawer-btn');
const cartItemsManifestBox = document.getElementById('cart-items-manifest-box');
const cartFloatingCounter = document.getElementById('cart-floating-counter');

const dSubtotal = document.getElementById('d-subtotal');
const dTax = document.getElementById('d-tax');
const dTotal = document.getElementById('d-total');

const subtotalEl = document.getElementById('summary-subtotal');
const taxEl = document.getElementById('summary-tax');
const totalEl = document.getElementById('summary-total');

function compileAndSyncCartDrawer() {
    cartItemsManifestBox.innerHTML = "";
    let subtotal = 0;
    let totalItemHeadcount = 0;

    const rows = document.querySelectorAll('.order-item-row');
    rows.forEach(row => {
        const qty = parseInt(row.querySelector('.item-qty').value) || 0;
        const plusBtn = row.querySelector('.counter-plus');
        const unitPrice = parseFloat(plusBtn.dataset.price);
        const itemName = row.querySelector('.order-item-name').innerText;

        if (qty > 0) {
            subtotal += (qty * unitPrice);
            totalItemHeadcount += qty;

            const itemHTML = `
                <div class="r-item-line" style="padding: 0.8rem 0; border-bottom: 1px solid #141424;">
                    <span>${itemName} <strong class="text-neon-blue">x${qty}</strong></span>
                    <span class="r-item-total-val">₱${(qty * unitPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
            `;
            cartItemsManifestBox.insertAdjacentHTML('beforeend', itemHTML);
        }
    });

    const tax = subtotal * 0.10;
    const grossTotal = subtotal + tax;

    cartFloatingCounter.innerText = totalItemHeadcount;

    const subStr = `₱${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    const taxStr = `₱${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    const totStr = `₱${grossTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    dSubtotal.innerText = subStr; dTax.innerText = taxStr; dTotal.innerText = totStr;
    subtotalEl.innerText = subStr; taxEl.innerText = taxStr; totalEl.innerText = totStr;
}

function bindIncrementCounters() {
    const minusBtns = document.querySelectorAll('.counter-minus');
    const plusBtns = document.querySelectorAll('.counter-plus');

    plusBtns.forEach(btn => {
        btn.onclick = function() {
            const field = this.parentElement.querySelector('.item-qty');
            field.value = (parseInt(field.value) || 0) + 1;
            compileAndSyncCartDrawer();
        };
    });

    minusBtns.forEach(btn => {
        btn.onclick = function() {
            const field = this.parentElement.querySelector('.item-qty');
            let current = parseInt(field.value) || 0;
            if (current > 0) {
                field.value = current - 1;
                compileAndSyncCartDrawer();
            }
        };
    });
}

floatingCartTrigger.addEventListener('click', () => cartDrawerBackdrop.classList.add('open-drawer'));
closeDrawerBtn.addEventListener('click', () => cartDrawerBackdrop.classList.remove('open-drawer'));
cartDrawerBackdrop.addEventListener('click', function(e) { if(e.target === this) this.classList.remove('open-drawer'); });

document.getElementById('trigger-checkout-gate-btn').addEventListener('click', () => {
    if (dSubtotal.innerText === "₱0.00") {
        alert("⚠️ Your order basket sheet is empty."); return;
    }
    cartDrawerBackdrop.classList.remove('open-drawer');
    document.getElementById('order-form').dispatchEvent(new Event('submit'));
});

// ==========================================
// 🔗 ENGINE 4: DYNAMIC URL METADATA QR ROUTER
// ==========================================
function processSmartQrRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableParam = urlParams.get('table'); 
    if (tableParam) {
        orderTableInput.value = `Table ${tableParam.trim()}`;
        orderTableInput.disabled = true; 
        document.getElementById('detected-table-label').innerText = `Table ${tableParam.trim()}`;
        document.getElementById('qr-routing-notice').style.display = "block";

        mapTables.forEach(t => {
            if(t.dataset.table.toLowerCase() === `table ${tableParam.trim()}`.toLowerCase()) {
                t.classList.add('active-select');
            }
        });
    }
}

// ==========================================
// 💳 ENGINE 5: SECURE PAYMENT TERMINALS SANDBOX
// ==========================================
const orderForm = document.getElementById('order-form');
const orderStatus = document.getElementById('order-status');
const receiptModal = document.getElementById('receipt-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const receiptItemsContainer = document.getElementById('receipt-items-container');
const payMethodBtns = document.querySelectorAll('.pay-method-btn');
const terminalWallet = document.getElementById('terminal-wallet');
const terminalCard = document.getElementById('terminal-card');
let currentSelectedMethod = "gcash";

payMethodBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        payMethodBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentSelectedMethod = this.dataset.method;
        if (currentSelectedMethod === "gcash" || currentSelectedMethod === "maya") {
            terminalWallet.classList.add('active'); terminalCard.classList.remove('active');
        } else if (currentSelectedMethod === "card") {
            terminalCard.classList.add('active'); terminalWallet.classList.remove('active');
        }
    });
});

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (subtotalEl.innerText === "₱0.00") {
        orderStatus.style.color = "var(--accent-pink)";
        orderStatus.innerText = "⚠️ Select at least 1 menu item to dispatch."; return;
    }

    document.getElementById('r-table').innerText = orderTableInput.value;
    document.getElementById('r-name').innerText = document.getElementById('customer_name').value;
    
    const timeNode = new Date();
    document.getElementById('r-date').innerText = timeNode.toLocaleDateString();
    document.getElementById('r-time').innerText = timeNode.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('r-subtotal').innerText = subtotalEl.innerText;
    document.getElementById('r-tax').innerText = taxEl.innerText;
    document.getElementById('r-total').innerText = totalEl.innerText;

    receiptItemsContainer.innerHTML = "";
    MENU_DATA.forEach(item => {
        const qty = parseInt(document.getElementById(`qty-${item.id}`).value) || 0;
        if (qty > 0) {
            const rowHTML = `<div class="r-item-line"><span>${item.name} <strong>(x${qty})</strong></span><span>₱${(qty * item.price).toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>`;
            receiptItemsContainer.insertAdjacentHTML('beforeend', rowHTML);
        }
    });

    document.getElementById('hidden_order_summary').value = subtotalEl.innerText;
    document.getElementById('hidden_total_price').value = totalEl.innerText;

    receiptModal.classList.add('show-modal');
});

document.getElementById('confirm-payment-btn').addEventListener('click', () => {
    if (currentSelectedMethod === "gcash" || currentSelectedMethod === "maya") {
        if (document.getElementById('wallet-phone-input').value.length < 10) {
            alert(`⚠️ Complete the 10-digit sandbox token configuration for ${currentSelectedMethod.toUpperCase()}.`); return;
        }
    } else if (currentSelectedMethod === "card") {
        if (document.getElementById('card-num-input').value.length < 19 || document.getElementById('card-exp-input').value.length < 5) {
            alert("⚠️ Invalid Bank Routing parameters sequence constraints."); return;
        }
    }

    alert(`🔒 Checkouts resolved successfully via ${currentSelectedMethod.toUpperCase()} Interface! Preparing your restobar tokens.`);
    receiptModal.classList.remove('show-modal');
    location.reload(); 
});

closeModalBtn.addEventListener('click', () => receiptModal.classList.remove('show-modal'));
document.getElementById('print-receipt-btn').addEventListener('click', () => window.print());

document.getElementById('card-num-input').addEventListener('input', e => e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim());
document.getElementById('card-exp-input').addEventListener('input', e => e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/').trim());

// Advanced Spatial Booking Verification Request
const reservationForm = document.getElementById('reservation-form');
reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('form-status').innerText = "Processing space parameters allocation locks...";
    setTimeout(() => {
        document.getElementById('form-status').style.color = "#00ff88";
        document.getElementById('form-status').innerText = "✓ Spatial zone successfully locked! Enjoy the sundown experience.";
        reservationForm.reset();
        mapTables.forEach(t => t.classList.remove('active-select'));
    }, 1000);
});

// INITIALIZATION PIPELINE BOOTSTRAP
window.addEventListener('DOMContentLoaded', () => {
    renderMenuAndOrderForms();
    processSmartQrRouting();
});
