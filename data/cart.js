export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2

  },{
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 1
}];

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