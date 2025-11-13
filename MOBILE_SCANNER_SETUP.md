# Fincorp POS — Mobile Barcode Scanner Setup

## Overview
This guide walks you through connecting your **Android phone as a barcode scanner** to the Fincorp POS desktop app.

The setup uses your phone's camera to scan barcodes and send them to the desktop POS app via a web-based mobile scanner interface.

---

## Prerequisites
- **Desktop**: POS app running at `http://localhost:8000` or `http://your-computer-ip:8000`
- **Android Phone**: Any Android device with a camera and a web browser (Chrome, Firefox, etc.)
- **Same Network**: Both devices must be on the same WiFi network

---

## Step-by-Step Instructions

### Part 1: Find Your Desktop Computer's IP Address

**On Windows (Desktop Computer):**

1. Open **PowerShell** (or Command Prompt).
2. Type:
   ```powershell
   ipconfig
   ```
3. Look for the line that says **"IPv4 Address"** under your active network connection.
   - Example: `192.168.1.100`
4. Note this IP address — you'll use it on your phone.

---

### Part 2: Ensure POS App is Running

**On Desktop:**

1. Open your terminal/PowerShell.
2. Navigate to your project folder:
   ```powershell
   cd 'C:\Users\ni--aa\markup-pos'
   ```
3. Ensure the local server is running (PowerShell HttpListener or Python server).
4. Open your desktop browser to verify the app loads:
   - http://localhost:8000 (or)
   - http://127.0.0.1:8000

If the app doesn't appear, start the server (from the earlier steps in this project).

---

### Part 3: Open Mobile Scanner on Your Android Phone

**On Android Phone:**

1. **Connect to WiFi**: Make sure your phone is on the same WiFi network as your desktop.

2. **Open a Web Browser** (Chrome, Firefox, Edge, etc.).

3. **Enter the URL**:
   ```
   http://<YOUR-DESKTOP-IP>:8000/scanner.html
   ```
   
   **Replace `<YOUR-DESKTOP-IP>` with the IPv4 address from Part 1.**
   
   Example: `http://192.168.1.100:8000/scanner.html`

4. **Allow Camera Access**: When the browser asks, tap **"Allow"** to grant camera permission.

5. You should now see:
   - A live camera feed from your phone
   - Green corner markers defining the barcode scanning area
   - Status text: **"Ready - Point at barcode"**

---

### Part 4: Scan a Barcode

**On Android Phone (Mobile Scanner):**

1. **Point your phone camera** at a barcode product.
2. **Hold steady** for 1-2 seconds until the barcode is detected.
3. When a barcode is successfully scanned:
   - The barcode value appears at the bottom in a "Last Scan" box (e.g., `123456789`)
   - Status shows **"Scanned: 123456789"**
   - The **"Send"** button becomes active (no longer grayed out)

---

### Part 5: Send Barcode to Desktop POS

**On Android Phone (Mobile Scanner):**

1. After scanning a barcode, the **"Send"** button is now active.
2. Tap **"Send"** to transmit the barcode to the desktop POS app.
3. The phone screen should briefly show **"Sent to POS!"**

**On Desktop (POS App):**

1. Check the **Barcode Scanner** input field in the POS tab — it should now contain the barcode.
2. The quantity field (next to the barcode input) shows a default of **1**.
3. **Adjust quantity** if needed (e.g., if you want to add 5 units of the product).
4. Click **"Add"** to add the product to your cart.

---

### Part 6: Repeat for Multiple Products

1. On your phone, **scan the next barcode**.
2. Tap **"Send"** on the mobile scanner.
3. On desktop, set quantity and click **"Add"**.
4. Repeat as needed.

---

## Troubleshooting

### "Cannot connect to POS" Error
- **Check network**: Both phone and desktop must be on the same WiFi.
- **Check IP address**: Verify you entered the correct desktop IP (from `ipconfig`).
- **Check server**: Ensure the local HTTP server is running on the desktop (open `http://localhost:8000` in your browser first).

### Camera Not Working on Phone
- **Check permissions**: Go to your phone's Settings → Apps → [Browser] → Permissions → Camera, and ensure it's enabled.
- **Try a different browser**: Use Chrome or Firefox if your default browser doesn't work.
- **Fallback manual entry**: The scanner has a fallback mode. If the camera fails, you can type barcodes manually.

### Barcode Not Scanning
- **Distance**: Hold the phone 4-6 inches from the barcode.
- **Lighting**: Ensure good lighting on the barcode.
- **Barcode quality**: Make sure the barcode is not damaged or blurry.
- **Barcode type**: The scanner supports most common formats (Code128, UPC, QR codes, etc.).

### Phone Can't Reach Desktop
- **Firewall**: Your Windows firewall might be blocking port 8000. Try disabling the firewall temporarily or adding an exception for port 8000.
- **Different subnets**: Ensure both devices are on the same WiFi network (not guest networks if those are isolated).

---

## Workflow Summary

1. **On Desktop**: Start POS app at `http://localhost:8000`
2. **On Phone**: Open `http://<desktop-ip>:8000/scanner.html`
3. **On Phone**: Scan a barcode (camera shows live feed)
4. **On Phone**: Tap "Send"
5. **On Desktop**: Barcode appears in the POS input; set quantity and click "Add"
6. **On Desktop**: View the item in the cart, adjust price/quantity as needed, then checkout

---

## Optional: Create a Shortcut on Your Phone

**Android Chrome:**
1. Open the scanner URL: `http://<your-ip>:8000/scanner.html`
2. Tap the **⋮** (menu) icon → **"Install app"** or **"Add to Home screen"**
3. Name it "Fincorp Scanner" and tap "Install"
4. A shortcut appears on your home screen for quick access

---

## Tips for Efficient Scanning

- **Quantity Selector (Desktop)**: Use the quantity field in the scanner box to batch-add multiples of the same item at once.
- **Discount (Desktop)**: After scanning all items, you can apply a discount percentage in the checkout section.
- **Mobile Tab Open**: Leave the scanner tab open on your phone while you work on the desktop. It stays active until you close it.

---

## Support

If you encounter issues:
1. Ensure both devices are on the same WiFi network.
2. Verify the desktop IP address with `ipconfig` on Windows.
3. Check that the local server is running and accessible at `http://localhost:8000`.
4. Open the browser's Developer Tools (F12 on desktop, or long-press → "Inspect" on mobile) and check for any JavaScript errors.

---

**Happy scanning!** 🎉
