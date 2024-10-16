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
import { useToasts } from "react-toast-notifications";
import * as actions from "../../../../redux/actions/notice/noticeForEmployee/noticeForEmployee";
import NoticeForEmployeeCreate from "./form";

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

const NoticeForEmployeeList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // useEffect(() => {
  //   props.fetchAllNoticeForEmployee();
  // }, []);

  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteNoticeForEmployee(id, () =>
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
    <div className="row">
      <div item className="col-md-3">
        <NoticeForEmployeeCreate {...{ currentId, setCurrentId }} />
      </div>
      <div item className="col-md-9">
        <h1>Employee Notice List</h1>

        <Button
          color="success"
          style={{ marginTop: "3px" }}
          type="submit"
          className="btn btn-primary"
          onClick={NoticeForEmployeeCreate}
        >
          Add
        </Button>
        <TableContainer>
          <Table>
            <TableHead className={classes.root}>
              <TableRow>
                <TableCell>Notice Item</TableCell>
                <TableCell>Employee Id</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.noticeForEmployeeList.map((record, index) => {
                return (
                  <TableRow key={index} hover>
                    <TableCell>{record.noticeItemId}</TableCell>
                    <TableCell>{record.employeeId ?? "N?A"}</TableCell>

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
          count={props.noticeForEmployeeList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  noticeForEmployeeList: state.noticeForEmployee.list,
});

const mapActionToProps = {
  fetchAllNoticeForEmployee: actions.fetchAll,
  deleteNoticeForEmployee: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(NoticeForEmployeeList));
