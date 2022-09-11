import { createContext, useState, useEffect } from 'react';

// add item
const addCartItem = (cartItems, productToAdd) => {
  //Find if cart item contains product to add
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // Else return new array with modified cart item / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// remove item
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  // ckeck if quantity == 1, it true, remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // return back cart items with matching cart item with reduced quantity
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// clear item
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price ,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // function to add products to the cart
  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // function to remove product from the cart
  const removeItemToCart = cartItemToRemove => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  // function to clear product from the cart
  const clearItemFromCart = cartItemToClear => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
