const Basket = {
  basketRoute: 'http://localhost:3000/basket/customer',

  changingAmountOfProduct(userID, productID, direction) {
    let newAmount;
    if (direction === 'minusOne') {
      const amountElement = event.target.nextElementSibling;
      amountElement.value = (parseInt(amountElement.value, 10) - 1) < 1 ?
        1 :
        parseInt(amountElement.value, 10) - 1;
      newAmount = parseInt(amountElement.value, 10);
    } else {
      const amountElement = event.target.previousElementSibling;
      amountElement.value = parseInt(amountElement.value, 10) + 1;
      newAmount = parseInt(amountElement.value, 10);
    }
    this.recalculate();
    this.updateCustomerBasket(userID, productID, newAmount);
  },

  recalculate() {
    const orderAmountInputs = Array.from(document.querySelectorAll('input[name="orderedAmount"]'));
    let totalPrice = 0;
    orderAmountInputs.forEach(input =>
      totalPrice +=
      parseInt(input.parentElement.nextElementSibling.innerHTML.substr(1), 10) * input.value);
    document.querySelector('#totalPrice').innerHTML = `$${totalPrice}`;
  },

  updateCustomerBasket(userID, productID, amount) {
    // Get basket
    fetch(`${this.basketRoute}/${userID}`)
      .then(response => response.json())
      .then((customer) => {
        const basket = JSON.parse(customer.basket);
        basket[productID] = amount;
        customer.basket = JSON.stringify(basket);
        // Update basket
        fetch(`${this.basketRoute}/${userID}`, {
          method: 'PUT',
          body: JSON.stringify(customer),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        }).catch(err => location.href = (`${location.origin}/error`));
      }).catch(err => location.href = (`${location.origin}/error`));
  },

};