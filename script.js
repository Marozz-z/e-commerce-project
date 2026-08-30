const $ = (selector) => document.querySelector(selector);
const cartDrawer = $('#cartDrawer');
const overlay = $('#overlay');
const cartItem = $('#cartItem');
let qty = 0;
let selectedProduct = { name: 'Form 6” Shorts', price: 52 };

function updateCart(change = 0) {
  qty = Math.max(0, qty + change);
  $('#cartCount').textContent = qty;
  $('#cartItemText').textContent = `(${qty})`;
  $('#quantity').textContent = qty;
  $('#subtotal').textContent = `$${qty * selectedProduct.price}`;
  cartItem.hidden = qty === 0;
  $('#cartEmpty').hidden = qty !== 0;
}
function openCart() { cartDrawer.classList.add('open'); overlay.classList.add('show'); cartDrawer.setAttribute('aria-hidden', 'false'); }
function closeCart() { cartDrawer.classList.remove('open'); overlay.classList.remove('show'); cartDrawer.setAttribute('aria-hidden', 'true'); }
function addProduct() { updateCart(1); $('#cartPrice').textContent = `$${selectedProduct.price}`; $('#toast').textContent = `${selectedProduct.name} added to your bag ✓`; $('#toast').classList.add('show'); setTimeout(() => $('#toast').classList.remove('show'), 2200); }

$('#cartButton').addEventListener('click', openCart);
$('.close-cart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
$('#addToCart').addEventListener('click', addProduct);
$('#mobileAdd').addEventListener('click', addProduct);
$('#increase').addEventListener('click', () => updateCart(1));
$('#decrease').addEventListener('click', () => updateCart(-1));
document.querySelectorAll('.quick-add').forEach((button) => button.addEventListener('click', (event) => {
  event.preventDefault();
  const item = button.closest('.product-image').dataset;
  selectedProduct = { name: item.product, price: Number(item.price) };
  $('#cartItem h3').textContent = item.product;
  $('#cartItem p').textContent = `${item.color} · M`;
  addProduct();
}));
document.querySelectorAll('.product-image[data-product]').forEach((card) => card.addEventListener('click', (event) => {
  if (event.target.closest('.quick-add')) return;
  const item = card.dataset;
  selectedProduct = { name: item.product, price: Number(item.price) };
  $('#pdpCategory').textContent = item.category;
  $('#pdpName').innerHTML = item.product.replace(' ', '<br /><em>') + '</em>';
  $('#pdpPrice').textContent = `$${item.price}`;
  $('#pdpDescription').textContent = item.description;
  $('#pdpColor').textContent = item.color;
  $('#pdpFit').textContent = item.fit;
  $('.primary-pdp-image').src = item.image;
  $('.primary-pdp-image').alt = item.product;
  $('#cartItem h3').textContent = item.product;
  $('#cartItem p').textContent = `${item.color} · M`;
  $('#addToCart').innerHTML = `Add to bag — $${item.price} <span>↗</span>`;
  $('.mobile-cart-bar span').innerHTML = `${item.product}<br /><b>$${item.price}</b>`;
  document.querySelectorAll('.product-image').forEach((product) => product.classList.remove('selected-product'));
  card.classList.add('selected-product');
}));
document.querySelectorAll('.size-options button:not(.sold-out)').forEach((button) => button.addEventListener('click', () => { document.querySelector('.size-options .selected').classList.remove('selected'); button.classList.add('selected'); }));
$('#sizeGuide').addEventListener('click', () => $('#sizeModal').showModal());
$('.modal-close').addEventListener('click', () => $('#sizeModal').close());
$('#notifyButton').addEventListener('click', () => { $('#notifyButton').textContent = 'We’ll let you know when XXL returns.'; });
$('.search-toggle').addEventListener('click', () => $('#searchPanel').classList.add('open'));
$('#searchPanel button').addEventListener('click', () => $('#searchPanel').classList.remove('open'));
$('#nextProduct').addEventListener('click', () => $('#productRail').scrollBy({ left: 350, behavior: 'smooth' }));
$('#prevProduct').addEventListener('click', () => $('#productRail').scrollBy({ left: -350, behavior: 'smooth' }));
$('#newsletterForm').addEventListener('submit', (event) => { event.preventDefault(); event.target.innerHTML = '<p class="newsletter-success">You’re in. Check your inbox for your 10% code.</p>'; });
$('#menuButton')?.addEventListener('click', () => { document.querySelector('.desktop-nav').classList.toggle('mobile-nav-open'); });

const megaMenuItems = {
  men: ['T-Shirts & Tops', 'Compressions', 'Tank Tops', 'Sweatpants', 'Shorts'],
  women: ['T-Shirts & Tops', 'Leggings', 'Sports Bras', 'Modest & Hijab', 'Shorts'],
  collections: ['Summer Drop', 'Winter Training', 'Rival', 'Accessories', 'Best Sellers'],
};
document.querySelectorAll('.mega-trigger').forEach((trigger) => trigger.addEventListener('click', () => {
  const key = trigger.dataset.menu;
  $('#megaPanel').innerHTML = `<div class="menu-inner"><div><h3>${key.toUpperCase()}</h3>${megaMenuItems[key].map((item) => `<a href="#shop">${item}</a>`).join('')}</div><div><h3>SHOP ${key.toUpperCase()}</h3><a href="#shop">New arrivals</a><a href="#shop">Best sellers</a><a href="#shop">Restocked</a></div><div><h3>DROP ALERTS</h3><a href="#shop">Limited releases</a><a href="#shop">Notify me</a></div></div>`;
  $('#megaPanel').classList.toggle('open');
  $('#notificationPanel').classList.remove('open');
}));
$('.notification-trigger')?.addEventListener('click', () => { $('#notificationPanel').classList.toggle('open'); $('#megaPanel').classList.remove('open'); });
$('.auth-trigger')?.addEventListener('click', () => { $('#authPanel').classList.add('open'); overlay.classList.add('show'); });
$('#authPanel button')?.addEventListener('click', () => { $('#authPanel').classList.remove('open'); overlay.classList.remove('show'); });
overlay.addEventListener('click', () => { $('#authPanel').classList.remove('open'); $('#megaPanel').classList.remove('open'); $('#notificationPanel').classList.remove('open'); });

document.querySelectorAll('.product-card').forEach((card, index) => {
  const product = card.querySelector('.product-image');
  const mainImage = product.querySelector('img');
  const hoverImage = mainImage.cloneNode(true);
  hoverImage.className = 'hover-view';
  hoverImage.alt = `${product.dataset.product} alternate view`;
  hoverImage.src = index % 2 ? mainImage.src.replace('q=85', 'q=80&sat=-35') : 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85';
  product.append(hoverImage);
  const rating = document.createElement('div');
  rating.className = 'card-rating';
  rating.innerHTML = `★★★★★ <span>${['4.8 (89)', '4.9 (64)', '4.9 (142)', '4.7 (35)'][index]}</span>`;
  card.querySelector('.product-meta > div').append(rating);
  const controls = document.createElement('div');
  controls.className = 'inline-card-controls';
  controls.innerHTML = '<div class="inline-sizes"><button>S</button><button class="selected">M</button><button>L</button><button>XL</button></div><button class="inline-add">Add to cart</button>';
  controls.querySelectorAll('.inline-sizes button').forEach((size) => size.addEventListener('click', () => { controls.querySelector('.selected').classList.remove('selected'); size.classList.add('selected'); }));
  controls.querySelector('.inline-add').addEventListener('click', () => { selectedProduct = { name: product.dataset.product, price: Number(product.dataset.price) }; addProduct(); });
  card.append(controls);
});
