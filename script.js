document.addEventListener("DOMContentLoaded", () => {
    // Select only the inner card-body elements that contain the product details
    const products = document.querySelectorAll(".card > .card-body");
    
    function updateTotalPrice() {
        let total = 0; 
        // Get fresh list of products currently in the cart
        const currentProducts = document.querySelectorAll(".card > .card-body");
        currentProducts.forEach(product => {
            const quantity = parseInt(product.querySelector(".quantity").textContent);
            // Remove the $ sign and spaces from price text
            const priceText = product.querySelector(".unit-price").textContent;
            const unitPrice = parseInt(priceText.replace("$", "").trim());
            total += quantity * unitPrice;
        });
        document.querySelector(".total").textContent = total + " $";
    }
    
    products.forEach(product => {
        const quantityElement = product.querySelector(".quantity");
        const plusButton = product.querySelector(".fa-plus-circle");
        const minusButton = product.querySelector(".fa-minus-circle");
        const deleteButton = product.querySelector(".fa-trash-alt");
        const likeButton = product.querySelector(".fa-heart");
        const unitPriceElement = product.querySelector(".unit-price");
        
        // Increase quantity
        plusButton.addEventListener("click", (event) => {
            let quantity = parseInt(quantityElement.textContent);
            quantity += 1;
            quantityElement.textContent = quantity;
            updateTotalPrice();
            event.stopPropagation();
        });

        // Decrease quantity
        minusButton.addEventListener("click", (event) => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity -= 1;
                quantityElement.textContent = quantity;
                updateTotalPrice();
            }
            event.stopPropagation();
        });

        // Delete item (updated code)
        deleteButton.addEventListener("click", (event) => {
            // Find and remove the entire card element (parent of parent)
            const cardToRemove = product.closest(".card").parentElement;
            cardToRemove.remove();
            // Update total price after removing item
            updateTotalPrice();
            event.stopPropagation();
        });

        // Like item
        likeButton.addEventListener("click", (event) => {
            // Toggle between red and black color for the heart
            if (likeButton.style.color === "red") {
                likeButton.style.color = "black";
            } else {
                likeButton.style.color = "red";
            }
            event.stopPropagation();
        });
    });
});