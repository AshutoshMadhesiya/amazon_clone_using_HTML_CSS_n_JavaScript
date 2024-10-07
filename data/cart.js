export let cart = JSON.parse(localStorage.getItem(`cart`));

if(!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  
    },{
      productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      quantity: 1,
      deliveryOptionId: '2'
  }];
}

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