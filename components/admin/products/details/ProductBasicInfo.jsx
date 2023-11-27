import AdminInput from "@/components/inputs/adminInput/AdminInput";
import { Typography } from "@mui/material";
import React from "react";

function ProductBasicInfo({ onChangeBasicInfo }) {
  return (
    <div>
      <b>Basic Info</b>
      <AdminInput
        type="text"
        name="name"
        showLabel={true}
        label="Name"
        placeholder="Enter product name"
        onChange={onChangeBasicInfo}
      />

      <AdminInput
        type="text"
        name="description"
        showLabel={true}
        label="Description"
        placeholder="Enter product Description"
        onChange={onChangeBasicInfo}
      />

      <AdminInput
        type="text"
        name="brand"
        showLabel={true}
        label="Brand"
        placeholder="Enter product Brand"
        onChange={onChangeBasicInfo}
      />

      <AdminInput
        type="text"
        name="sku"
        showLabel={true}
        label="Sku"
        placeholder="Enter product sku/ number"
        onChange={onChangeBasicInfo}
      />

      <AdminInput
        type="text"
        name="discount"
        showLabel={true}
        label="Discount"
        placeholder="Enter product discount"
        onChange={onChangeBasicInfo}
      />
    </div>
  );
}

export default ProductBasicInfo;
