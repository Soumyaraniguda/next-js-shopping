import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ShipppingAddressInput from "@/components/inputs/shippingAddressInput/ShipppingAddressInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "@/data/countries";

const initialShippingAddress = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

function Shipping({ selectedAddress, setSelectedAddress, user }) {
  const [addresses, setAddresses] = useState(user?.address);

  const [shippingAddress, setShippingAddress] = useState(
    initialShippingAddress
  );

  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shippingAddress;

  const validateShippingAddress = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    phoneNumber: Yup.string()
      .required("Phone number is required.")
      .min(3, "Phone number must be atleast 10 characters long.")
      .max(20, "Phone number must be less than 15 characters long."),
    state: Yup.string()
      .required("State is required.")
      .min(3, "State must be atleast 10 characters long.")
      .max(60, "State must be less than 60 characters long."),
    city: Yup.string()
      .required("City is required.")
      .min(3, "City must be atleast 10 characters long.")
      .max(60, "City must be less than 60 characters long."),
    zipCode: Yup.string()
      .required("Zip code is required.")
      .min(2, "Zip code must be atleast 10 characters long.")
      .max(60, "Zip code must be less than 60 characters long."),
    address1: Yup.string()
      .required("Address is required.")
      .min(3, "Address line 1 should contain 5-100 characters.")
      .max(100, "Address line 1 must be less than 100 characters long."),
    address2: Yup.string()
      .min(2, "Address line 2 should contain 5-100 characters.")
      .max(100, "Address line 2 must be less than 60 characters long."),
    country: Yup.string().required(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleAddShippingAddress = () => {
    console.log("handle add shipping");
  };

  return (
    <div className={styles.shipping}>
      <Formik
        enableReinitialize
        initialValues={{
          firstName,
          lastName,
          phoneNumber,
          state,
          city,
          zipCode,
          address1,
          address2,
          country,
        }}
        validationSchema={validateShippingAddress}
        onSubmit={() => handleAddShippingAddress()}
      >
        {(form) => (
          <Form>
            <FormControl className={styles.selectCountry}>
              <InputLabel id="demo-simple-select-helper-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-helper"
                value={country}
                name="country"
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <MenuItem value={country.name} key={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={styles.col}>
              <ShipppingAddressInput
                type="text"
                name="firstName"
                placeholder="*First name"
                onChange={handleChange}
              />
              <ShipppingAddressInput
                type="text"
                name="lastName"
                placeholder="*Last name"
                onChange={handleChange}
              />
            </div>

            <div className={styles.col}>
              <ShipppingAddressInput
                type="text"
                name="state"
                placeholder="*State/Province"
                onChange={handleChange}
              />
              <ShipppingAddressInput
                type="text"
                name="city"
                placeholder="*City"
                onChange={handleChange}
              />
            </div>

            <ShipppingAddressInput
              type="text"
              name="phoneNumber"
              placeholder="*Phone number"
              onChange={handleChange}
            />

            <ShipppingAddressInput
              type="text"
              name="zipCode"
              placeholder="*Post/Zip code"
              onChange={handleChange}
            />

            <ShipppingAddressInput
              type="text"
              name="address1"
              placeholder="*Address line 1"
              onChange={handleChange}
            />

            <ShipppingAddressInput
              type="text"
              name="address2"
              placeholder="Address line 2"
              onChange={handleChange}
            />

            <button type="submit">Save Address</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Shipping;
