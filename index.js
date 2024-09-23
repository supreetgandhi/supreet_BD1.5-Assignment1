const express = require('express');
const { resolve } = require('path');
const { cors } = require('cors');

const app = express();
const port = 3010;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.use(express.static('static'));

function getTotalCartPrice(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}

function getMembershipDiscount(cartTotal, isMember) {
  if (isMember) return cartTotal - cartTotal * (10 / 100);
  else return cartTotal;
}

function calculateTax(cartTotal) {
  return cartTotal * (5 / 100);
}

function calculateDeliveryDays(shippingMethod, distance) {
  let days;
  if (shippingMethod.toLocaleLowerCase() === 'standard') {
    days = distance / 50;
  } else if (shippingMethod.toLocaleLowerCase() === 'express') {
    days = distance / 100;
  }
  return days.toString();
}

function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * 2;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(getTotalCartPrice(newItemPrice, cartTotal).toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = parseFloat(req.query.isMember);

  res.send(getMembershipDiscount(cartTotal, isMember).toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateDeliveryDays(shippingMethod, distance).toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(calculateShippingCost(weight, distance).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
