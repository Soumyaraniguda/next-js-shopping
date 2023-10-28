import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ShipppingAddressInput from "@/components/inputs/shippingAddressInput/ShipppingAddressInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "@/data/countries";
import SingularSelect from "@/components/inputs/select/SingularSelect";
import {
  deleteAddress,
  saveAddress,
  updateActiveAddress,
} from "@/uiApiRequests/user.api";
import Image from "next/image";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoRemoveCircle } from "react-icons/io5";

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

function Shipping({ addresses, setAddresses, user }) {
  const [showForm, setShowForm] = useState(false);
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
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
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
    country: Yup.string().required("Country is required."),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleSaveShippingAddress = async () => {
    const res = await saveAddress(shippingAddress, user._id);
    if (res.status === 200) {
      setAddresses(res.data);
    }
  };

  const updateActiveAddressHandler = async (id) => {
    const res = await updateActiveAddress(id);
    if (res.status === 200) {
      setAddresses(res.data);
    }
  };

  const handleDeleteAdderss = async (id) => {
    const res = await deleteAddress(id);
    if (res.status === 200) {
      setAddresses(res.data);
    }
  };

  return (
    <div className={styles.shipping}>
      <div className={styles.header}>
        <h2>Shipping Addresses</h2>
      </div>
      <div className={styles.addresses}>
        {addresses?.map((address) => (
          <div key={address._id} style={{ position: "relative" }}>
            <div
              className={styles.address__delete}
              onClick={() => handleDeleteAdderss(address._id)}
            >
              <IoRemoveCircle />
            </div>
            <div
              className={`${styles.address} ${address.active && styles.active}`}
              onClick={() => updateActiveAddressHandler(address._id)}
            >
              <div className={styles.address__side}>
                <Image
                  src={user.image}
                  height={0}
                  width={0}
                  alt="User"
                  sizes="100vw"
                />
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaIdCard />
                  {address?.firstName?.toUpperCase()}{" "}
                  {address?.lastName?.toUpperCase()}
                </span>
                <span>
                  <GiPhone />
                  {address.phoneNumber}
                </span>
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaMapMarkerAlt />
                  {address.address1}
                </span>
                <span>{address.address2}</span>
                <span>
                  {address.city}, {address.state}, {address.country}
                </span>
                <span>{address.zipCode}</span>
              </div>
              {address.active ? (
                <span className={styles.active__text}>Active</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className={styles.hide_show}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? (
          <span>
            <MdOutlineArrowDropUp style={{ fontSize: "2rem", file: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>

      {showForm && (
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
          onSubmit={() => handleSaveShippingAddress()}
        >
          {(form) => (
            <Form>
              <SingularSelect
                name="country"
                value={country}
                placeholder="*Country"
                handleChange={handleChange}
                data={countries}
              />

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
      )}
    </div>
  );
}

export default Shipping;
