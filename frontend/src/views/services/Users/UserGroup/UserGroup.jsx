import { faEllipsis, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import React from "react";
import { Card, CardBody } from "reactstrap";

const UserGroup = () => {
  return (
    <div>
      <div className="border-bottom d-flex justify-content-between">
        <h4>Registerd users</h4>
        <Button
          className="mb-3"
          variant="outlined"
          style={{
            borderColor: "gray",
            borderRadius: "5px",
          }}
        >
          <span className="pr-2">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          New Group
        </Button>
      </div>
      {/* table */}
      <table class="table mt-5">
        <thead class="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Group Id</th>
            <th scope="col">Group Name</th>
            <th scope="col">Created on</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Bangladesh</td>
            <td>012345</td>
            <td>08 Mar</td>
            <td>
              <Button type="text" style={{ fontSize: "25px" }}>
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserGroup;
