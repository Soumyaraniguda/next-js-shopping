import { useState } from "react";
import ReviewTableHeaderSelectInput from "./ReviewTableHeaderSelectInput";
import styles from "./styles.module.scss";

function ReviewsTableHeader({ reviews, allSizes, colors }) {
  const [rating, setRating] = useState();
  const [size, setSize] = useState();
  const [style, setStyle] = useState();
  const [order, setOrder] = useState();

  return (
    <div className={styles.reviews__table_header}>
      <ReviewTableHeaderSelectInput
        property={rating}
        text="Rating"
        data={ratings?.filter((x) => x.value !== rating) || []}
        handleChange={setRating}
      />

      <ReviewTableHeaderSelectInput
        property={size}
        text="Size"
        data={allSizes?.filter((x) => x.size !== size) || []}
        handleChange={setSize}
      />

      <ReviewTableHeaderSelectInput
        property={style}
        text="Style"
        data={colors?.filter((x) => x !== style) || []}
        handleChange={setStyle}
      />

      <ReviewTableHeaderSelectInput
        property={order}
        text="Order"
        data={orderOptions?.filter((x) => x.value !== order) || []}
        handleChange={setOrder}
      />
    </div>
  );
}

export default ReviewsTableHeader;

const ratings = [
  { text: "All", value: "" },
  { text: "5 stars", value: 5 },
  { text: "4 stars", value: 4 },
  { text: "3 stars", value: 3 },
  { text: "2 stars", value: 2 },
  { text: "1 star", value: 1 },
];

const orderOptions = [
  {
    text: "Recommended",
    value: "Recommended",
  },
  {
    text: "Most recent to oldest",
    value: "Most recent to oldest",
  },
  {
    text: "Oldest to most recent",
    value: "Oldest to most recent",
  },
];
