import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ErrorMessage, useField } from "formik";
import styles from "./styles.module.scss";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectChip({
  data,
  handleChange,
  placeholder,
  header,
  disabled,
  ...rest
}) {
  const theme = useTheme();

  const [field, meta] = useField(rest);

  console.log();

  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      {header && (
        <div
          className={`${styles.header} ${
            meta.error ? styles.header__error : ""
          }`}
        >
          <div className={styles.flex}>
            {meta.error && (
              <img src="../../../images/warning.png" alt="warning" />
            )}
            {header}
          </div>
        </div>
      )}

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name={field.name}
          multiple
          value={field.value || []}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const subCategory = data.find((d) => d._id == value);
                return <Chip key={value} label={subCategory.name} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((option) => (
            <MenuItem key={option.name} value={option._id || option.name}>
              <Checkbox checked={field.value.indexOf(option._id) > -1} />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && (
          <p className={styles.error__msg}>
            <ErrorMessage name={field.name} />
          </p>
        )}
      </FormControl>
    </div>
  );
}
