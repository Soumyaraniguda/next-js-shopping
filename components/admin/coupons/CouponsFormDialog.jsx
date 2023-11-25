import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput/AdminInput";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { saveCoupon } from "@/uiApiRequests/coupons.api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addDays } from "date-fns";
import styles from "./styles.module.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function CouponsFormDialog({
  openFormDialog,
  onCloseFormDialog,
  setCoupons,
  couponDetails,
}) {
  const today = new Date();
  const tomorrow = addDays(today, 1);

  const [couponCode, setCouponCode] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [discount, setDiscount] = useState(1);

  const validate = Yup.object({
    couponCode: Yup.string()
      .required("Coupon code is required")
      .min(2, "Coupon code must between 3 and 10 characters.")
      .max(30, "Coupon code name must between 3 and 10 characters")
      .matches(/^[A-Za-z0-9\s]*$/, "Special characters are not allowed."),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "Should be greater than Start date"),
    discount: Yup.number()
      .required("Discount is required")
      .min(1, "Discount must be atleast 1%")
      .max(99, "Discount must be 99% or less"),
  });

  const handleClose = () => {
    onCloseFormDialog();
  };

  const handleSubmit = () => {
    const data = {
      coupon: couponCode,
      startDate,
      endDate,
      discount,
    };
    if (couponDetails._id) {
      data.id = couponDetails._id;
    }
    saveCoupon(data)
      .then((response) => {
        setCoupons(response.data.coupons);
        toast.success(response.data.message);
        setCouponCode("");
        setStartDate();
        setEndDate();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          const { data } = error.response;
          toast.error(data.message);
        } else {
          toast.error("Cannot save Coupon");
        }
      });
  };

  useEffect(() => {
    if (couponDetails?._id) {
      setCouponCode(couponDetails.coupon);
      setStartDate(new Date(couponDetails.startDate));
      setEndDate(new Date(couponDetails.endDate));
      setDiscount(couponDetails.discount);
    }
  }, [couponDetails]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="couponDetails-dialog-title"
        open={openFormDialog}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          m={1}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="couponDetails-dialog-title">
            {couponDetails?._id ? "Coupon details" : "Create a Coupon"}
          </DialogTitle>

          <IconButton aria-label="close" onClick={handleClose}>
            <MdClose />
          </IconButton>
        </Box>

        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{
              couponCode,
              startDate,
              endDate,
              discount,
            }}
            validationSchema={validate}
            onSubmit={() => handleSubmit()}
          >
            {(form) => {
              return (
                <Form>
                  <AdminInput
                    type="text"
                    name="couponCode"
                    showLabel={true}
                    label="Coupon code"
                    placeholder="Enter coupon code"
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <AdminInput
                    type="number"
                    name="discount"
                    showLabel={true}
                    label="Discount %"
                    placeholder="Enter discount"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box display="flex" flexDirection="row" gap="2em">
                      <Box width={"13em"}>
                        <label>Start date</label>
                        <DatePicker
                          value={startDate}
                          onChange={(newStartDate) =>
                            setStartDate(newStartDate)
                          }
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                          // minDate={today}
                        />
                        <div className={styles.error_message}>
                          {form?.errors?.startDate || ""}
                        </div>
                      </Box>
                      <Box width={"13em"}>
                        <label>End date</label>
                        <DatePicker
                          value={endDate}
                          onChange={(newEndDate) => setEndDate(newEndDate)}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                          // minDate={tomorrow}
                        />
                        <div className={styles.error_message}>
                          {form?.errors?.endDate || ""}
                        </div>
                      </Box>
                    </Box>
                  </LocalizationProvider>
                  <Box
                    mt={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="1em"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleClose}
                      color="inherit"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      autoFocus
                    >
                      Save
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default CouponsFormDialog;
