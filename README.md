# Technaija Admin Dashboard

This is the administrative interface for Technaija, an e-commerce platform. It provides powerful tools for data visualization and product management, enabling efficient oversight of the e-commerce operations.

## Features

### Data Visualization
- **Revenue Analytics**: View and analyze revenue data
- **Profit Tracking**: Monitor profit margins and trends
- **Order Statistics**: Track order volumes and patterns
- **Customizable Charts**: Visualize data using various chart types
- **Time Frame Filtering**: Filter data based on different time periods

### Product Management
- **Product Creation**: Add new products to the inventory
- **Product Editing**: Update existing product information
- **Product Deletion**: Remove products from the catalog

### Coupon Management
- **Coupon Creation**: Generate new discount coupons
- **Coupon Editing**: Modify existing coupon details
- **Coupon Deletion**: Remove outdated or unused coupons

## Tech Stack
- **Frontend**: Next.js, TypeScript, MongoDB, Chart.js
- **Backend**: Next.js Server Actions
- **Database**: MongoDB
- **Charting Library**: Chart.js

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/technaija-admin.git
```
2. Install dependencies
```bash 
cd technaija
npm install
```
3. Set up environment variables
- Create a `.env.local` file in the root directory
- Add necessary environment variables (MongoDB URI, Clerk secret, Paystack API key, etc.)
4. Run the development server
```bash
npm run dev
```
5. Open http://localhost:3000 in your browser to see the application
