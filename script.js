// Listen for 'More' button click to show dropdown
document.addEventListener('DOMContentLoaded', () => {
  const moreBtn = document.querySelector('.more-btn');
  const dropdown = document.querySelector('.dropdown');

  moreBtn.addEventListener('click', () => {
    // Toggle the 'show' class on dropdown, triggering animation
    dropdown.classList.toggle('show'); 
  });

  // Close the dropdown if clicked outside of it
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !moreBtn.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
});
// Fetch the current order from localStorage
let currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || { cart: [] };

// Ensure order items and price are being rendered
const orderItemsContainer = document.getElementById('order-items');
const totalPriceElement = document.getElementById('total-price');

let total = 0;

if (currentOrder.cart.length === 0) {
  orderItemsContainer.innerHTML = "<p>No items in your order.</p>";
} else {
  // Loop through the items in the cart and display them
  currentOrder.cart.forEach(item => {
    if (item.price && item.quantity > 0) { // Check for valid price and quantity
      const itemTotal = item.price * item.quantity; // Calculate total for each item
      total += itemTotal;

      // Create an element for each cart item
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>Quantity: ${item.quantity}</span>
        <span>Price: $${itemTotal.toFixed(2)}</span>
      `;
      orderItemsContainer.appendChild(cartItem); // Append to the order container
    }
  });

  // Display the total price
  totalPriceElement.innerText = `Total Price: $${total.toFixed(2)}`;
}
