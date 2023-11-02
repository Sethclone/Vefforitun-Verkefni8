import { formatNumber } from './helpers.js';

export function createCartLine(product, quantity) {
  const cart = document.querySelector('.cart ~ table tbody');
  const cartLineElement = document.createElement('tr');
  cartLineElement.setAttribute('data-cart-product-id', product.id);

  const ProductName = document.createElement('td');
  ProductName.textContent = product.title;

  const productQuantity = document.createElement('td');
  productQuantity.textContent = quantity;

  const productPrice = document.createElement('td');
  const spanPrice = document.createElement('span');
  spanPrice.classList.add('price');
  spanPrice.textContent = formatNumber(product.price);
  productPrice.appendChild(spanPrice);

  const productTotal = document.createElement('td');
  const spanTotal = document.createElement('span');
  spanTotal.classList.add('price');
  spanTotal.textContent = formatNumber(product.price * quantity);
  productTotal.appendChild(spanTotal);

  const tdRemove = document.createElement('td');
  const removeForm = document.createElement('form');
  removeForm.classList.add('remove');
  removeForm.method = 'post';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Eyða';
  removeForm.appendChild(removeButton);
  
  tdRemove.appendChild(removeForm);


  cartLineElement.appendChild(ProductName);
  cartLineElement.appendChild(productQuantity);
  cartLineElement.appendChild(productPrice);
  cartLineElement.appendChild(productTotal);
  cartLineElement.appendChild(tdRemove);

  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}
