function changingAmountOfProduct(userID, productID, direction) {
  let newAmount;
  if (direction === 'minusOne') {
    event.target.nextElementSibling.value = (parseInt(event.target.nextElementSibling.value, 10) - 1) < 1 ? 1 : parseInt(event.target.nextElementSibling.value, 10) - 1;
    newAmount = parseInt(event.target.nextElementSibling.value, 10);
  } else {
    event.target.previousElementSibling.value = parseInt(event.target.previousElementSibling.value, 10) + 1;
    newAmount = parseInt(event.target.previousElementSibling.value, 10);
  }
  fetch(`http://localhost:3000/basket/customer/${userID}`)
    .then(response => response.json())
    .then((customer) => {
      const basket = JSON.parse(customer.basket);
      basket[productID] = newAmount;
      customer.basket = JSON.stringify(basket);
      fetch(`http://localhost:3000/basket/customer/${userID}`, {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(response => this.recalculate());
    });
}

function recalculate() {
  const orderAmountInputs = Array.from(document.querySelectorAll('input[name="orderedAmount"]'));
  let totalPrice = 0;
  orderAmountInputs.forEach(input => totalPrice += parseInt(input.parentElement.nextElementSibling.innerHTML.substr(1), 10) * input.value);
  document.querySelector('#totalPrice').innerHTML = `$${totalPrice}`;
}
