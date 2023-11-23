import React from "react";
import TableBody from "@mui/material/TableBody";
import styles from "./styles.module.scss";
import SubCategoriesTableRow from "./SubCategoriesTableRow";

function SubCategoriesTableBody({
  visibleRows,
  emptyRows,
  selected,
  onSelect,
  onSelectDetails,
  onDeleteSubCategory,
}) {
  const isSelected = (id) => selected.indexOf(id) !== -1;
  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row._id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <SubCategoriesTableRow
            key={row._id}
            visibleRows={visibleRows}
            isItemSelected={isItemSelected}
            onSelect={onSelect}
            labelId={labelId}
            row={row}
            onSelectDetails={onSelectDetails}
            onDeleteSubCategory={onDeleteSubCategory}
          />
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default SubCategoriesTableBody;
