document.addEventListener('DOMContentLoaded', function(){
    setupEventListeners();
    loadCartFromStorage();
});

function setupEventListeners(){
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button =>{
        button.addEventListener('click', addToCart);
    });

    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button =>{
        button.addEventListener('click', viewProductDetails);
    });
}

function addToCart(event){
    event.preventDefault();
    
    const button = event.currentTarget;
    const productCard = button.closest('.product-card');
    const productId = productCard.dataset.productId || Date.now().toString();
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-image').src;
    
    const cartItem ={
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };
    
    let cartItems = JSON.parse(localStorage.getItem('watchStoreCart')) || [];

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem){
        existingItem.quantity += 1;
    }else{
        cartItems.push(cartItem);
    }
    
    localStorage.setItem('watchStoreCart', JSON.stringify(cartItems));
    alert(`${productName} added to cart!`);
    window.location.href = 'cart.html';
}

function viewProductDetails(event){
    event.preventDefault();
    const button = event.currentTarget;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productDescription = productCard.querySelector('p:not(.product-price)').textContent;

    alert(`Product: ${productName}\nPrice: ${productPrice}\nDescription: ${productDescription}`);
}

function loadCartFromStorage(){
    const savedCart = localStorage.getItem('watchStoreCart');
    if (savedCart){
        const cartItems = JSON.parse(savedCart);
        updateCartDisplay(cartItems);
    }
}

function updateCartDisplay(cartItems){
    const cartCount = document.querySelector('.cart-count');
    if (cartCount){
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}