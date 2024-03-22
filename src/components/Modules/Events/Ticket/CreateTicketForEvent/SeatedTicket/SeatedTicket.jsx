import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  useGetEventStandsByIdQuery,
  useGetEventStandsQuery,
} from "../../../../../../store/services/Events/event.services"
export const SeatedTicket = ({
  handleNext,
  setSeatedTickets,
  seatedTickets,
}) => {
  const handleSubmit = () => {
    handleNext()
  }
  return (
    <>
      <BasicTabs
        setSeatedTickets={setSeatedTickets}
        seatedTickets={seatedTickets}
      />
      <Grid item md={4} sx={{ mt: "48px", mb: "190px" }}>
        <Button
          variant='contained'
          onClick={handleSubmit}
          sx={{
            color: "white",
            width: {xs:"100%",sm:"332px"},
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "19px",
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",
            "&.MuiButton-root:hover": {
              //   boxShadow: "none",
              bgcolor: "#2460B8",
            },
          }}
        >
          Continue
        </Button>
      </Grid>
    </>
  )
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
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
  )
}

export default function BasicTabs({ setSeatedTickets, seatedTickets }) {
  const [value, setValue] = React.useState(0)
  const { data: getAllStands, isLoading } = useGetEventStandsQuery()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  if (isLoading) return <p>Loading...</p>
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          {getAllStands?.map((item, index) => (
            <Tab
              key={item.Id}
              sx={{
                color: "#969BA0",
                fontSize: "14px",
                fontWeight: 400,
                "&.MuiTab-root.Mui-selected": {
                  color: "#2460B8",
                },
              }}
              label={item.BlockStandName}
              {...a11yProps(index)}
              onClick={() => handleTabClick(item.Id)} // Call the function to handle tab click
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={value}>
        <TabPanelContent
          standId={getAllStands?.[value]?.Id}
          setSeatedTickets={setSeatedTickets}
          seatedTickets={seatedTickets}
        />
      </TabPanel>
    </Box>
  )
}
function TabPanelContent({ standId, setSeatedTickets, seatedTickets }) {
  const { data: blockStandData, isLoading } =
    useGetEventStandsByIdQuery(standId)

  const handleRowChange = (rowName, seatNumber) => {
    // Create a new object with BlockStandId, RowsId, and SeatId
    const newData = {
      BlockStandId: standId,
      RowsId: blockStandData?.find((row) => row.RowName === rowName)?.Id,
      SeatId: blockStandData
        ?.find((row) => row.RowName === rowName)
        ?.lstSeatsInRowBlockStands?.find(
          (seat) => seat.SeatNumber === seatNumber
        )?.Id,
    }
    setSeatedTickets([...seatedTickets, newData])
  }
  if (isLoading) return <p>Loading...</p>
  return (
    <Grid container columnSpacing={4} sx={{ mt: "2rem" }}>
      {blockStandData?.map((row, rowIndex) => (
        <Grid
          item
          xs={12}
          sm={6}
          key={row.Id}
          sx={{ mt: { xs: "1.5rem", sm: "0rem" } }}
        >
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>{row.RowName}</InputLabel>
            <Select
              onChange={(event) =>
                handleRowChange(row.RowName, event.target.value)
              }
            >
              {row.lstSeatsInRowBlockStands?.map((seat) => (
                <MenuItem key={seat.Id} value={seat.SeatNumber}>
                  {`Seat: ${seat.SeatNumber} - Price: ${seat.Price}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ))}
    </Grid>
  )
}
