import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { compareArrays } from "@/utils/arrays";

function CartSubHeader({ cartItems, selectedItems, setSelectedItems }) {
  const [allItemsSelected, setAllItemsSelected] = useState(false);

  const handleToggleSelectAll = () => {
    if (allItemsSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems);
    }
  };

  useEffect(() => {
    // const selectedItemsIds = selectedItems.map((item) => item._uid);
    // const allSelected = cartItems.every((si) =>
    // selectedItemsIds.includes(si._uid)
    // );
    const allSelected = compareArrays(cartItems, selectedItems);
    setAllItemsSelected(allSelected);
  }, [cartItems, selectedItems]);

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Item summary ({cartItems.length})</h1>
      <div className={styles.flex}>
        <div
          className={`${styles.checkbox} ${
            allItemsSelected ? styles.active : ""
          }`}
          onClick={() => handleToggleSelectAll()}
        ></div>
        <span>Select all items</span>
      </div>
    </div>
  );
}

export default CartSubHeader;
