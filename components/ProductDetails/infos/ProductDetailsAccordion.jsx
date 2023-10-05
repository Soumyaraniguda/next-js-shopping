import styles from "./styles.module.scss";

import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<MdOutlineArrowForwardIos />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function ProductDetailsAccordion({ descriptionAndDetails }) {
  const description = descriptionAndDetails?.[0];
  const details = descriptionAndDetails?.slice(1, descriptionAndDetails.length);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={styles.infos__accordion}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={styles.accordion}
      >
        <AccordionSummary
          className={styles.accordion__summary}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          Details
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.infos__accordion_sub_summary}>
            {description}
          </div>

          {details?.map((info) => (
            <div
              key={JSON.stringify(info)}
              className={styles.infos__accordion_grid}
            >
              <span>{info.name}:</span>
              <span>{info.value}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={styles.accordion}
      >
        <AccordionSummary
          className={styles.accordion__summary}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          Size & Fit
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ProductDetailsAccordion;
