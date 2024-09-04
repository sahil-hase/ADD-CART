
const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const products = document.querySelectorAll('.product');


let cartArray = [];


function updateCartTotal() {
  const total = cartArray.reduce((acc, item) => acc + item.price, 0);
  cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}


function addToCart(productId) {
  const product = products[productId - 1];
  const productName = product.querySelector('.product-name').textContent;
  const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));
  const productImage = product.querySelector('.product-image').src;

  const existingItem = cartArray.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartArray.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
      image: productImage
    });
  }

  const cartHtml = cartArray.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="product-image">
      <div class="product-info">
        <h2 class="product-name">${item.name}</h2>
        <p class="product-price">$${item.price.toFixed(2)}</p>
        <p class="product-quantity">Quantity: ${item.quantity}</p>
      </div>
      <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
    </div>
  `).join('');
  cartItems.innerHTML = cartHtml;

  updateCartTotal();
}

function removeFromCart(productId) {
  const index = cartArray.findIndex(item => item.id === productId);
  if (index !== -1) {
    cartArray.splice(index, 1);
  }

  const cartHtml = cartArray.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="product-image">
      <div class="product-info">
        <h2 class="product-name">${item.name}</h2>
        <p class="product-price">$${item.price.toFixed(2)}</p>
        <p class="product-quantity">Quantity: ${item.quantity}</p>
      </div>
      <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
    </div>
  `).join('');
  cartItems.innerHTML = cartHtml;

  updateCartTotal();
}

products.forEach(product => {
  const addToCartBtn = product.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    const productId = parseInt(addToCartBtn.dataset.productId);
    addToCart(productId);
  });
});

cartItems.addEventListener('click', event => {
  if (event.target.classList.contains('remove-from-cart-btn')) {
    const productId = parseInt(event.target.dataset.productId);
    removeFromCart(productId);
  }
});