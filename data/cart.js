export const cart = [];

export function addToCart(productId){
    let flag=true;
      cart.forEach((item) =>{
        if(item.productId===productId)
        {
          item.quantity++;
          flag=false;
        }
      });
      if(flag)
      cart.push({
        productId: productId,
        quantity: 1
      });
  }