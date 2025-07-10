# Liquidity Pool Calculator

A simple and intuitive web application to calculate the required token amounts for a concentrated liquidity position on a decentralized exchange (DEX). This tool is designed for DeFi users who need to determine the precise ratio of two tokens to deposit into a liquidity pool based on a specified price range.

## Live Demo

Experience live at: [https://lp-calculator.pages.dev](https://lp-calculator.pages.dev)

## Features

- **Real-Time Calculation**: Instantly see the required amounts of Token0 and Token1 as you adjust the input parameters.
- **Dynamic Price Range**: Set the total USD to deposit, the current market price, and your desired lower and upper price bounds.
- **Price Difference Percentage**: Automatically displays the percentage difference between your price bounds and the current price, helping you visualize your range.
- **Input Validation**: Provides clear error messages for invalid inputs, such as negative numbers or an incorrect price range.
- **Modern UI**: A clean, dark-themed, and responsive interface built with Tailwind CSS.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Drarox/LP-Calculator.git
    cd LP-Calculator
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

4.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## Usage

Once the application is running, simply fill in the following fields:

- **Total USD to Deposit**: The total value in USD you wish to provide as liquidity.
- **Current Price**: The current exchange rate between Token1 and Token0.
- **Lower Price Bound**: The minimum price for your concentrated liquidity range.
- **Upper Price Bound**: The maximum price for your concentrated liquidity range.
- **Price of Token0 (in USD)**: The current price of one unit of Token0.
- **Price of Token1 (in USD)**: The current price of one unit of Token1.

The required amounts for Token0 and Token1 will be calculated and displayed automatically in the "Required Token Amounts" section.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Drarox/LP-Calculator/blob/master/LICENSE) file for details.
