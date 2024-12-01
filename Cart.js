
let cart = [];


const cartQuantityEl = document.querySelector('.cart span.quantity');
const cartModal = document.querySelector('.cart-modal');
const cartIcon = document.querySelector('.cart');


document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);


        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCartDisplay();
        updateCartQuantity();
    });
});


function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-modal .cart-items');
    const totalPriceEl = document.querySelector('.cart-modal .total-price');


    cartItemsContainer.innerHTML = '';

 
    let total = 0;

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;


    document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            cart = cart.filter((item) => item.id !== itemId);
            updateCartDisplay();
            updateCartQuantity();
        });
    });
}


function updateCartQuantity() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartQuantityEl.textContent = totalQuantity;
}

cartIcon.addEventListener('click', () => {
    cartModal.classList.toggle('visible');
});





const productFilter = document.getElementById('product-filter');
const productContainer = document.querySelector('.products');
productFilter.addEventListener('change', function() {
    const selectedCategory = productFilter.value;
    filterProducts(selectedCategory);
});
function filterProducts(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            product.style.display = 'block'; 
        } else {
            product.style.display = 'none';
        }
    });
}

filterProducts('all');


function checkout() {
    if (cart.length === 0) {
      alert("You don't have any products selected!");
    } else {
 
      window.location.href = 'checkout.html'; 
    }
  }


  

  document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', performSearch);
});

let timeout;
function performSearch() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productCategory = product.dataset.category.toLowerCase();

           
            if (productName.includes(searchQuery) || productCategory.includes(searchQuery)) {
                product.style.display = 'block';  
            } else {
                product.style.display = 'none'; 
            }
        });
    }, 300); 
}



