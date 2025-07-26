const cartItems=JSON.parse(localStorage.getItem('watchStoreCart')||'[]');
function saveCart(){localStorage.setItem('watchStoreCart',JSON.stringify(cartItems));}
function updateCartDisplay(){const c=document.querySelector('.cart-count');if(c){c.textContent=cartItems.reduce((s,i)=>s+i.quantity,0);}}
function addToCart(e){e.preventDefault();const card=e.currentTarget.closest('.product-card');if(!card)return;const id=card.dataset.productId||Date.now().toString();const name=card.querySelector('.product-title').textContent;const price=card.querySelector('.product-price').textContent;const image=card.querySelector('.product-image').src;const existing=cartItems.find(i=>i.id===id);if(existing){existing.quantity+=1;}else{cartItems.push({id,name,price,image,quantity:1});}saveCart();updateCartDisplay();alert(`${name} added to cart`);}
function updateCurrentTime(){document.querySelectorAll('.current-time').forEach(el=>{el.textContent=new Date().toLocaleString();});}
function isValidEmail(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);} 
function subscribeNewsletter(email){if(!isValidEmail(email)){alert('Enter valid email');return;}alert('Thank you for subscribing');}
function toggleMobileMenu(){const nav=document.querySelector('.nav-links');if(nav){nav.classList.toggle('mobile-active');}}
function noop(){}
window.showErrorPopup=noop;window.showSuccessPopup=noop;
document.addEventListener('DOMContentLoaded',()=>{updateCurrentTime();setInterval(updateCurrentTime,1000);updateCartDisplay();document.querySelectorAll('.add-to-cart').forEach(b=>b.addEventListener('click',addToCart));const navToggle=document.querySelector('.nav-toggle');if(navToggle){navToggle.addEventListener('click',toggleMobileMenu);}});