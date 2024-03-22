import React, { useEffect, useState } from "react";

export const EditCustomerDetail = () => {
  return (
    <div>
      <BasicTabs />
    </div>
  );
};

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { InputField } from "../../../Common/InputField";
import { Button, MenuItem } from "@mui/material";

import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import InputDateAndTimePicker from "../../../Common/InputDateAndTimePicker";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCustomerDetailQuery,
  useUpdateCustomerBillingAddressMutation,
  useUpdateCustomerDetailsMutation,
  useUpdateCustomerNotesMutation,
} from "../../../../store/services/Customer/Customer.services";
import { OrdersTable } from "./OrdersTable/OrdersTable";
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  let { id } = useParams();
  const { data: customersOrders, isLoading } = useGetCustomerDetailQuery(id);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              color: "#969BA0",
              fontSize: "14px",
              fontWeight: 400,

              "&.MuiTab-root.Mui-selected": {
                color: "#2460B8",
              },
            }}
            label="Details"
            {...a11yProps(0)}
          />
          <Tab label="Billing address" {...a11yProps(1)} />
          <Tab label="Notes" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CustomerDetais
          customersOrders={customersOrders}
          isLoading={isLoading}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BillingAddress
          customersOrders={customersOrders}
          isLoading={isLoading}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Notes customersOrders={customersOrders} isLoading={isLoading} />
      </TabPanel>
    </Box>
  );
}

export const CustomerDetais = ({ customersOrders, isLoading }) => {
  const navigate = useNavigate();
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    date: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [changesMade, setChangesMade] = useState(false);
  const [updateCustomerDetails, { isSuccess }] =
    useUpdateCustomerDetailsMutation();
  useEffect(() => {
    if (customersOrders?.details) {
      setFormData({
        firstName: customersOrders.details.FirstName,
        lastName: customersOrders.details.LastName,
        email: customersOrders.details.Email,
        password: customersOrders.details.Password,
        date: dayjs(customersOrders.details.DOB, "MM/DD/YYYY"),
      });
      setChangesMade(false); // Reset changesMade when data is loaded
    }
  }, [customersOrders]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Compare the new form data with the initial form data
    if (value !== initialFormData[name]) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUserData = {
      UserId: customersOrders?.details?.UserId,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
      Password: formData.password,
      DOB: formData.date,
    };

    // Perform the update only if there are changes
    if (changesMade) {
      await updateCustomerDetails(newUserData);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/customers");
    }
  }, [isSuccess]);

  return (
    <>
      <Box
        sx={{ display: "flex", mt: "32px", justifyContent: "space-between" }}
      >
        <InputField
          label={"First name"}
          sx={{ width: "337px" }}
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
        />
        <InputField
          label={"Last name"}
          sx={{ width: "337px" }}
          onChange={handleChange}
          value={formData.lastName}
          name="lastName"
        />
        <InputField
          label={"Email"}
          sx={{ width: "337px" }}
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "32px" }}
      >
        <InputDateAndTimePicker
          field="DateField"
          fieldType={
            <DateField
              format="DD/MM/YYYY"
              sx={{
                "& .MuiInputBase-root": {
                  height: "48px",
                  width: "337px",
                  borderRadius: "16px",
                  bgcolor: "white",
                  overflow: "hidden",
                  color: "#707070",
                },
                "& .MuiTypography-root": {
                  color: "red",
                  fontSize: "14px",
                },

                // height: "48px",
              }}
              value={formData.date}
            />
          }
          label={"Date"}
        />
        <InputField
          label={"Password"}
          type={"password"}
          sx={{ width: "337px" }}
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
      </Box>
      {customersOrders && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "48px" }}>
          <Button
            disabled={!changesMade}
            onClick={handleSubmit}
            variant="contained"
            sx={{
              color: "white",
              borderColor: "#FCA311",
              // width: "216px",
              height: "55px",
              fontSize: "18px",
              fontWeight: 600,
              bgcolor: "#2460B8",
              textTransform: "capitalize",
              borderRadius: "16px",
              border: "1px soliid #FCA311",
              "&.MuiButton-root:hover": {
                //   boxShadow: "none",
                //   borderColor: "#FCA311",
                bgcolor: "#2460B8",
              },
            }}
          >
            Update customer details
          </Button>
        </Box>
      )}

      <Box sx={{ borderBottom: "1px solid #CFCFCF", mt: "48px" }} />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "45px" }}
      >
        <Typography
          sx={{ color: "#202020", fontSize: "22px", fontWeight: 500 }}
        >
          Orders
        </Typography>
      </Box>
      <OrdersTable
        customersOrders={customersOrders?.lstOrdersViewModel}
        isLoading={isLoading}
      />
    </>
  );
};

