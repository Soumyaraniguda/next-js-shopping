import React from "react";
import TableBody from "@mui/material/TableBody";
import CouponsTableRow from "./CouponsTableRow";

function CouponsTableBody({
  visibleRows,
  emptyRows,
  selected,
  onSelect,
  onSelectDetails,
  onDeleteCoupon,
}) {
  const isSelected = (id) => selected.indexOf(id) !== -1;
  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row._id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <CouponsTableRow
            key={row._id}
            visibleRows={visibleRows}
            isItemSelected={isItemSelected}
            onSelect={onSelect}
            labelId={labelId}
            row={row}
            onSelectDetails={onSelectDetails}
            onDeleteCoupon={onDeleteCoupon}
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

export default CouponsTableBody;
