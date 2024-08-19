import React from 'react'
import { Card, CardBody } from 'reactstrap'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const RatePlanAssignment = () => {

    const serviceArray = [
        
        "A2Z Prefix or Destinations [Call]",
        "International Incoming Charges @T1 IGW [Call]",
        "International Outgoing [XYZ] Rates @T1 IGW [Call]",
        "Toll Free Egress Chaging [Call]",
        "International Outgoing [ICX] [Call]"
    ];

    const assignedDirectionArray = [

        "Customer",
        "Supplier"
    ];


    const tableHeaders = [

        "Service",
        "Assigned\nOrder",
        "Assigned\nDirection",
        "Partner",
        "Router",
        "Rate Plan",
        "Billing Rule",
        "Effective Since",
        "Valid Before",
        "Exclude from LCR",
        "                 "
    ]


  return (
    <div>

    <Card>

        <CardBody>

     {/* create a new rate plan */}

        <button className='btn btn-primary mb-2'>New Rate Plan Assignment</button>

        {/* filter section here */}

        <div className='my-3 row'>

            <div className='col-3'>
                <span>Partner</span>
                <input className='ml-2' type='text' style={{width: "108px", borderRadius: "5px"}}/>
            

            </div>

            <div className='col-3'>
            <span>Effective on a Date</span>
            <input className='ml-2' type='date' style={{width: "108px", borderRadius: "5px"}}/>
            </div>

            <div className='col-3'>
            <span>Service:</span>
            <select class="form-select ml-2" style={{borderRadius: '5px', height: '28px', width: '108px'}}>
                        <option selected>[All]</option>
                      {
                        serviceArray?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                        
                      </select>

            </div>

            <div className='col-3'>
            <span>Assigned Direction:</span>
            <select class="form-select ml-2" style={{borderRadius: '5px', height: '28px', width: '108px'}}>
                        <option selected>[All]</option>
                      {
                        assignedDirectionArray?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                        
                      </select>
                      <button className='btn btn-primary ml-3 px-5'>Find</button>
            </div>

        </div>


        {/* table data shown here */}


        <span style={{color: "#696969", fontWeight: 'bold'}}>Assigned Rateplans</span>


        <div className='mt-2' style={{overflowX :'scroll'}}>    

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
             <td>A2Z Prefix or Destinations</td>
             <td>1</td>
             <td>Supplier</td>
             <td>2357877</td>
             <td>Pakistan Telecommunication Company Limited(PTCL) (10217)</td>
             <td>-</td>
             <td>   <select disabled='true' class="form-select" style={{borderRadius: '5px', height: '28px', width: '120px'}}>
                        <option selected>PTCL_Sup</option>
                     
                        
                      </select></td>
             <td><select disabled='true' class="form-select" style={{borderRadius: '5px', height: '28px', width: '130px'}}>
                        <option selected>OnFirstDayOfEachMonth</option>
                     
                        
                      </select></td>
             <td>2000-01-01 00:00:00</td>
             
             <td>No</td>
             <td>
                <span className='mr-2' style={{textDecoration: 'underline', color: '#034af3',cursor: "pointer"}}>Edit</span>
                <span className='mr-2' style={{textDecoration: 'underline', color: '#034af3', cursor: "pointer"}}>Delete</span>
                <span style={{textDecoration: 'underline', color: '#034af3', cursor:"pointer"}}>Rates</span>
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

export default RatePlanAssignment