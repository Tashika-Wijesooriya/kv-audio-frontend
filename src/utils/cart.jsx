  export function loadCart() {
  let cart = localStorage.getItem("cart");

  if (cart == null) {
    cart = {
      orderedItems: [],
      days: 1,
      startingDate: formatDate(new Date()),
      endingDate: formatDate(new Date()),
    };

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
    return cart;
  }

  cart = JSON.parse(cart);
  return cart;
}

export function addToCart(key, qty) {
  const cart = loadCart();

  let found = false;

  for (let i = 0; i < cart.orderedItems.length; i++) {
    if (cart.orderedItems[i].key === key) {
      cart.orderedItems[i].qty += qty;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.orderedItems.push({ key, qty });
  }
  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
}

export function removeFromCart(key , qty) {
  const cart = loadCart();

  const newCart = cart.orderedItems.filter((item) => item.key !== key);
  cart.orderedItems = newCart;
  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);

    cart.orderedItems = cart.orderedItems.filter((item) => item.key !== key);
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
