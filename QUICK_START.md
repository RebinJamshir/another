# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Open the Application

1. Open `index.html` in your web browser
2. You should see the Fincorp POS dashboard
3. Ready to use!

---

## 2. Configure Your Hardware (Optional)

### Scanner Setup (2 minutes)

**For USB Barcode Scanner:**
1. Click **📡 Scanner** button in header
2. Select "USB Barcode Scanner"
3. Click **Test Scanner**
4. Scan a barcode (001-016) or enter manually
5. Click **Save Settings**

**For Manual Entry:**
1. Click **📡 Scanner**
2. Select "Manual Input"
3. Click **Save Settings**

### Printer Setup (2 minutes)

**For Thermal Receipt Printer:**
1. Click **🖨️ Printer** button
2. Select "Receipt Printer (80mm)"
3. Check "Auto-print after checkout"
4. Click **Test Print** to verify
5. Click **Save Settings**

---

## 3. Start Your First Transaction

### Quick Checkout

**Method 1: Click Products (Easiest)**
```
1. Browse products grid below scanner
2. Click any product to add to cart
3. Adjust quantity with + and - buttons
4. Click "Checkout" when done
5. Print receipt if needed
```

**Method 2: Use Barcode Scanner (Fastest)**
```
1. Connect barcode scanner to computer
2. Position scanner on barcode
3. Scan product (automatic add)
4. Repeat for each item
5. Click "Checkout"
6. Receipt prints automatically
```

**Method 3: Manual Search**
```
1. Type barcode code (001-016) or product name
2. Click "Search" or press Enter
3. Product added to cart
4. Repeat for other items
5. Click "Checkout"
```

---

## 4. Process Receipt

### After Checkout:

**Receipt Preview Shows:**
- Receipt number
- Date & time
- All items purchased
- Quantities
- Prices
- Subtotal, Tax, Total

**Choose Action:**
- **🖨️ Print to Browser** → Browser print dialog
- **🖨️ Print to Printer** → Direct to printer
- **📥 Download PDF** → Save as text file

---

## 5. Common Actions

| Action | How |
|--------|-----|
| **Add Product** | Click card or scan barcode |
| **Increase Qty** | Click + button in cart |
| **Decrease Qty** | Click - button in cart |
| **Remove Item** | Click × button on cart item |
| **Clear Cart** | Click "Clear All" button |
| **Checkout** | Click "Checkout" button |
| **Print Receipt** | Click print button after checkout |
| **Configure Scanner** | Click 📡 Scanner button |
| **Configure Printer** | Click 🖨️ Printer button |

---

## 🎯 Sample Barcode Codes

```
001 = Milk
002 = Bread
003 = Eggs
004 = Cheese
005 = Apple
006 = Banana
007 = Orange
008 = Tomato
009 = Lettuce
010 = Carrot
011 = Chicken
012 = Fish
013 = Rice
014 = Pasta
015 = Coffee
016 = Juice
```

**Try This:**
1. Scan or enter: 001 (Milk)
2. Scan or enter: 005 (Apple)
3. Scan or enter: 015 (Coffee)
4. Click Checkout
5. Check receipt

---

## 💡 Pro Tips

1. **Auto-Print Enabled?** 
   - Receipts print automatically after checkout
   - Check 🖨️ Printer settings

2. **Fast Checkout?**
   - Use USB barcode scanner
   - Enable auto-print
   - Click Checkout and it's done

3. **Test First?**
   - Try "Test Scanner" button
   - Try "Test Print" button
   - Then scan/print for real

4. **Multiple Transactions?**
   - Cart auto-clears after checkout
   - Ready for next customer immediately

5. **Lost Settings?**
   - Click settings buttons again
   - Re-enter and save
   - Browser remembers next time

---

## ❓ Frequently Asked Questions

**Q: How do I connect the barcode scanner?**
A: Plug USB scanner into computer. Windows auto-detects. Click 📡 Scanner and select "USB Barcode Scanner".

**Q: What if the scanner doesn't work?**
A: Try "Test Scanner" button. Click 📡 Scanner → Test Scanner. Then scan barcode 001-016.

**Q: Can I print receipts?**
A: Yes! Click 🖨️ Printer and select your printer type. Auto-print enabled by default.

**Q: How do I add more products?**
A: Edit `app.js` file and add to the products array.

**Q: Where are my receipts saved?**
A: Download receipts using "Download PDF" button or use browser's print-to-PDF feature.

**Q: Can I change the tax rate?**
A: Yes, edit `app.js` and modify the tax calculation (currently 10%).

**Q: Is my data safe?**
A: Yes, everything runs locally in your browser. No internet needed.

**Q: Can I use this offline?**
A: Yes, completely offline. Works without internet connection.

---

## 🔧 Troubleshooting

### Scanner Not Working?
1. Unplug and replug scanner
2. Click 📡 Scanner
3. Select scanner type again
4. Click "Test Scanner"
5. Try manual entry first

### Printer Not Printing?
1. Click 🖨️ Printer
2. Verify printer type matches your hardware
3. Click "Test Print"
4. Check paper is loaded
5. Try "Print to Browser" option

### Settings Not Saving?
1. Click Save Settings again
2. Wait for confirmation
3. Try a different browser
4. Clear browser cache

### Receipt Not Showing?
1. Ensure cart has items
2. Click "Checkout" button
3. Receipt modal will appear
4. May need to scroll to see all details

---

## 📚 More Information

- **Features Guide**: Read `FEATURES_GUIDE.md`
- **Hardware Setup**: Read `HARDWARE_SETUP.md`
- **Full Documentation**: Read `README.md`

---

## ✅ Checklist for New Users

- [ ] Open `index.html` in browser
- [ ] See products grid below scanner
- [ ] Click one product to add
- [ ] See item in cart (right side)
- [ ] Click Checkout
- [ ] See receipt preview
- [ ] Click Close
- [ ] Cart is now empty
- [ ] Ready for next transaction!

---

## 🎉 You're Ready!

Your Supermarket POS system is ready to use. Start by:
1. Adding products to cart (click or scan)
2. Click Checkout
3. Review receipt
4. Print if desired
5. Next transaction ready!

---

**Happy Selling! 🛒**

*Last Updated: November 13, 2025*
