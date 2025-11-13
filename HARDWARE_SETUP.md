# Hardware Setup Guide

## 🔌 Barcode Scanner Setup

### USB Barcode Scanner (Recommended)

**Windows Installation:**

1. **Plug in Scanner**
   - Connect USB barcode scanner to computer
   - Windows will auto-detect as HID device
   - No drivers usually needed

2. **Verify Detection**
   - Go to Device Manager (devmgmt.msc)
   - Look for "Human Interface Devices"
   - Should see barcode scanner listed
   - If error, install drivers from manufacturer

3. **In POS Application:**
   - Click **📡 Scanner** button
   - Select "USB Barcode Scanner"
   - Click **Test Scanner**
   - Scan a test barcode (001-016)
   - Click **Save Settings**

### Serial Port Barcode Scanner

**Windows Installation:**

1. **Connect to Serial Port**
   - Plug serial scanner into COM port
   - Or use USB-to-Serial adapter to USB port

2. **Identify COM Port**
   - Device Manager → Ports (COM & LPT)
   - Note the COM number (e.g., COM3, COM4)
   - If using USB adapter, install drivers first

3. **In POS Application:**
   - Click **📡 Scanner** button
   - Select "Serial Port Scanner"
   - Enter port number (e.g., COM3)
   - Adjust delay if needed (500ms default)
   - Click **Test Scanner**
   - Click **Save Settings**

4. **If Not Working:**
   - Check Device Manager for errors
   - Update drivers from manufacturer
   - Try different COM port
   - Verify scanner baud rate matches settings

### Camera-Based Scanner (Experimental)

**Requirements:**
- Webcam connected to computer
- Modern browser with webcam access
- Good lighting for barcode visibility

**Setup:**
1. Click **📡 Scanner**
2. Select "Camera Scanner (Experimental)"
3. Browser will request camera permission
4. Click "Allow" when prompted
5. Position barcode in front of camera
6. System will detect barcode automatically

---

## 🖨️ Printer Setup

### Thermal Receipt Printer (80mm) - RECOMMENDED

**Physical Setup:**
1. **Unbox Printer**
   - Remove all packaging and protective materials
   - Install thermal paper roll (80mm width)
   - Connect power adapter

2. **Connect to Computer**
   - USB: Plug USB cable into computer
   - Network: Connect Ethernet cable
   - Wait for driver installation

3. **Install Drivers (if needed)**
   - Visit manufacturer website (Epson, Star, etc.)
   - Download appropriate Windows drivers
   - Run installer
   - Restart computer

4. **Configure in Windows**
   - Settings → Devices → Printers & Scanners
   - Click "Add a printer"
   - Select thermal printer
   - Set as default (recommended)

5. **In POS Application:**
   - Click **🖨️ Printer** button
   - Select "Receipt Printer (80mm)"
   - Check "Auto-print after checkout" for convenience
   - Click **Test Print**
   - Verify receipt printed correctly
   - Click **Save Settings**

### USB Printer (Standard)

**Setup:**
1. Plug USB printer into computer
2. Windows auto-detalls drivers (usually)
3. In POS: Select "Receipt Printer (80mm)"
4. Click **Test Print**

### Network Printer

**Setup:**
1. Connect printer to network (WiFi or Ethernet)
2. Note printer IP address
3. Windows Settings → Printers & Scanners
4. Add network printer
5. In POS: Select appropriate printer type
6. Click **Test Print**

### Default Printer (Windows)

**Uses System Default:**
1. Print receipts using Windows default printer
2. Good for testing or temporary setup
3. In POS: Select "Default Printer"

---

## 📋 Paper Setup

### Thermal Paper (80mm)

**Loading Paper:**
1. Open printer cover
2. Insert paper roll (80mm width)
3. Close cover firmly
4. Printer auto-detects paper

**Recommended Paper:**
- Width: 80mm (3.15 inches)
- Length: 5m to 10m per roll
- Thermal (not ink required)
- From suppliers:
  - Amazon
  - Alibaba
  - Local office supply stores

**Paper Replacement:**
- Replace when running low
- Keep extra rolls in stock
- Thermal paper doesn't degrade quickly

