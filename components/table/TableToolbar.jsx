import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

function TableToolbar({ numSelected, onCreateEntity }) {
  return (
    <Toolbar
      style={{ paddingLeft: numSelected > 0 ? "16px" : "0", paddingRight: 0 }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <TextField
            id="outlined-search"
            label="Search..."
            type="search"
            size="small"
            style={{ width: "25em" }}
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <MdDeleteOutline />
            </IconButton>
          </Tooltip>
        ) : (
          <div>
            <Button variant="contained" size="small" onClick={onCreateEntity}>
              Create
            </Button>
          </div>
        )}
      </Box>
    </Toolbar>
  );
}

export default TableToolbar;
