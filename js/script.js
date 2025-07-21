document.addEventListener('DOMContentLoaded', function() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId;
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image').src;
            const productDescription = productCard.querySelector('p:not(.product-price)').textContent;

            const url = `product-details.html?id=${encodeURIComponent(productId)}&name=${encodeURIComponent(productName)}&price=${encodeURIComponent(productPrice)}&image=${encodeURIComponent(productImage)}&description=${encodeURIComponent(productDescription)}`;
            window.location.href = url;
        });
    });
});