### A4 Paper (For A4 Printer)

1. Load standard A4 paper
2. Ensure printer type set to "A4 Printer"
3. Receipts will print smaller
4. Good for records but not ideal for POS

---

## 🔧 Troubleshooting

### Scanner Not Recognized

| Problem | Solution |
|---------|----------|
| USB scanner not detected | Restart computer, try different USB port |
| Serial scanner COM port missing | Install USB-to-Serial drivers |
| Camera won't work | Allow browser camera access, check permissions |
| Barcode not scanning | Clean barcode, adjust scanner angle, test with different codes |

### Printer Not Working

| Problem | Solution |
|---------|----------|
| Printer offline | Check USB cable, restart printer |
| No paper | Load thermal paper 80mm width |
| Printing blank | Replace thermal paper, check heat settings |
| Wrong printer selected | Click 🖨️ Printer, verify printer type |
| Print queue stuck | Restart printer, clear print queue in Windows |

### POS Not Detecting Hardware

| Problem | Solution |
|---------|----------|
| Settings not saving | Enable browser localStorage, clear cache |
| Scanner test fails | Click Scanner button, run Test Scanner |
| Printer test fails | Click Printer button, run Test Print |
| No feedback on scan | Check browser has focus, try clicking page first |

---

## 📊 Performance Recommendations

### Optimal Setup:

✅ **Best Performance:**
- USB Barcode Scanner
- USB Thermal Receipt Printer (80mm)
- USB power for printer
- Dedicated computer or tablet
- Modern browser (Chrome, Edge, Firefox)

✅ **Speed Tips:**
- Use USB scanners (faster than serial)
- Thermal printer faster than inkjet
- Enable auto-print for efficiency
- Keep browser cache clear
- Restart browser daily

---

## 🛡️ Maintenance Schedule

### Daily:
- Check paper stock
- Test scan one product
- Test print receipt

### Weekly:
- Clean scanner glass/lens
- Clean thermal printer head with alcohol swab
- Check for paper jams
- Verify all settings still correct

### Monthly:
- Replace thermal paper rolls
- Update browser and drivers
- Test hardware thoroughly
- Backup settings (export if possible)

### Quarterly:
- Deep clean equipment
- Verify drivers up to date
- Test all scanner and printer functions
- Check for hardware wear

---

## 💾 Backup & Recovery

### Settings Backup:

**Manual:**
1. Click 📡 Scanner → Note settings
2. Click 🖨️ Printer → Note settings
3. Record in text file for recovery

**Browser:**
- Settings stored in localStorage
- Persist across sessions
- Clear browser cache carefully (may reset)

### Receipt Recovery:

1. Download receipts as needed
2. All receipts saved in transaction history (session)
3. No automatic backup (store in files as needed)

---

## 🌍 Regional Settings

### For Different Countries:

**Australia/Canada/UK:**
- Tax rate: Modify in checkout function
- Currency: Already uses $
- Barcode standards: UPC, EAN compatible

**Europe:**
- Tax rate: Set to local VAT (20% UK, 19% Germany, etc.)
- Currency: Change $ to €, £, etc. in display
- EAN-13 barcodes fully supported

**Asia/Others:**
- Support all barcode formats
- Customize currency symbol
- Adjust tax rate as needed

**Customization:**
- Edit app.js for tax rate
- Update CSS for currency symbol
- Modify receipt template for local format

---

## 📞 Manufacturer Support

### Popular Hardware:

| Device | Website |
|--------|---------|
| Epson Thermal | www.epson.com/support |
| Star Thermal | www.starmicronics.com |
| Honeywell Scanner | www.honeywell.com |
| Zebra Scanner | www.zebra.com |
| Brother Printer | www.brother.com |

---

## ⚡ Quick Start Commands

**Windows Device Manager:**
```powershell
devmgmt.msc
```

**Windows Printers:**
```powershell
control printers
```

**Identify COM Ports:**
```powershell
wmic logicaldisk list brief
```

---

**Last Updated: November 13, 2025**
**Version: 1.0**
