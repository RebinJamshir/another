// ============ AUTH & STATE ============

let currentUser = null;
let currentRole = null;
let inventory = JSON.parse(localStorage.getItem('fincorp_inventory')) || {};
let cart = [];
let invoices = JSON.parse(localStorage.getItem('fincorp_invoices')) || [];
let currentInvoice = null;

// login timers (used to ensure UI proceeds even if animation blocks)
let loginAnimationTimeout = null;
let loginFallbackTimeout = null;

// Single user mode (master) - simplified for debugging / dev
const users = {
    master: { password: 'master', role: 'master' }
};

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('barcodeInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addFromBarcode();
        }
    });

    // Single-user mode: set master as active user and show dashboard
    currentUser = 'master';
    currentRole = users.master.role;
    localStorage.setItem('fincorp_user', currentUser);
    localStorage.setItem('fincorp_role', currentRole);
    console.log('Starting in single-user mode:', currentUser, currentRole);
    showMainApp();
    document.getElementById('barcodeInput')?.focus();
});

// ============ LOGIN ============

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('loginError');

    console.log('handleLogin called for user:', username);

    if (users[username] && users[username].password === password) {
        currentUser = username;
        currentRole = users[username].role;
        localStorage.setItem('fincorp_user', username);
        localStorage.setItem('fincorp_role', currentRole);

        console.log('Authenticated as', currentUser, 'role:', currentRole);

        // Trigger login animation and show a small spinner as feedback
        triggerLoginAnimation(currentRole);
        error.classList.remove('show');

        // Show spinner and small visual change
        const loginBox = document.querySelector('.login-box');
        const spinner = document.getElementById('loginSpinner');
        if (loginBox) loginBox.classList.add('logging-in');
        if (spinner) spinner.classList.add('show');

        // Primary timeout to show the app after animation completes
        loginAnimationTimeout = setTimeout(() => {
            console.log('loginAnimationTimeout fired');
            // Hide spinner and show app
            if (spinner) spinner.classList.remove('show');
            if (loginBox) loginBox.classList.remove('logging-in');
            showMainApp();
        }, 1500);

        // Fallback: if something blocks the UI, force show the app after 3s
        loginFallbackTimeout = setTimeout(() => {
            console.log('loginFallbackTimeout fired');
            const loginScreen = document.getElementById('loginScreen');
            if (loginScreen && loginScreen.classList.contains('show')) {
                if (spinner) spinner.classList.remove('show');
                if (loginBox) loginBox.classList.remove('logging-in');
                showMainApp();
            }
        }, 3000);
    } else {
        error.textContent = 'Invalid credentials';
        error.classList.add('show');
    }
}

function triggerLoginAnimation(role) {
    const loginScreen = document.getElementById('loginScreen');
    const loginBox = document.querySelector('.login-box');
    const loginLogo = document.getElementById('loginLogo');
    const loginHeader = document.querySelector('.login-header h1');
    const bgAnimation = document.querySelector('.login-background-animation');
    
    if (role === 'master') {
        // Master login: Gold theme
        loginScreen.classList.add('master-login');
        loginBox.classList.add('master-theme');
        loginLogo.classList.add('master-spin');
        loginHeader.classList.add('master-text');
        bgAnimation.classList.add('master-particles');
    } else {
        // Admin login: Green theme
        loginScreen.classList.add('admin-login');
        loginBox.classList.add('admin-theme');
        loginLogo.classList.add('admin-spin');
        loginHeader.classList.add('admin-text');
        bgAnimation.classList.add('admin-particles');
    }
}

