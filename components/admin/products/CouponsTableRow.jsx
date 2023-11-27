import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { formatDate } from "@/utils/date";

function CouponsTableRow({
  row,
  isItemSelected,
  onSelect,
  onSelectDetails,
  onDeleteCoupon,
  labelId,
}) {
  const [rowHovered, setRowHovered] = useState(false);
  const handleClickCheckBox = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(event, row._id);
  };

  const handleClickDeleteIcon = (event) => {
    event.stopPropagation();
    onDeleteCoupon(row);
  };

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
      onMouseOver={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
      onClick={(event) => onSelectDetails(event, row)}
    >
      <TableCell padding="checkbox">
        {(rowHovered || isItemSelected) && (
          <Checkbox
            style={{ width: "2em" }}
            onClick={(event) => handleClickCheckBox(event)}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        )}
      </TableCell>

      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.coupon}
      </TableCell>

      <TableCell align="right">{row.discount}%</TableCell>

      <TableCell>{formatDate(row.startDate)}</TableCell>

      <TableCell>{formatDate(row.endDate)}</TableCell>

      <TableCell>
        <IconButton
          onClick={(event) => onSelectDetails(event, row)}
          size="small"
        >
          <MdModeEdit />
        </IconButton>
        <IconButton
          size="small"
          onClick={(event) => handleClickDeleteIcon(event, row)}
        >
          <MdDeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default CouponsTableRow;
