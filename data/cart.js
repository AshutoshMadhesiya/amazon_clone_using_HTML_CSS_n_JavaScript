export let cart = JSON.parse(localStorage.getItem(`cart`));

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function updateProductQuantity(productId,itemQuantity){
  if(itemQuantity>=1&&itemQuantity<=100)
  {
    cart.forEach((item) =>{
      if(item.productId===productId){
        item.quantity=Number(itemQuantity);
      }
    });
    saveToStorage();
  }
}

export function addToCart(productId,quantityToAdd){
    let flag=true;
      cart.forEach((item) =>{
        if(item.productId===productId)
        {
          item.quantity+=quantityToAdd;
          flag=false;
        }
      });
      if(flag)
      cart.push({
        productId: productId,
        quantity: Number(quantityToAdd),
        deliveryOptionId: '1'
      });
      saveToStorage();
  }

  export function removeFromCart(productId){
    const newCart=[];

    cart.forEach((cartItem) => {
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });

    cart=newCart;
    saveToStorage();
  }

  export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
      if(productId===cartItem.productId){
        matchingItem=cartItem;
      }
    });

    matchingItem.deliveryOptionId=deliveryOptionId;

    saveToStorage();

  }