export let cart;

loadFromStorage();

function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity+=1
    } else{
      cart.push({
        productId,
        quantity : 1,
        deliveryOptionId :'1'
      });
    };
    saveToStorage();
};

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem)
    };
  });

  cart = newCart;
  saveToStorage();
};

export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity = newQuantity;
  }
  
  saveToStorage();
};

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
};



export function loadCart(fun){
  const xhr = new XMLHttpRequest();

xhr.addEventListener('load', ()=>{
      fun();
});
  xhr.open('Get','https://supersimplebackend.dev/cart');
  xhr.send();
}