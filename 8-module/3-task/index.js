export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if (typeof product == "object" && product != null) {
      let cartItem = {
        product: product,
        count: 1
      };
  
      let flag = true;
      
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product === cartItem.product) {
          this.cartItems[i].count += 1;        
          flag = false;
        }
      }
  
      if (flag) {
        this.cartItems.push(cartItem);      
      }       
  
      this.onProductUpdate(this.cartItems);
      console.log(this.cartItems);
      console.log(this.getTotalPrice());
      return this.cartItems;
    }
    
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == productId) {
        this.cartItems[i].count += amount;        
      }
      if (this.cartItems[i].count < 1) {
        if (this.cartItems.length === 1) {this.cartItems = [];
        } else {this.cartItems = this.cartItems.splice(i, 1);
        } break;
      }              
    }        
    this.onProductUpdate(this.cartItems);
    return this.cartItems;
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalCount += this.cartItems[i].count;
    }    
    return totalCount; 
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {      
      totalPrice += this.cartItems[i].product.price * this.cartItems[i].count;
    }   
    this.onProductUpdate(this.cartItems); 
    return totalPrice; 
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

