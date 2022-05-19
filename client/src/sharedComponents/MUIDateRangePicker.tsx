import React, { FC, useState } from 'react'
import { TextField } from "@mui/material";
import { DateRangePicker, DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";

interface Props {
  setTourDate: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
}

const MUIDateRangePicker:FC<Props> = ({setTourDate}) => {
    const [value, setValue] = useState<DateRange<Date>>([null, null]);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Start Date"
          endText="End Date"
          value={value}
          onChange={(newValue) => {
            setTourDate(newValue);
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
  )
}

export default MUIDateRangePicker
