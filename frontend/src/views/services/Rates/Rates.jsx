import React from 'react'
import { Card, CardBody } from 'reactstrap'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const Rates = () => {

    const titleStyle = {
      color: 'rgb(105,105,105)',
      fontSize: '12.8px',
      fontWeight: '700px',
      margin: '2px'
    };

    const normalTextStyle ={
        color: 'rgb(105,105,105)',
        fontSize: '12.8px',
        margin: '2px'
    };

    const tableHeaders = [
        "Assigned\nOrder",
      "Partner",
      "Route",
      "Rate Id",
      "Rate\nPlan",
      "Change",
      "Tech\nPrefix",
      "Prefix",
      "Description",
      "Currency",
      "Rate",
      "Effective Since",
      "Valid\nBefore",
      "Pulse",
      "Min\nDuration\n(Sec)",
      "Country",
      "Round\nDigits\nafter\nDecimal\nfor Rate\nAmount",
      "Other\nAmount1",
      "Other\nAmount2",
      "Other\nAmount3",
      "Fixed\nCharge\nDuration\n(Sec)",
      "Fixed\nCharge\nAmount",
      "Category",
      "Sub Category"
      ];
    


  return (
    <div>
        <Card>
        
        <CardBody>

            {/* filtering section */}

            <h1 style={titleStyle}>Select a period over which rates are effective</h1>

            <div className='row'>

                <div className='col-6 d-flex justify-content-space-between'>

                    <div>
                        <span style={normalTextStyle}>Start Year/Month:</span>
                        <input type='text' placeholder='2024' style={{width: '45px',paddingLeft:"5px"}} />


                    </div>


                    <div>

                    </div>

                </div>


                <div className='col-6'>

                </div>

            </div>




               {/* table section */}

            <div className='mt-4' style={{overflowX :'scroll'}}>    

       <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  {
                    tableHeaders?.map((item,index) => 
                      <th key={index}>{item}</th>
                  )}
                 
                </TableRow>
              </TableHead>
              <TableBody>
                <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td>2357877</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>+88013</td>
                    <td>Grameen Phone</td>
                    <td>N/A</td>
                    <td>0.01000000</td>
                    <td>2020-02-14 00:00:00	</td>
                    <td></td>
                    <td>1</td>
                    <td>0</td>
                    <td>Bangladesh</td>
                    <td>0</td>
                    <td>0.00000000</td>
                    <td>0.00000000</td>
                    <td>0.00000000</td>
                    <td>0</td>
                    <td>0.000000</td>
                    <td>
                    <select disabled="true" class="form-select mt-2" style={{borderRadius: '5px', height: '28px', width: '130px'}}>
                    <option selected>Call</option>
                   
                    </select>
                    </td>
                    <td>
                    <select disabled="true" class="form-select mt-2" style={{borderRadius: '5px', height: '28px', width: '130px'}}>
                    <option selected>Voice</option>
                   
                    </select>
                    </td>
                </tr>
               
              </TableBody>
            </Table>


       </div>

        </CardBody>

        </Card>
        </div>
  )
}

export default Rates