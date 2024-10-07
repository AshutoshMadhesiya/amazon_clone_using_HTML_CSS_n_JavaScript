import { cart, removeFromCart, updateDeliveryOption, updateProductQuantity } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){

    let cartSummaryHTML='';

    cart.forEach((cartItem) => {

        const productId= cartItem.productId;
        let matchingProduct=getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption=getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days'); 
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML+=
        `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">
                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link js-update-quantity-link-${matchingProduct.id} " data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input type="number" max="1000" min="1" class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    <span class="save-quantity-link js-save-link js-save-quantity-link-${matchingProduct.id} link-primary" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                    ${deliveryOptionsHTML(productId,cartItem)}
                </div>
            </div>
        </div>`;

    });

    function deliveryOptionsHTML(productId,cartItem) {

        let HTML = '';
        deliveryOptions.forEach((deliveryOption) => {

            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

            const dateString =deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents===0? 'Free': `₹${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            HTML+=
            `<div class="delivery-option js-delivery-option" data-product-id='${productId}' data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked?'checked':''}
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>`
        });

        return HTML;
    }


    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click',() => {
            const productId=link.dataset.productId;
            
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

            renderPaymentSummary();

        });
    });

    document.querySelectorAll('.js-save-link').forEach((element) =>{
        element.addEventListener('click',() => {
            const productId=element.dataset.productId;
    
            const inputContainer = document.querySelector(`.js-quantity-input-${productId}`);
            let itemQuantity = inputContainer.value;
    
            updateProductQuantity(productId, itemQuantity);
    
            // Hide the input field
            inputContainer.classList.remove('is-visible');
    
            // Hide the Save button
            const saveContainer = document.querySelector(`.js-save-quantity-link-${productId}`);
            saveContainer.classList.remove('is-visible');
    
            // Show the Update button again
            const updateContainer = document.querySelector(`.js-update-quantity-link-${productId}`);
            updateContainer.classList.remove('is-editing-quantity');
    
            // Show the quantity label and update it with the new value
            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.classList.remove('is-hidden-quantity-label');
    
            // Update order and payment summaries
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    
    

    document.querySelectorAll('.js-update-link').forEach((element) =>{
        element.addEventListener('click',() => {
            const productId=element.dataset.productId;

            // Hide the Update button
            const updateContainer = document.querySelector(`.js-update-quantity-link-${productId}`);
            updateContainer.classList.add('is-editing-quantity');

            // Show the Save button
            const saveContainer = document.querySelector(`.js-save-quantity-link-${productId}`);
            saveContainer.classList.add('is-visible');

            // Show the input field
            const inputContainer = document.querySelector(`.js-quantity-input-${productId}`);
            inputContainer.classList.add('is-visible');
            inputContainer.value = parseInt(document.querySelector(`.js-quantity-label-${productId}`).innerText);

            const quantityContainer = document.querySelector(`.js-quantity-label-${productId}`);
            quantityContainer.classList.add('is-quantity-visible');
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) =>{
        element.addEventListener('click', () => {

            const {productId,deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    
}

