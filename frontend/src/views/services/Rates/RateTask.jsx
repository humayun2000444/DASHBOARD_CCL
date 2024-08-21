import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const RateTask = () => {

    const typeArray = [

        "All",
        "Validation Errors",
        "Code End",
        "New Codes",
        "Increase",
        "Decrease",
        "Unchanged",
        "Incomplete",
        "Overlap",
        "Overlap Adjusted",
        "Rate Param Conflict",
        "Rate Position Not Found",
        "Existing"
      ];


      const tableHeaders = [

        "Selected",
        "Complete",
        "Type",
        "Execution Order",
        "Prefix",
        "Description",
        "Rate",
        "Effective Since",
        "Valid Before",
        "Pulse",
        "Min Duration\n(Sec)",
        "Country",
        "Round Digits after Decimal for\nRate Amount",
        "Other\nAmount\n1",
        "Other\nAmount\n2",
        "Other\nAmount\n3",
        "Other\nAmount 4",
        "Other\nAmount 5",
        "       ",
        "       "

      ];


      const checkUploadedFile = (event) => {
        const file = event.target.files[0];

        console.log(file);
        
        
      };

  return (
    <div>
        <Card>
            <CardBody>

             <div>
             <span style={{color: '#696969'}}>Rate Plan: </span> 
                <span className='ml-3' style={{color: '#696969', fontWeight: '700'}}>Etisalat_SUP</span>
                <span className='ml-3' style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Rates</span>
                <span className='ml-3' style={{color: '#696969', fontWeight: '700'}}>Reference Time Zone:</span>
                <span className='ml-1' style={{color: '#696969'}}>United Kingdom GMT+0:0 [ GMT] [Europe/London] </span>
                <span className='ml-3' style={{color: '#696969', fontWeight: 'bold'}}>Task Reference:</span>
                <select className='ml-1'>
                    <option selected>Etisalat_24Jun24</option>
                    <option>Default</option>
                </select>
                <span className='ml-2' style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>Rename</span>
                <span className='ml-4' style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>New Task Reference</span>
             </div>

             <div className='mt-3'>
                <span>Create or Import New Rate Task</span>
                <input type='checkbox' className='ml-3' />
                <span className='ml-1'>Auto Adjust effective Date/Time for New/Import Task</span>
                <input type='checkbox' className='ml-3' />
                <span className='ml-1'>Auto Detect Country Code</span>

             </div>


             <div className='mt-2'>
                <input type='checkbox' />
                <span className='ml-1'>Default Effective Date (Own TZ) </span>
                <input type='date' className='ml-4' style={{borderRadius: '5px'}}/>
                <span className='ml-1'>Time:</span>
                <input className='ml-1' type='text' defaultValue="00:00:00" style={{borderRadius: '5px'}}/>
                <span className='ml-1'>(Effective date for prefixes if not specified)</span>

             </div>

             <div className='mt-3'>

                <span>Create</span>
                <span className='ml-2' style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>New Rate Task</span>
                <span className='ml-1'>Or</span>
                <span className='ml-2'style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Code Delete Task with Helper</span>
                <span className='ml-1'>Or</span>
                <span className='ml-2'style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>Import</span>
                <span className='mx-1'>Rate Sheet</span>
                <input type="file" accept=".csv" onChange={checkUploadedFile}/>

             </div>

             <div className='mt-3'>
                <span className='mr-1'>Find Prefix [*]</span>
                <input className='mr-1' type='text' style={{borderRadius: '5px'}} />
                <span className='mr-1'>and Search Description</span>
                <input type='text' className='mr-1'  style={{borderRadius: '5px'}} />
                <span className='mr-1'>and, Type:</span>
                <select className='mr-1'  style={{borderRadius: '5px'}}>
                    <option selected>Complete</option>
                    {
                        typeArray?.map((singleItem,index)=>
                        <option key={index} value={singleItem}>{singleItem}</option>
                        )
                    }
                </select>
                <button className='btn btn-primary mr-1'>Find</button>
                <button className='btn btn-primary mr-1'>Find & Select</button>
                <button className='btn btn-primary'>Export</button>

             </div>


             <div className='mt-3'>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline", cursor:'pointer'}}>Total:26197</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Complete:26197</span>
                <span className='' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Incomplete:0</span>

                <span className=' ml-4 mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Validation Error:0</span>
                <span className='' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Overlap:0</span>

                <span className='ml-5 mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Rate Param Conflict:0</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Rate Position Not Found:0</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Existing:0</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Code End:0</span>
                
                <br/>

                <span className='mr-2'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>New:2911</span>
                <span className='mr-2'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Increase:1797</span>
                <span className='mr-1'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>Unchanged:18644</span>
                <span className='mr-1'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}}>OverlapAdjusted:0</span>

             </div>


             <div className='mt-3'>

                <input type='checkbox' defaultChecked="true" />
                <span className='ml-1' style={{color: '#696969'}}>Continue with next on Error</span>

                <input className='ml-5' type='checkbox' defaultChecked="true" />
                <span className='ml-1' style={{color: '#696969'}}>Continue with next on Overlap</span>

                <input className='ml-5' type='checkbox' />
                <span className='ml-1' style={{color: '#696969'}}>Auto Adjust Overlap</span>

                <span className='ml-5 mr-3' style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>Commit Changes</span>
                <span className='mr-3' style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>Delete All</span>
                <span className='mr-3' style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>Delete Completed</span>
                <span className='mr-3' style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>Delete Selected</span>

             </div>


             {/* Rate Task Table Data Shown Here */}


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
        <tr>
            <td>
                <input type='checkbox'/>
            </td>
            <td>
                <input type='checkbox' defaultChecked='true' disabled/>
            </td>
            <td>Unchnaged</td>
            <td>0</td>
            <td>1201</td>
            <td>USA</td>
            <td>0.002000</td>
            <td>2024-07-01 06:00:00</td>
            <td></td>
            <td>1</td>
            <td>0</td>
            <td>USA, Canada & Other (1)</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1/1</td>
            <td>0.000000</td>
            <td style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Edit</td>
            <td style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Delete</td>
            
        </tr>
       </TableBody>
     </Table>


</div>


            </CardBody>
        </Card>
    </div>
  )
}

export default RateTask