function logout() {
    currentUser = null;
    currentRole = null;
    cart = [];
    localStorage.removeItem('fincorp_user');
    localStorage.removeItem('fincorp_role');
    
    // Clear any pending login timers
    if (loginAnimationTimeout) {
        clearTimeout(loginAnimationTimeout);
        loginAnimationTimeout = null;
    }
    if (loginFallbackTimeout) {
        clearTimeout(loginFallbackTimeout);
        loginFallbackTimeout = null;
    }

    // Reset login screen animations and styling
    const loginScreen = document.getElementById('loginScreen');
    const loginBox = document.querySelector('.login-box');
    const loginLogo = document.getElementById('loginLogo');
    const loginHeader = document.querySelector('.login-header h1');
    const bgAnimation = document.querySelector('.login-background-animation');
    
    loginScreen.classList.remove('master-login', 'admin-login');
    loginBox.classList.remove('master-theme', 'admin-theme');
    loginLogo.classList.remove('master-spin', 'admin-spin');
    loginHeader.classList.remove('master-text', 'admin-text');
    bgAnimation.classList.remove('master-particles', 'admin-particles');
    
    loginScreen.classList.add('show');
    document.getElementById('mainApp').style.display = 'none';
    
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('username').focus();
}

// ============ UI STATE ============

function showMainApp() {
    console.log('showMainApp called; user:', currentUser, 'role:', currentRole);
    // Clear any login timers and spinner state in case they remain
    if (loginAnimationTimeout) { clearTimeout(loginAnimationTimeout); loginAnimationTimeout = null; }
    if (loginFallbackTimeout) { clearTimeout(loginFallbackTimeout); loginFallbackTimeout = null; }
    const spinner = document.getElementById('loginSpinner');
    const loginBox = document.querySelector('.login-box');
    if (spinner) spinner.classList.remove('show');
    if (loginBox) loginBox.classList.remove('logging-in');

    const loginScreenEl = document.getElementById('loginScreen');
    if (loginScreenEl) loginScreenEl.classList.remove('show');
    const mainAppEl = document.getElementById('mainApp');
    if (mainAppEl) mainAppEl.style.display = 'flex';
    
    document.getElementById('userDisplay').textContent = `User: ${currentUser}`;
    document.getElementById('roleDisplay').textContent = `Role: ${currentRole === 'master' ? '👑 Master' : '💼 Cashier'}`;
    
    // Setup role-based navigation
    // Show POS nav and master-only nav items for master role
    const navPos = document.getElementById('navInventory');
    const navInvBtn = document.getElementById('navInventoryBtn');
    const navInvs = document.getElementById('navInvoices');
    if (navPos) navPos.style.display = 'block';
    if (currentRole === 'master') {
        if (navInvBtn) navInvBtn.style.display = 'block';
        if (navInvs) navInvs.style.display = 'block';
    } else {
        if (navInvBtn) navInvBtn.style.display = 'none';
        if (navInvs) navInvs.style.display = 'none';
    }
    
    showScreen('pos');
}

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('show'));
    
    if (screenName === 'pos') {
        document.getElementById('posScreen').classList.add('show');
    } else if (screenName === 'inventory') {
        document.getElementById('inventoryScreen').classList.add('show');
        renderInventory();
    } else if (screenName === 'invoices') {
        document.getElementById('invoicesScreen').classList.add('show');
        renderInvoices();
    }
}

// ============ POS - BARCODE & CART ============

function addFromBarcode() {
    const input = document.getElementById('barcodeInput');
    const qtyInput = document.getElementById('qtyInput');
    const barcode = input.value.trim();
    const qty = parseInt(qtyInput.value) || 1;
    
    if (!barcode) return;
    
    const product = inventory[barcode];
    if (product) {
        addToCartWithQty(barcode, product, qty);
        input.value = '';
        qtyInput.value = '1';
        input.focus();
    } else {
        alert('Product not found in inventory');
    }
}

function addToCartWithQty(barcode, product, qty) {
    const existing = cart.find(item => item.barcode === barcode);
    
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            barcode,
            name: product.name,
            price: product.price,
            qty: qty
        });
    }
    
    updateCart();
}

function addToCart(barcode, product) {
    const existing = cart.find(item => item.barcode === barcode);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            barcode,
            name: product.name,
            price: product.price,
            qty: 1
        });
    }
    
    updateCart();
}

