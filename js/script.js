// JavaScript for Chetana's Watch Store
// Author: Chetana Malla
// Course: Introduction to Information Systems

// Global variables
let cartItems = [];
let currentUser = null;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    loadCartFromStorage();
});

// Initialize website functionality
function initializeWebsite() {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
    
    // Initialize current time display
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Show welcome popup on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        setTimeout(showWelcomePopup, 2000);
    }
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', handleProductHover);
        card.addEventListener('mouseleave', handleProductLeave);
    });
    
    // Navigation menu mobile toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Form validation and submission handler
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    let isValid = true;
    let errorMessages = [];
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            errorMessages.push(`${field.name || field.id} is required`);
            field.style.borderColor = '#e74c3c';
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            isValid = false;
            errorMessages.push('Please enter a valid email address');
            field.style.borderColor = '#e74c3c';
        }
    });
    
    // Phone validation
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
            isValid = false;
            errorMessages.push('Please enter a valid phone number');
            field.style.borderColor = '#e74c3c';
        }
    });
    
    if (isValid) {
        showSuccessPopup('Form submitted successfully!');
        form.reset();
        
        // Simulate form processing
        setTimeout(() => {
            if (form.id === 'contact-form') {
                window.location.href = 'pages/thankyou.html';
            }
        }, 1500);
    } else {
        showErrorPopup(errorMessages.join('\n'));
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation function
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Product hover effects
function handleProductHover(event) {
    const card = event.currentTarget;
    const image = card.querySelector('.product-image');
    if (image) {
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.3s ease';
    }
}

function handleProductLeave(event) {
    const card = event.currentTarget;
    const image = card.querySelector('.product-image');
    if (image) {
        image.style.transform = 'scale(1)';
    }
}

// Shopping cart functionality
function addToCart(event) {
    event.preventDefault();
    
    const button = event.currentTarget;
    const productCard = button.closest('.product-card');
    const productId = productCard.dataset.productId || Date.now().toString();
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-image').src;
    
    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };
    
    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(cartItem);
    }
    
    saveCartToStorage();
    updateCartDisplay();
    showSuccessPopup(`${productName} added to cart!`);
}

// Cart storage functions
function saveCartToStorage() {
    localStorage.setItem('watchStoreCart', JSON.stringify(cartItems));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('watchStoreCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Popup functions
function showWelcomePopup() {
    const popup = createPopup(
        'Welcome to Chetana\'s Watch Store!',
        'Discover our exclusive collection of luxury, vintage, and modern watches. Quality timepieces for every occasion.',
        'success'
    );
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 5000);
}

function showSuccessPopup(message) {
    const popup = createPopup('Success!', message, 'success');
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

function showErrorPopup(message) {
    const popup = createPopup('Error!', message, 'error');
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 4000);
}

function createPopup(title, message, type) {
    const popup = document.createElement('div');
    popup.className = `popup popup-${type}`;
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    popup.innerHTML = `
        <h4 style="margin: 0 0 10px 0; font-size: 1.1rem;">${title}</h4>
        <p style="margin: 0; font-size: 0.9rem;">${message}</p>
        <button onclick="this.parentElement.remove()" style="
            position: absolute;
            top: 5px;
            right: 10px;
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
        ">&times;</button>
    `;
    
    return popup;
}

// Dynamic content updates
function updateCurrentTime() {
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(element => {
        const now = new Date();
        element.textContent = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        showErrorPopup('Please enter a search term');
        return;
    }
    
    // Simulate search results
    const searchResults = [
        'Luxury Rolex Collection',
        'Vintage Omega Watches',
        'Modern Smartwatches',
        'Sports Digital Watches'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    if (searchResults.length > 0) {
        showSuccessPopup(`Found ${searchResults.length} results for "${query}"`);
    } else {
        showErrorPopup(`No results found for "${query}"`);
    }
}

// Newsletter subscription
function subscribeNewsletter(email) {
    if (!isValidEmail(email)) {
        showErrorPopup('Please enter a valid email address');
        return;
    }
    
    // Simulate subscription
    setTimeout(() => {
        showSuccessPopup('Thank you for subscribing to our newsletter!');
    }, 1000);
}

// Product comparison functionality
function compareProducts(productIds) {
    if (productIds.length < 2) {
        showErrorPopup('Please select at least 2 products to compare');
        return;
    }
    
    showSuccessPopup(`Comparing ${productIds.length} products...`);
    // Redirect to comparison page
    setTimeout(() => {
        window.location.href = `pages/compare.html?products=${productIds.join(',')}`;
    }, 1500);
}

// Price filter functionality
function filterByPrice(minPrice, maxPrice) {
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const priceElement = card.querySelector('.product-price');
        if (priceElement) {
            const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
            
            if (price >= minPrice && price <= maxPrice) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        }
    });
    
    showSuccessPopup(`Showing ${visibleCount} products in price range $${minPrice} - $${maxPrice}`);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .nav-links.mobile-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #2c3e50;
        padding: 1rem;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .nav-toggle {
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
`;
document.head.appendChild(style);

