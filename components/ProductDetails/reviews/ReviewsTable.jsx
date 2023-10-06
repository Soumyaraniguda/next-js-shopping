import { useState } from "react";
import styles from "./styles.module.scss";
import usePagination from "@/hooks/usePagination";
import { Pagination } from "@mui/material";
import ReviewCard from "./ReviewCard";
import ReviewTableHeaderSelectInput from "./ReviewTableHeaderSelectInput";
import ReviewsTableHeader from "./ReviewsTableHeader";

function ReviewsTable({ reviews, allSizes, colors }) {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(reviews?.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);

  const handleChange = (event, page) => {
    setPage(page);
    _DATA.jump(page);
  };
  return (
    <div className={styles.reviews__table}>
      <ReviewsTableHeader
        reviews={reviews}
        allSizes={[{ size: "All" }, ...(allSizes || [])]}
        colors={[{ color: "All", image: "" }, ...(colors || [])]}
      />

      <div className={styles.reviews__table_data}>
        {_DATA?.currentData()?.length ? (
          _DATA
            ?.currentData()
            ?.map((review, i) => (
              <ReviewCard key={review?._id || i} review={review} />
            ))
        ) : (
          <></>
        )}
      </div>

      <div className={styles.pagination}>
        <Pagination
          count={count}
          page={page}
          variant="round"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ReviewsTable;
