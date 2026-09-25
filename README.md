# 🛒 GreenCart - Fresh Groceries & Organic Produce Platform

A modern, responsive e-commerce web application for ordering farm-fresh groceries, organic vegetables, fruits, dairy, and household essentials with real-time cart management and order tracking.

![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modern_Flex_&_Grid-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Icons-Lucide_React-F56565?style=for-the-badge)

---

## ✨ Features

- **🥦 Interactive Category Catalog:** Browse fresh groceries across multiple categories including Fresh Vegetables, Fruits, Farm Dairy, Whole Grains, Beverages, Snacks, and Household essentials.
- **⚡ Today's Flash Offers:** Curated daily deals and discounts with countdown savings and special bundle offers.
- **🛍️ Dynamic Cart Drawer:** 
  - Slide-out cart interface.
  - Real-time quantity adjustments (increment, decrement, remove).
  - Instant subtotal, delivery fee, and grand total calculations.
- **🍲 "Cook This Meal" Bundles:** One-click recipe bundles that let customers add all ingredients for a specific recipe directly to their cart.
- **📍 Location Selector:** Interactive delivery address and pincode modal for customized localized availability.
- **🚚 Live Delivery Tracker:** Real-time order progress modal showing order milestones (Packed, Out for Delivery, Arriving) with live ETA.
- **💖 Wishlist System:** Save favorite products for quick repurchase.
- **👤 Customer Account Modal:** Profile details, past order summaries, and saved delivery addresses.
- **📱 Fully Responsive:** Optimized for desktop, tablet, and mobile shopping experiences.

---

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Modular CSS3 with CSS variables, Flexbox, and CSS Grid
- **Build Tool:** Create React App (`react-scripts`)

---

## 📂 Project Structure

```text
jtp-reactapp/
├── public/
│   ├── index.html              # HTML entry point
│   └── manifest.json
├── src/
│   ├── assets/                 # Product images, category banners & SVGs
│   ├── components/
│   │   ├── AccountModal.js      # User profile & saved addresses
│   │   ├── BuyAgainSection.js   # Repeat order recommendations
│   │   ├── CartDrawer.js        # Slide-out shopping cart
│   │   ├── CategoryCard.js      # Individual category display
│   │   ├── CategorySection.js   # Category grid
│   │   ├── CookThisMealSection.js # Recipe meal bundles
│   │   ├── DeliveryTrackerModal.js # Live tracking & ETA
│   │   ├── Footer.js            # Links & newsletter
│   │   ├── FreshTodaySection.js # Featured fresh harvest items
│   │   ├── Hero.js              # Banner & promo header
│   │   ├── LocationModal.js     # Address & pincode picker
│   │   ├── Navbar.js            # Search, location, cart badge
│   │   ├── OfferSection.js      # Promotional discounts
│   │   ├── ProductCard.js       # Product listing with Add-to-cart
│   │   ├── ProductSection.js    # Filterable product grid
│   │   ├── WhyChooseUs.js       # Trust badges & perks
│   │   └── WishlistModal.js     # Saved items drawer
│   ├── data/
│   │   ├── categoriesCatalogData.js # Categories data
│   │   └── productsData.js          # Products, offers, and recipe data
│   ├── pages/
│   │   ├── HomePage.js          # Main landing storefront
│   │   └── CategoryPage.js      # Dedicated category browser
│   ├── App.js                   # State management & routing
│   ├── App.css                  # Global styles & layout
│   └── index.js                 # React DOM mount
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shyamganesh956-cpu/greencart.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd greencart
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application!

---

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

This compiles the static files into the `build/` folder, ready for deployment to Vercel, Netlify, or GitHub Pages.

---

## 👨‍💻 Author

**Shyam Sundar**
- GitHub: [@shyamganesh956-cpu](https://github.com/shyamganesh956-cpu)
