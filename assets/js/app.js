// --- CONFIGURATION CONSTANTS (Get these values at EmailJS.com) ---
const PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
const SERVICE_ID = "YOUR_SERVICE_ID_HERE";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";

// Initialize EmailJS Engine
emailjs.init(PUBLIC_KEY); 

// --- DYNAMIC ORDER FORM CALCULATOR LOGIC ---
const orderForm = document.getElementById('order-form');
const orderStatus = document.getElementById('order-status');
const qtyButtons = document.querySelectorAll('.qty-btn');

const subtotalEl = document.getElementById('summary-subtotal');
const taxEl = document.getElementById('summary-tax');
const totalEl = document.getElementById('summary-total');
const hiddenSummaryInput = document.getElementById('hidden_order_summary');
const hiddenTotalInput = document.getElementById('hidden_total_price');

function updateBillCalculation() {
    let subtotal = 0;
    let itemsOrderedText = [];

    const rows = document.querySelectorAll('.order-item-row');
    rows.forEach(row => {
        const itemName = row.querySelector('.order-item-name').innerText;
        const qtyInput = row.querySelector('.item-qty');
        const qty = parseInt(qtyInput.value);
        const plusBtn = row.querySelector('.plus');
        const unitPrice = parseFloat(plusBtn.dataset.price);

        if (qty > 0) {
            subtotal += (qty * unitPrice);
            itemsOrderedText.push(`${itemName} (x${qty})`);
        }
    });

    const serviceTax = subtotal * 0.10; // 10% Local markup parameters
    const finalTotal = subtotal + serviceTax;

    subtotalEl.innerText = `₱${subtotal.toLocaleString()}`;
    taxEl.innerText = `₱${serviceTax.toLocaleString()}`;
    totalEl.innerText = `₱${finalTotal.toLocaleString()}`;

    // Flatten lists into text variables for clean parsing inside email notifications
    hiddenSummaryInput.value = itemsOrderedText.length > 0 ? itemsOrderedText.join(', ') : "No items selected";
    hiddenTotalInput.value = `₱${finalTotal.toLocaleString()}`;
}

// Plus and Minus Step Increment Actions
qtyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const inputField = this.parentElement.querySelector('.item-qty');
        let currentVal = parseInt(inputField.value);

        if (this.classList.contains('plus')) {
            inputField.value = currentVal + 1;
        } else if (this.classList.contains('minus') && currentVal > 0) {
            inputField.value = currentVal - 1;
        }

        updateBillCalculation();
    });
});

// Intercept Order submissions
orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (hiddenSummaryInput.value === "No items selected" || subtotalEl.innerText === "₱0") {
        orderStatus.style.color = "var(--accent-pink)";
        orderStatus.innerText = "⚠️ Please select at least 1 drink or food bite to place an order.";
        return;
    }

    orderStatus.style.color = "var(--accent-gold)";
    orderStatus.innerText = "Sending order tokens straight to the bar counter...";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(function() {
            orderStatus.style.color = "#00ff88";
            orderStatus.innerText = "✓ Order Placed! Your mixologist is preparing it right now.";
            orderForm.reset();
            updateBillCalculation();
        }, function(error) {
            orderStatus.style.color = "var(--accent-pink)";
            orderStatus.innerText = "❌ Transmission lost. Please wave down a floor waiter.";
            console.error('Order Error log:', error);
        });
});

// --- TABLE BOOKING DISPATCH LOGIC ---
const reservationForm = document.getElementById('reservation-form');
const bookingStatus = document.getElementById('form-status');

reservationForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    bookingStatus.style.color = "var(--accent-gold)";
    bookingStatus.innerText = "Processing your reservation request...";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(function() {
            bookingStatus.style.color = "#00ff88";
            bookingStatus.innerText = "✓ Request Sent! Check your email for verification shortly.";
            reservationForm.reset();
        }, function(error) {
            bookingStatus.style.color = "var(--accent-pink)";
            bookingStatus.innerText = "❌ Transmission failed. Check your setup configuration.";
            console.error('Booking Error log:', error);
        });
});