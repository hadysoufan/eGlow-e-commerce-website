import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {/* Product */}
        <div className="header-block">
          <span>Product</span>
        </div>

        {/* Description */}
        <div className="header-block">
          <span>Description</span>
        </div>

        {/* Quantity */}
        <div className="header-block">
          <span>Quantity</span>
        </div>

        {/* Price */}
        <div className="header-block">
          <span>Price</span>
        </div>

        {/* Remove */}
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map(cartItem => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