function updateCart() {
    const container = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-state">Empty</p>';
    } else {
        container.innerHTML = cart.map((item, idx) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-qty">${item.qty} × $${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-price">$${(item.qty * item.price).toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${idx})">Remove</button>
            </div>
        `).join('');
    }
    
    updateSummary();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const discountPercent = parseFloat(document.getElementById('discountInput').value) || 0;
    const discountAmount = (subtotal * discountPercent) / 100;
    const afterDiscount = subtotal - discountAmount;
    const tax = afterDiscount * 0.1;
    const total = afterDiscount + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discountAmount').textContent = `-$${discountAmount.toFixed(2)}`;
    document.getElementById('discountBadge').textContent = `${discountPercent.toFixed(1)}%`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// ============ CHECKOUT ============

function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const discountPercent = parseFloat(document.getElementById('discountInput').value) || 0;
    const discount = (subtotal * discountPercent) / 100;
    const afterDiscount = subtotal - discount;
    const tax = afterDiscount * 0.1;
    const total = afterDiscount + tax;
    
    const invoiceNumber = 'INV-' + new Date().getTime();
    const invoice = {
        number: invoiceNumber,
        date: new Date().toLocaleString(),
        items: [...cart],
        subtotal,
        discount,
        tax,
        total
    };
    
    currentInvoice = invoice;
    invoices.push(invoice);
    saveToLocalStorage();
    
    showReceipt(invoice);
    cart = [];
    document.getElementById('discountInput').value = '';
    updateCart();
}

// ============ RECEIPT ============

function showReceipt(invoice) {
    const content = document.getElementById('receiptContent');
    
    const itemsHtml = invoice.items.map(item => `
        <div class="receipt-item">
            <div class="receipt-item-left">${item.name}</div>
            <div class="receipt-item-qty">×${item.qty}</div>
            <div class="receipt-item-price">$${(item.qty * item.price).toFixed(2)}</div>
        </div>
    `).join('');
    
    const discountRow = invoice.discount > 0 ? `
        <div class="receipt-total">
            <span>Discount:</span>
            <span>-$${invoice.discount.toFixed(2)}</span>
        </div>
    ` : '';
    
    content.innerHTML = `
        <div class="receipt">
            <div class="receipt-header">
                <div>💜 FINCORP</div>
                <div class="receipt-number">${invoice.number}</div>
                <div class="receipt-time">${invoice.date}</div>
            </div>
            <div class="receipt-items">
                ${itemsHtml}
            </div>
            <div class="receipt-total">
                <span>Subtotal:</span>
                <span>$${invoice.subtotal.toFixed(2)}</span>
            </div>
            ${discountRow}
            <div class="receipt-total">
                <span>Tax (10%):</span>
                <span>$${invoice.tax.toFixed(2)}</span>
            </div>
            <div class="receipt-total" style="font-weight: 700; font-size: 14px; border-top: 1px solid var(--border); padding-top: 8px;">
                <span>TOTAL:</span>
                <span>$${invoice.total.toFixed(2)}</span>
            </div>
            <div class="receipt-footer">
                <p>Thank you for your purchase!</p>
                <p>Fincorp - Your Financial Partner</p>
            </div>
        </div>
    `;
    
    document.getElementById('receiptModal').classList.add('show');
}

function closeReceipt() {
    document.getElementById('receiptModal').classList.remove('show');
}

function printReceipt() {
    window.print();
}

function downloadReceipt() {
    if (!currentInvoice) return;
    
    const text = generateReceiptText(currentInvoice);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentInvoice.number}.txt`;
    a.click();
}

function generateReceiptText(invoice) {
    let text = '╔════════════════════════╗\n';
    text += '║  💜 FINCORP           ║\n';
    text += '║  RECEIPT               ║\n';
    text += '╚════════════════════════╝\n\n';
    text += `Number: ${invoice.number}\n`;
    text += `Date: ${invoice.date}\n\n`;
    text += '─────────────────────────\n';
    text += 'Item             Qty Price\n';
    text += '─────────────────────────\n';
    
    invoice.items.forEach(item => {
        text += `${item.name.padEnd(15)} ×${item.qty}  $${(item.qty * item.price).toFixed(2)}\n`;
    });
    
    text += '═════════════════════════\n';
    text += `Subtotal:  $${invoice.subtotal.toFixed(2)}\n`;
    if (invoice.discount > 0) {
        text += `Discount:  -$${invoice.discount.toFixed(2)}\n`;
    }
    text += `Tax (10%): $${invoice.tax.toFixed(2)}\n`;
    text += `TOTAL:     $${invoice.total.toFixed(2)}\n`;
    text += '═════════════════════════\n\n';
    text += 'Thank you for your purchase!\n';
    text += 'Fincorp - Your Financial Partner\n';
    
    return text;
}

// ============ INVENTORY - MASTER ONLY ============

function addProductInventory() {
    const barcode = document.getElementById('invBarcode').value.trim();
    const name = document.getElementById('invName').value.trim();
    const price = parseFloat(document.getElementById('invPrice').value);
    const qty = parseInt(document.getElementById('invQty').value);
    
    if (!barcode || !name || !price || qty < 0) {
        alert('Please fill all fields correctly');
        return;
    }
    
    inventory[barcode] = {
        barcode,
        name,
        price,
        qty,
        added: new Date().toLocaleString()
    };
    
    document.getElementById('invBarcode').value = '';
    document.getElementById('invName').value = '';
    document.getElementById('invPrice').value = '';
    document.getElementById('invQty').value = '';
    
    saveToLocalStorage();
    renderInventory();
}

function deleteProduct(barcode) {
    if (confirm('Delete this product?')) {
        delete inventory[barcode];
        saveToLocalStorage();
        renderInventory();
    }
}

function renderInventory() {
    const container = document.getElementById('inventoryItems');
    const products = Object.values(inventory);
    
    if (products.length === 0) {
        container.innerHTML = '<p class="empty-state">No products in inventory</p>';
    } else {
        container.innerHTML = products.map(product => `
            <div class="inventory-item">
                <div class="inventory-item-info">
                    <div class="inventory-item-code">${product.barcode}</div>
                    <div class="inventory-item-name">${product.name}</div>
                    <div class="inventory-item-price">$${product.price.toFixed(2)}</div>
                </div>
                <div style="text-align: right;">
                    <div class="inventory-item-qty">${product.qty}</div>
                    <div class="inventory-item-qty-label">in stock</div>
                    <button class="inventory-item-delete" onclick="deleteProduct('${product.barcode}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

// ============ INVOICES - MASTER ONLY ============

function renderInvoices() {
    const container = document.getElementById('invoicesList');
    
    // Get today's invoices
    const today = new Date().toDateString();
    const todayInvoices = invoices.filter(inv => 
        new Date(inv.date).toDateString() === today
    );
    
    if (todayInvoices.length === 0) {
        container.innerHTML = '<p class="empty-state">No invoices today</p>';
    } else {
        container.innerHTML = todayInvoices.map(invoice => `
            <div class="invoice-card">
                <div class="invoice-header">
                    <div class="invoice-number">${invoice.number}</div>
                    <div class="invoice-time">${invoice.date}</div>
                </div>
                <div class="invoice-items">
                    ${invoice.items.map(item => `
                        <div class="invoice-item-line">
                            <span>${item.name} ×${item.qty}</span>
                            <span>$${(item.qty * item.price).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="invoice-total">
                    <span>Total:</span>
                    <span>$${invoice.total.toFixed(2)}</span>
                </div>
            </div>
        `).join('');
    }
}

// ============ STORAGE ============

function openMobileScanner() {
    // Open the mobile barcode scanner in a new window/tab
    // The user scans on mobile and sends barcode back via SharedWorker or WebSocket
    // For now, open the scanner app
    const scannerUrl = './scanner.html?desktop_url=' + encodeURIComponent(window.location.href);
    window.open(scannerUrl, 'mobile_scanner', 'width=500,height=600');
}

function receiveBarcodeFromMobile(barcode) {
    // This function is called when mobile scanner sends barcode data
    const input = document.getElementById('barcodeInput');
    if (input) {
        input.value = barcode;
        input.focus();
        // Optionally auto-add to cart
        setTimeout(() => addFromBarcode(), 200);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('fincorp_inventory', JSON.stringify(inventory));
    localStorage.setItem('fincorp_invoices', JSON.stringify(invoices));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('fincorp_user');
    const role = localStorage.getItem('fincorp_role');
    console.log('loadFromLocalStorage:', saved, role);
    
    if (saved && role) {
        currentUser = saved;
        currentRole = role;
        showMainApp();
        document.getElementById('barcodeInput')?.focus();
    }
}
