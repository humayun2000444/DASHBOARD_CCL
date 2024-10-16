import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import * as actions from "../../../../redux/actions/core/country/country";
import CountryCreate from "./form";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const CountryList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // useEffect(() => {

  //   props.fetchAllCountry()

  // },[] )

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteCountry(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div elevation={3}>
      <div className="row">
        <div item className="col-md-4">
          <CountryCreate {...{ currentId, setCurrentId }} />
        </div>
        <div item className="col-md-8">
          <h1>Country List</h1>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>States</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell>Clients</TableCell>
                  <TableCell>Company Information Count</TableCell>
                  <TableCell>Contact Information Count</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.countryList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>
                        <Link to="/stateList">{record.statesCount}</Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/employeeList">{record.employeesCount}</Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/clientList">{record.clientsCount}</Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/companyInformationList">
                          {record.companyContactsInformationsCount}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/contactInformationList">
                          {record.contactInformationsCount ?? "N?A"}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => onDelete(record.id)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.countryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  countryList: state.country.list,
});

const mapActionToProps = {
  fetchAllCountry: actions.fetchAll,
  deleteCountry: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CountryList));
