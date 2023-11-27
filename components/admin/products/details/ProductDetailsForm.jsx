"use client";

import { getProductDetails } from "@/uiApiRequests/products.api";
import { getInitialProductDetails } from "@/utils/product";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ProductImages from "./ProductImages";
import ProductColor from "./ProductColor";
import ProductStyle from "./ProductStyle";
import SingularSelect from "@/components/inputs/select/SingularSelect";
import ProductCategory from "./ProductCategory";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductSizes from "./ProductSizes";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const intialDetails = getInitialProductDetails();

function ProductDetailsForm({ parentProducts, categories }) {
  const [productDetails, setProductDetails] = useState(intialDetails);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [descriptionImages, setDescriptionImages] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = Yup.object({});

  const handleCreateProduct = () => {
    console.log("handleCreateProduct");
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  console.log(productDetails);

  // UseEffect to GET the Parent product details
  useEffect(() => {
    if (productDetails.parent) {
      getProductDetails(productDetails.parent)
        .then((response) => {
          if (response.data) {
            const parentProductDetails = response.data;
            const { name, description, brand, category, subCategories } =
              parentProductDetails;
            setProductDetails((prev) => {
              return {
                ...prev,
                name,
                description,
                brand,
                category,
                subCategories,
              };
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else return;
  }, [productDetails.parent]);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          ...productDetails,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validateForm}
        onSubmit={() => handleCreateProduct()}
      >
        {(form) => (
          <Form>
            <ProductImages
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              setImages={setImages}
              setColorImage={setColorImage}
            />
            <ProductColor
              name="color"
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              colorImage={colorImage}
            />
            <ProductStyle
              name="styleInput"
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              colorImage={colorImage}
            />
            <SingularSelect
              name="parent"
              value={productDetails.parent}
              placeholder="Parent"
              data={parentProducts}
              header="Add to an existing product"
              handleChange={handleChange}
            />

            <ProductCategory
              onChange={handleChange}
              categories={categories}
              productDetails={productDetails}
            />

            <ProductBasicInfo onChangeBasicInfo={handleChange} />

            <ProductImages
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={descriptionImages}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />

            <ProductSizes
              sizes={productDetails.sizes}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />

            {/* <Details
              sizes={productDetails.details}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />

            <Questions
              sizes={productDetails.questions}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            /> */}
            <Box
              mt={2}
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
              gap="1em"
            >
              <Button variant="contained" size="small" color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="small" autoFocus>
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductDetailsForm;
