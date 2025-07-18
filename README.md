# 🚀 LP Calculator Suite

A comprehensive web application suite for DeFi liquidity providers, featuring advanced calculators and position tracking tools. Built with Vue 3, TypeScript, and Tailwind CSS for a modern, responsive experience.

## 🌐 Live Demo

Experience live at: [https://lp-calculator.pages.dev](https://lp-calculator.pages.dev)

## ✨ Features Overview

### 🎯 **Concentrated Liquidity Calculator (V3)**
Calculate precise token amounts for concentrated liquidity positions with custom price ranges.

### 🔄 **Classic Liquidity Calculator (V2)**
Simple 50/50 token ratio calculations for traditional liquidity pools.

### 📊 **APR Calculator**
Calculate Annual Percentage Rate (APR) for your liquidity pool investments using simple interest.

### 📈 **Position Tracker**
Comprehensive LP position management with real-time APR tracking and historical analytics.

---

## 🛠️ Detailed Features

### **Concentrated Liquidity Calculator**
- **Real-Time Calculation**: Instantly see required Token0 and Token1 amounts
- **Dynamic Price Range**: Set custom lower and upper price bounds
- **Price Difference Display**: Visual percentage differences from current price
- **Advanced Math**: Handles complex concentrated liquidity formulas
- **Input Validation**: Clear error messages for invalid ranges

### **Classic Liquidity Calculator**
- **Simple 50/50 Split**: Traditional liquidity pool calculations
- **USD-Based Input**: Enter total USD amount to split evenly
- **Token Price Integration**: Automatic conversion to token amounts
- **Instant Results**: Real-time calculation updates

### **APR Calculator**
- **Simple Interest Formula**: `(Total Fees / Initial Investment) × (365 / Days) × 100`
- **Date Range Selection**: Pick start and end dates for accurate calculations
- **Multiple Metrics**: APR, daily rate, monthly rate, and total return percentage
- **Time Period Display**: Shows investment duration in days and years

### **Position Tracker**
- **Position Management**: Create, track, and close LP positions
- **Real-Time APR**: Automatic APR calculation based on fee collections
- **Fee History**: Track all fee collections with timestamps
- **Status Management**: Active vs. closed positions with frozen calculations
- **Advanced Analytics**: Total fees, return percentage, days active, average daily fees
- **Data Persistence**: All data saved locally with localStorage

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or compatible package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Drarox/LP-Calculator.git
   cd LP-Calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

---

## 📖 Usage Guide

### **Concentrated Liquidity Calculator**
1. Enter your total USD investment amount
2. Set current market price between Token1 and Token0
3. Define your price range (lower and upper bounds)
4. Input current USD prices for both tokens
5. View calculated token amounts instantly

### **Classic Liquidity Calculator**
1. Enter total USD amount to deposit
2. Input current USD prices for both tokens
3. Get 50/50 split amounts automatically

### **APR Calculator**
1. Enter your initial investment amount
2. Input total fees collected
3. Select start and end dates
4. View comprehensive APR analytics

### **Position Tracker**
1. **Create Position**: Add name, investment amount, opening date, and optional external link
2. **Track Fees**: Add fee collections as they occur with timestamps
3. **Monitor Performance**: Watch real-time APR calculations
4. **Manage Lifecycle**: Close positions to freeze calculations or reopen as needed
5. **Review History**: Access complete historical performance data

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Drarox/LP-Calculator/blob/master/LICENSE) file for details.