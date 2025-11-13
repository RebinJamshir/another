# Fincorp POS System

A modern Point of Sale (POS) system for Fincorp with violet branding, built with vanilla HTML, CSS, and JavaScript.

## Features

✅ **Product Catalog** - Browse 16 sample products with icons and pricing
✅ **Barcode Scanner** - Scan or search products by barcode or name
✅ **Shopping Cart** - Add/remove items, adjust quantities
✅ **Real-time Calculations** - Automatic subtotal, tax (10%), and total calculations
✅ **Receipt Generation** - Professional receipts with Fincorp branding
✅ **Print Support** - Print receipts directly
✅ **Responsive Design** - Works on desktop and tablets
✅ **Violet Theme** - Professional Fincorp color scheme

## Getting Started

### Quick Start

1. Open `index.html` in any modern web browser
2. Start scanning/adding products
3. Proceed to checkout when ready

### No Installation Required!

This POS system runs entirely in the browser with no build tools, dependencies, or installation needed.

## How to Use

### Adding Products

**Method 1: Click Product Card**
- Browse the available products grid
- Click any product card to add it to the cart

**Method 2: Barcode Scanner**
- Use the scanner input at the top
- Type a barcode (001-016) or product name
- Press Enter to add the product

**Example Barcodes:**
- 001 = Milk
- 002 = Bread
- 003 = Eggs
- 004 = Cheese
- 005 = Apple
- 006 = Banana
- 007 = Orange
- 008 = Tomato
- 009 = Lettuce
- 010 = Carrot
- 011 = Chicken
- 012 = Fish
- 013 = Rice
- 014 = Pasta
- 015 = Coffee
- 016 = Juice

### Managing Cart

- **Increase Qty**: Click the `+` button
- **Decrease Qty**: Click the `-` button
- **Remove Item**: Click the `×` button
- **Clear All**: Click "Clear All" button

### Checkout

1. Click the "Checkout" button when ready
2. A professional receipt will appear
3. Review the transaction details
4. Click "Print Receipt" to print or save as PDF
5. Cart automatically clears for the next transaction

## Product List

| # | Item | Price | Barcode |
|---|------|-------|---------|
| 1 | Milk | $3.99 | 001 |
| 2 | Bread | $2.49 | 002 |
| 3 | Eggs | $4.99 | 003 |
| 4 | Cheese | $5.99 | 004 |
| 5 | Apple | $0.89 | 005 |
| 6 | Banana | $0.59 | 006 |
| 7 | Orange | $1.29 | 007 |
| 8 | Tomato | $1.49 | 008 |
| 9 | Lettuce | $2.29 | 009 |
| 10 | Carrot | $1.09 | 010 |
| 11 | Chicken | $8.99 | 011 |
| 12 | Fish | $12.99 | 012 |
| 13 | Rice | $4.49 | 013 |
| 14 | Pasta | $1.99 | 014 |
| 15 | Coffee | $7.99 | 015 |
| 16 | Juice | $3.49 | 016 |

## File Structure

```
markup-pos/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── app.js          # Application logic
└── README.md       # This file
```

## Customization

### Add New Products

Edit `app.js` and add items to the `products` array:

```javascript
const products = [
    { id: 1, name: 'Your Product', price: 9.99, icon: '🎯', barcode: '001' },
    // Add more products...
];
```

### Change Tax Rate

In `app.js`, modify the tax calculation:

```javascript
const tax = subtotal * 0.1;  // Change 0.1 to your desired tax rate
```

### Update Store Name

In `index.html`, find the store name:

```html
<span>Store: Main Branch</span>
```

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Any modern browser with ES6 support

## Tips

- The barcode scanner supports fuzzy search (e.g., "app" will find "Apple")
- Transactions are stored in memory during the session
- Use browser's Print function (Ctrl+P or Cmd+P) from the receipt modal
- The cart automatically calculates 10% tax on all items

## Future Enhancements

Potential features to add:
- Local storage for transaction history
- Discount codes/coupon system
- Employee login system
- Payment method integration
- Inventory management
- Product categories
- Receipt email functionality
- Multi-currency support

## License

Free to use and modify for personal or commercial use.

---

**Developed for supermarket POS operations | Last Updated: November 2025**
