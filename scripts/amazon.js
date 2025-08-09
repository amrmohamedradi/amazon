import{cart,addToCart} from '../data/cart.js';
import{products,loadProducts} from '../data/products.js';
import{formatCurrency} from './utils/money.js';


loadProducts(renderProductHTML);


function renderProductHTML(){
    let productHTML = '';

    products.forEach((product) => {
      productHTML += `
            <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>


              ${product.extraInfoHTML()}

              <div class="product-spacer"></div>

              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary js-add-to-card"
              data-product-id = "${product.id}">
                Add to Cart
              </button>
            </div>
    `;

    });

    document.querySelector('.js-product-grid').innerHTML = productHTML


    function updateCartQuantity(){
        let cartQuantity=0;
        cart.forEach((cartItem)=>{
          cartQuantity+=cartItem.quantity
        });
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }


    document.querySelectorAll('.js-add-to-card').forEach((button)=>{
      button.addEventListener('click',()=> {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();

        const container = button.closest('.product-container');
        const addedEl = container && container.querySelector('.added-to-cart');
        if (addedEl) {
          if (button.dataset.addedTimeoutId) {
            clearTimeout(Number(button.dataset.addedTimeoutId));
          }
          addedEl.style.opacity = '1';
          const timeoutId = setTimeout(() => {
            addedEl.style.opacity = '0';
            button.dataset.addedTimeoutId = '';
          }, 2000);
          button.dataset.addedTimeoutId = String(timeoutId);
        }
      });
    });
}