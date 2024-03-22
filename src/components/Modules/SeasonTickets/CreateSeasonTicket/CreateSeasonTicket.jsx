import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { InputField } from "../../../Common/InputField";
import { useNavigate } from "react-router-dom";
import {
  useAddSeasonTicketMutation,
  useEditSeasonTicketMutation,
  useGetEventSchedulesQuery,
} from "../../../../store/services/SeasonTicket/SeasonTicket.services";
import { clearEditData } from "../../../../store/slices/editDataSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

export const CreateSeasonTicket = () => {
  const navigate = useNavigate();
  const editData = useSelector((state) => state.editData);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [checkedEvent, setCheckedEvent] = useState({});
  const [addSeasonTicket, { isLoading, isError, isSuccess, status, data }] =
    useAddSeasonTicketMutation();
  const isEditing = !!editData;
  const [
    editSeasonTicket,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useEditSeasonTicketMutation();
  const { data: getEventSchedules } = useGetEventSchedulesQuery();

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      const postdata = {
        Id: editData.Id,
        Name: name,
      };
      await editSeasonTicket(postdata);
      dispatch(clearEditData());
    } else {
      const postdata = {
        Name: name,
        EventId: checkedEvent.eventId,
      };
      await addSeasonTicket(postdata);
    }
  };

  useEffect(() => {
    if (isSuccess || editSuccess) {
      navigate("/seasons");
    }
  }, [isSuccess, navigate, editSuccess]);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.Name,
      });
      setVenueTextEditor(editData.Notes);
    }
  }, [editData]);

  if (!getEventSchedules) {
    return <div>Loading...</div>;
  }
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
        },
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography
          sx={{
            color: "#202020",
            fontWeight: 500,
            fontSize: "22px",
            mt: "30px",
          }}
        >
          Enter the details below
        </Typography>
        <Box sx={{ mt: "32px" }}>
          <InputField
            label={"Name"}
            sx={{ width: "100%" }}
            onChange={handleChange}
            value={name}
            name="name"
          />
        </Box>

        {/* change to dynamic width */}
        <Box sx={{ mt: "32px" }}>
          <Typography
            sx={{ fontWeight: 400, color: "#707070", fontSize: "14px" }}
          >
            Event schedules
          </Typography>
          <Box
            sx={{
              border: "1px solid #CFCFCF",
              bgcolor: "white",
              mt: "8px",
              pl: "24px",
              py: "24px",
              borderRadius: "16px",
            }}
          >
            {Object.entries(getEventSchedules).map(
              ([venueName, events], index) => {
                return (
                  <EventList
                    key={index}
                    venueName={venueName}
                    events={events}
                    checkedEvent={checkedEvent}
                    setCheckedEvent={setCheckedEvent}
                  />
                );
              }
            )}
          </Box>
        </Box>

        <Button
          variant="contained"
          type="submit"
          sx={{
            color: "white",
            borderColor: "#FCA311",
            width: { xs: "100%", sm: "332px" },
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "19px",
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",
            my: "48px",
            border: "1px soliid #FCA311",
            "&.MuiButton-root:hover": {
              //   boxShadow: "none",
              //   borderColor: "#FCA311",
              bgcolor: "#2460B8",
            },
          }}
        >
          Done
        </Button>
      </Box>
    </Container>
  );
};
function EventList({ venueName, events, checkedEvent, setCheckedEvent }) {
  const handleEventCheck = (eventId) => {
    setCheckedEvent((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  return (
    <>
      <Typography sx={{ color: "#202020", fontWeight: 500, fontSize: "16px" }}>
        {venueName}
      </Typography>
      <Box sx={{ display: "flex" }}>
        {events.map((event, index) => (
          <FormControlLabel
            key={index}
            sx={{
              color: "#758895",
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontWeight: 400,
              },
            }}
            control={
              <Checkbox
                checked={checkedEvent[event.EventId] === true}
                onChange={() => handleEventCheck(event.EventId)}
              />
            }
            label={`${dayjs(event.EventDate).format("DD MMM YYYY, HH:mmA")} ${
              event.Name
            } ${event.City}`}
          />
        ))}
      </Box>
    </>
  );
}
