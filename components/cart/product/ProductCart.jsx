import styles from "./styles.module.scss";
import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/redux/cartSlice";

function ProductCart({ product, selectedItems, setSelectedItems }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const { cart } = useSelector((state) => ({ ...state }));

  const handleUpdateQty = (type) => {
    const newQty = type === "plus" ? product.qty + 1 : product.qty - 1;
    let newCart = cart.cartItems.map((item) => {
      if (item._uid === product._uid) {
        return {
          ...item,
          qty: newQty,
        };
      }
      return item;
    });

    // Update the quantity to calculate the price for checkout section
    if (selected) {
      let newItems = [...selectedItems];
      newItems = selectedItems.map((item) => {
        if (item._uid === product._uid) {
          return {
            ...item,
            qty: newQty,
          };
        }
        return item;
      });
      setSelectedItems(newItems);
    }

    dispatch(updateCart(newCart));
  };

  const handleRemoveProduct = (id) => {
    let newCart = cart.cartItems.filter((item) => item._uid !== id);
    dispatch(updateCart(newCart));
  };

  const handleSelect = () => {
    let newItems = [...selectedItems];
    if (selected) {
      newItems = selectedItems.filter((p) => p._uid != product._uid);
    } else {
      newItems = [...selectedItems, product];
    }
    setSelectedItems(newItems);
  };

  useEffect(() => {
    const productSelected = selectedItems.find((p) => p._uid === product._uid);
    setSelected(productSelected);
  }, [selectedItems]);

  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="../../../images/store.webp" alt="" />
        M74JJI Official Store
      </div>

      <div className={styles.product__image}>
        <div
          className={`${styles.checkbox} ${selected ? styles.active : ""}`}
          onClick={() => handleSelect()}
        ></div>

        <img src={product.images[0].url} alt="" />

        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>
            <div
              style={{ zIndex: "2" }}
              onClick={() => handleRemoveProduct(product._uid)}
            >
              <AiOutlineDelete />
            </div>
          </div>

          <div className={styles.product__style}>
            <img src={product.color.image} alt="" />
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{product.price.toFixed(2)}$</span>}
            <MdOutlineKeyboardArrowRight />
          </div>

          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD {(product.price * product.qty).toFixed(2)}$
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  USD {product.priceBefore}$
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>
            <div className={styles.product__priceQty_qty}>
              <button
                disabled={product.qty < 2}
                onClick={() => handleUpdateQty("minus")}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button
                disabled={product.qty == product.quantity}
                onClick={() => handleUpdateQty("plus")}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.product__shipping}>
            {product.shipping
              ? `+${product.shipping}$ Shipping fee`
              : "Free Shipping"}
          </div>

          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              This product is out of stock, Add it to your whishlist it may get
              restocked.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
