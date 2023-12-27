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
import ProductDetails from "./ProductDetails";
import ProductQuestions from "./ProductQuestions";

const intialDetails = getInitialProductDetails();

function ProductForm({ parentProducts, categories }) {
  const [product, setProduct] = useState(intialDetails);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [descriptionImages, setDescriptionImages] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = Yup.object({
    name: Yup.string()
      .required("Please enter name.")
      .min(10, "Product name must be between 10 and 300 characters")
      .max(300, "Product name must be between 10 and 300 characters"),
    brand: Yup.string().required("Please enter brand."),
    category: Yup.string().required("Please select a category."),
    subCategories: Yup.array().required(
      "Please select at least one sub category."
    ),
    sku: Yup.string().required("Please enter Sku/number."),
    color: Yup.string().required("Please add a color."),
    description: Yup.string().required("Please add product description."),
  });

  const handleCreateProduct = () => {
    console.log("handleCreateProduct");
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    console.log("value =", value);
    setProduct((prev) => {
      const newData = { ...prev, [name]: value };
      // if (name === "parent") {
      //   newData["category"] = value.category._id;
      // }
      return newData;
    });
  };

  console.log(product);

  // UseEffect to GET the Parent product details
  useEffect(() => {
    if (product.parent) {
      getProductDetails(product.parent)
        .then((response) => {
          if (response.data) {
            const parentProductDetails = response.data;
            const { name, description, brand, category, subCategories } =
              parentProductDetails;
            setProduct((prev) => {
              return {
                ...prev,
                name,
                description,
                brand,
                category: category._id,
                subCategories,
              };
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else return;
  }, [product.parent]);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          ...product,
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
              images={images}
              setColorImage={setColorImage}
            />
            <ProductColor
              name="color"
              header="Pick a product color"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <ProductStyle
              name="styleInput"
              header="Pick a product style image"
              text="Pick style"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <SingularSelect
              name="parent"
              value={product.parent}
              placeholder="Parent"
              data={parentProducts}
              header="Add to an existing product"
              handleChange={handleChange}
            />

            <ProductCategory
              onChange={handleChange}
              categories={categories}
              product={product}
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
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            />

            <ProductDetails
              details={product.details}
              product={product}
              setProduct={setProduct}
            />

            <ProductQuestions
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            />

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

export default ProductForm;
