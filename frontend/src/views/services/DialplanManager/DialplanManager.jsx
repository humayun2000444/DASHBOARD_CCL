import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import Select from "react-select";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const DialplanManager = () => {

     const [apiData,setApiData] = useState([]);


    const tableHeaders = [
        "ID",
        "Call Scource",
        "Prefix",
        "Dialplan Name",
        "Description",
        "Priority",
        "Action"
        
    ];


  return (
    <div>

    {/* breadcrumb section */}

    <span className='mr-2'>Dashboard</span>
    <span><i class="fas fa-chevron-right"></i></span>
    <span className='ml-2'>Dialplan Manager</span>

    <h1 className='mt-3'>Dialplan Manager</h1>

    {/* filter section */}

    <Card className='mt-3 pb-3 pt-2'>
        <CardBody>

            <p style={{fontSize: "16px", fontWeight: "600"}}>Filter Details</p>


            <div className='row'>

                <div className='col-3'>

                    <input type='text' className='w-100' style={{ height: "37px", borderRadius: "5px", border: "1px solid rgba(0,0,0,.125)", paddingLeft: '10px'}} placeholder='Call Source' />

                </div>


                <div className='col-3'>

                <Select
             placeholder="Dialplan Manager"
           />

                </div>


                <div className='col-3'>

                <Select
             placeholder="Prefix"
           />

                </div>


                <div className='col-3'>
                    <button className="btn btn-primary py-2 px-5">Check</button>

                </div>

            </div>
        </CardBody>
    </Card>


    {/* data showw section */}

    <Card>
        <CardBody>

        <div className='mt-4'>

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
 {
  apiData?.map((item,index) => <>
  <tr>
  
    <td>{item?.otherAmount6}</td>
    <td>{item?.otherAmount7}</td>
    <td>{item?.otherAmount8}</td>
    <td>{item?.surchargeTime}</td>
    <td>{item?.surchargeAmount}</td>
    <td>{item?.field2}</td>
    <td ><span style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Edit</span><span style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Delete</span></td>
    
  </tr>
  </>)
 }
</TableBody>
</Table>


</div>

        </CardBody>
    </Card>

    </div>
  )
}

export default DialplanManager