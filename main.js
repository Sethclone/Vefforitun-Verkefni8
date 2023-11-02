import { createCartLine, showCartContent } from './lib/ui.js';
import { formatNumber } from './lib/helpers.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

function updateCartTotal() {
  const cartTableBody = document.querySelector('.cart ~ table tbody');
  const cartTotalPriceElement = document.querySelector('.cart ~ table tfoot .price');

  let total = 0;

  const cartRows = Array.from(cartTableBody.querySelectorAll('tr'));

  for (const row of cartRows) {
    const rowFields = row.querySelectorAll('td');
    const priceText = rowFields[3].textContent.replace(/[\.kr\-]/g, ''); // Remove dots, 'kr', and '-'
    const rowPrice = Number(priceText);
    total += rowPrice;
  }

  cartTotalPriceElement.textContent = formatNumber(total);
}

/** Bæta vöru í körfu */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cart = document.querySelector('.cart ~ table tbody');
  

  if (!cart) {
    console.warn('fann ekki .cart');
    return;
  }
  const cartRows = Array.from(cart.querySelectorAll('tr'));
  const productId = Number(product.id);
  
  for (const row of cartRows) {
    const rowProductId = Number(row.dataset.cartProductId);
  
    if (rowProductId === productId) {
      const fields = row.querySelectorAll('td');
  

      const currentQuantity = Number(fields[1].textContent);
      fields[1].textContent = currentQuantity + quantity;
  

      const currentPriceText = fields[3].textContent;
      const currentPrice = Number(currentPriceText.replace(/[\.kr\-]/g, ''));
      const totalPrice = currentPrice + product.price * quantity;
      fields[3].textContent = formatNumber(totalPrice);
  
      updateCartTotal();
      return;
    }
  }
  
  const cartLine = createCartLine(product, quantity);
  cart.appendChild(cartLine);
  // Sýna efni körfu
  showCartContent(true);
  updateCartTotal();
  
  const removeForms = Array.from(document.querySelectorAll('.remove'));

  // Attach a submit event listener to each form
  for (const form of removeForms) {
    form.addEventListener('submit', removeHandler);
  }

}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr')

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  const quantity = parent.querySelector('input').valueAsNumber

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

function removeHandler(event) {
  event.preventDefault();

  const parent = event.target.closest('tr');
  parent.remove();

  updateCartTotal();

  const cart = document.querySelector('.cart ~ table tbody');
  if (cart.children.length < 1) {
    showCartContent(false);
  }
}


// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun
const cartForm = document.querySelector('.cart ~ form');


cartForm.addEventListener('submit', function(event) {
  event.preventDefault();

  document.querySelector('.products').classList.add('hidden');
  document.querySelector('.cart').closest('section').classList.add('hidden');

  document.querySelector('.receipt').classList.remove('hidden');
});