export const BillingAddress = ({ customersOrders, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billingName: "",
    billingCountry: "",
    billingAddressLine1: "",
    billingAddressLine2: "",
    billingTown: "",
    billingPostcode: "",
    billingEmailAddress: "",
    billingTelephone: "",
  });
  const [changesMade, setChangesMade] = useState(false);
  const [updateCustomerBillingAddress, { isSuccess }] =
    useUpdateCustomerBillingAddressMutation();

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Compare the new form data with the initial form data
    if (value !== formData[name]) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUserBillingData = {
      UserId: customersOrders.details.UserId,
      BillingName: formData.billingName,
      BillingCountry: formData.billingCountry,
      BillingAddressLine1: formData.billingAddressLine1,
      BillingAddressLine2: formData.billingAddressLine2,
      BillingTown: formData.billingTown,
      BillingPostalCode: formData.billingPostcode,
      BillingEmail: formData.billingEmailAddress,
      BillingPhone: formData.billingTelephone,
    };

    if (changesMade) {
      await updateCustomerBillingAddress(newUserBillingData);
    }
  };

  useEffect(() => {
    setFormData({
      billingName: customersOrders.billingAddress.BillingName,
      billingCountry: customersOrders.billingAddress.BillingCountry,
      billingAddressLine1: customersOrders.billingAddress.BillingAddressLine1,
      billingAddressLine2: customersOrders.billingAddress.BillingAddressLine2,
      billingTown: customersOrders.billingAddress.BillingTown,
      billingPostcode: customersOrders.billingAddress.BillingPostalCode,
      billingEmailAddress: customersOrders.billingAddress.BillingEmail,
      billingTelephone: customersOrders.billingAddress.BillingPhone,
    });
  }, [customersOrders]);
  useEffect(() => {
    if (isSuccess) {
      navigate("/customers");
    }
  }, [isSuccess]);

  return (
    <Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Blling name"}
          sx={{ width: "515px" }}
          onChange={handleChange}
          value={formData.billingName}
          name="billingName"
        />
        <InputField
          label={"Blling country"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleChange}
          value={formData.billingCountry}
          name="billingCountry"
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing address line 1"}
          sx={{ width: "515px" }}
          onChange={handleChange}
          value={formData.billingAddressLine1}
          name="billingAddressLine1"
        />
        <InputField
          label={"Billing address line 2"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleChange}
          value={formData.billingAddressLine2}
          name="billingAddressLine2"
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing town"}
          sx={{ width: "515px" }}
          onChange={handleChange}
          value={formData.billingTown}
          name="billingTown"
        />
        <InputField
          label={"Billing postcode"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleChange}
          value={formData.billingPostcode}
          name="billingPostcode"
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing email address"}
          sx={{ width: "515px" }}
          onChange={handleChange}
          value={formData.billingEmailAddress}
          name="billingEmailAddress"
        />
        <InputField
          label={"Billing telephone"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleChange}
          value={formData.billingTelephone}
          name="billingTelephone"
        />
      </Box>
      {customersOrders && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "48px" }}>
          <Button
            disabled={!changesMade}
            onClick={handleSubmit}
            variant="contained"
            sx={{
              color: "white",
              borderColor: "#FCA311",
              // width: "216px",
              height: "55px",
              fontSize: "18px",
              fontWeight: 600,
              bgcolor: "#2460B8",
              textTransform: "capitalize",
              borderRadius: "16px",
              border: "1px soliid #FCA311",
              "&.MuiButton-root:hover": {
                //   boxShadow: "none",
                //   borderColor: "#FCA311",
                bgcolor: "#2460B8",
              },
            }}
          >
            Update customer details
          </Button>
        </Box>
      )}
      <Box sx={{ borderBottom: "1px solid #CFCFCF", mt: "48px" }} />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "45px" }}
      >
        <Typography
          sx={{ color: "#202020", fontSize: "22px", fontWeight: 500 }}
        >
          Orders
        </Typography>
      </Box>
      <OrdersTable
        customersOrders={customersOrders?.lstOrdersViewModel}
        isLoading={isLoading}
      />
    </Box>
  );
};

export const Notes = ({ customersOrders, isLoading }) => {
  const [editorHtml, setEditorHtml] = React.useState("");
  const [changesMade, setChangesMade] = useState(false);
  const [updateCustomerNotes, { isSuccess }] = useUpdateCustomerNotesMutation();
  const navigate = useNavigate();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ font: [] }],
      [{ case: "upper" }, { case: "lower" }],
      ["link", "image"],
    ],
  };

  const formats = ["header", "bold", "italic", "underline", "link", "image"];

  const handleChange = (html) => {
    setEditorHtml(html);
    setChangesMade(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUserBillingData = {
      UserId: customersOrders.details.UserId,
      Notes: editorHtml,
    };

    if (changesMade) {
      await updateCustomerNotes(newUserBillingData);
    }
  };
  useEffect(() => {
    setEditorHtml(customersOrders.notes.Notes);
  }, [customersOrders]);
  useEffect(() => {
    if (isSuccess) {
      navigate("/customers");
    }
  }, [isSuccess]);

  return (
    <>
      <Box sx={{ mt: "32px" }}>
        <Typography
          sx={{
            color: "#707070",
            fontSize: "14px",
            fontWeight: 400,
            pb: "8px",
          }}
        >
          Notes
        </Typography>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={editorHtml}
          onChange={handleChange}
          styles={{ height: "170px" }}
        />
      </Box>
      {customersOrders && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "48px" }}>
          <Button
            disabled={!changesMade}
            onClick={handleSubmit}
            variant="contained"
            sx={{
              color: "white",
              borderColor: "#FCA311",
              // width: "216px",
              height: "55px",
              fontSize: "18px",
              fontWeight: 600,
              bgcolor: "#2460B8",
              textTransform: "capitalize",
              borderRadius: "16px",
              border: "1px soliid #FCA311",
              "&.MuiButton-root:hover": {
                //   boxShadow: "none",
                //   borderColor: "#FCA311",
                bgcolor: "#2460B8",
              },
            }}
          >
            Update customer details
          </Button>
        </Box>
      )}
      <Box sx={{ borderBottom: "1px solid #CFCFCF", mt: "90px" }} />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "45px" }}
      >
        <Typography
          sx={{ color: "#202020", fontSize: "22px", fontWeight: 500 }}
        >
          Orders
        </Typography>
      </Box>
      <OrdersTable
        customersOrders={customersOrders?.lstOrdersViewModel}
        isLoading={isLoading}
      />
    </>
  );
};
