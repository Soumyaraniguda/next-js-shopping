"use client";

import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import CouponsTable from "@/components/admin/coupons/CouponsTable";
import CouponsFormDialog from "@/components/admin/coupons/CouponsFormDialog";
import { deleteCoupons, getCoupons } from "@/uiApiRequests/coupons.api";
import { toast } from "react-toastify";

function DashboardCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [couponDetails, setCouponDetails] = useState();
  const [loading, setLoading] = useState(false);

  const handleCreateCoupon = () => {
    handleOpenFormDialog();
    setCouponDetails({});
  };

  const handleSelectDetails = (event, coupon) => {
    handleOpenFormDialog();
    setCouponDetails(coupon);
  };

  const handleDeleteCoupon = (coupon) => {
    deleteCoupons(coupon._id)
      .then((response) => {
        setSubCategories(response.data.coupons);
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.message);
        } else {
          toast.error("Delete failed");
        }
      });
  };

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  useEffect(() => {
    setLoading(true);
    getCoupons()
      .then((response) => {
        setCoupons(response.data.coupons);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5">
        Coupons {loading && <CircularProgress size={18} />}
      </Typography>
      <>
        {openFormDialog && (
          <CouponsFormDialog
            openFormDialog={openFormDialog}
            onCloseFormDialog={handleCloseFormDialog}
            couponDetails={couponDetails}
            setCoupons={setCoupons}
          />
        )}
      </>

      <CouponsTable
        coupons={coupons}
        onCreateCoupon={handleCreateCoupon}
        onSelectDetails={handleSelectDetails}
        onDeleteCoupon={handleDeleteCoupon}
      />
    </div>
  );
}

export default DashboardCoupons;
