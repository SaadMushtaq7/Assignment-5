import React, { FC } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props{
    city:string;
    endDate: string;
    facilities:string[];
}

const TourDetailsTable:FC<Props> = ({city, endDate, facilities}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              <strong>Destination</strong>
            </TableCell>
            <TableCell align="center">{city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <strong>Departure Location</strong>
            </TableCell>
            <TableCell align="center">
              Islamabad International Airport
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <strong>Return</strong>
            </TableCell>
            <TableCell align="center">{endDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <strong>Includes</strong>
            </TableCell>
            <TableCell align="right">
              <Grid container justifyContent="flex-end">
                {facilities.map((facility, index) => {
                  return (
                    <Grid key={index} item xs={4}>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="error" />
                          </ListItemIcon>
                          <ListItemText primary={facility} />
                        </ListItem>
                      </List>
                    </Grid>
                  );
                })}
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default TourDetailsTable
