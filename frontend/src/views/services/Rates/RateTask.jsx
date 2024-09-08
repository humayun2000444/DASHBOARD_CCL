import React, { useState,useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Select from "react-select";
import getRateTaskServices from '../../../apiServices/RateTaskServices/getRateTaskServices';
import { X } from 'react-feather';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';

const RateTask = () => {


const [apiData,setApiData] = useState([]);
const [primaryData,setPrimaryData] = useState([]);
const [open,setOpen] = useState(false);
const [loadData,setLoadData] = useState(true);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 900,
  backgroundColor: "background.paper",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
  padding: 4,
  overflowY: "scroll",
  maxHeight: "98%",
};

const fetchingRateTask = async ()=>{
  try {
  const data = await getRateTaskServices.fetchAllRateTask();
  console.log(data);
  setApiData(data);
  setPrimaryData(data);
  setLoadData(false);
  
    
  } catch (error) {
    console.log(error);
  }

}

useEffect(()=>{

  
    fetchingRateTask();
   
  
  
},[loadData])

console.log(open)




const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '200px',
    display: 'inline-block',
    marginRight:'8px',

  }),
  control: (provided) => ({
    ...provided,

    minHeight: '20px',

    fontSize: '12px', // Adjust font size if needed
  }),
  valueContainer: (provided) => ({
    ...provided,
    
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorsContainer: () => ({
    padding: '0px' 
  }),
};


const handleSubmit = (e) => {

  e.preventDefault();
  const subData = new FormData(e.target);
  const formValues = {};
  subData.forEach((value, key) => {
    formValues[key] = value;
  });

  try{
    axios.post(`http://192.168.0.205:5070/new-task`,formValues)
    .then(res => console.log(res));
    setLoadData(true);
  }
  catch(e){
    setLoadData(true);
  }
  }
  // console.log(formValues); 





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
        "Other\nAmount 6",
        "Other\nAmount 7",
        "Other\nAmount 8",
        "Fixed\nCharge\n Duration (Sec)",
        "Fixed\nCharge\nAmount",
        "Categoty",
        "Sub Category",
        "Validation\nError(s)",
        "       ",
        "       "

      ];



      const checkUploadedFile = (event) => {
        const file = event.target.files[0];

        console.log(file);
        
        
      };
      const types = [
        { label: "All", value: "All" },
        { label: "Validation Errors", value: "Validation Errors" },
        { label: "Code End", value: "Code End" },
        { label: "New Codes", value: "New Codes" },
        { label: "Increase", value: "Increase" },
        { label: "Decrease", value: "Decrease" },
        { label: "Unchanged", value: "Unchanged" },
        { label: "Complete", value: "Complete" },
        { label: "Incomplete", value: "Incomplete" },
        { label: "Overlap", value: "Overlap" },
        { label: "Overlap Adjusted", value: "Overlap Adjusted" },
        { label: "Rate Param Conflict", value: "Rate Param Conflict" },
        { label: "Rate Position Not Found", value: "Rate Position Not Found" },
        { label: "Existing", value: "Existing" }
      ];
      // const uniqueValues = new Set();
      // apiData.forEach(X =>{
      //   uniqueValues.add(X.type);
      // })






      // console.log(uniqueValues);


    

        const [typeLabel, setTypeLabel] = useState("");
        const [typeValue, setTypeValue] = useState("");

        let typeMenu = primaryData?.map((elpt) => ({
          label: elpt?.type,
          value: elpt?.type,
        }));
   
        const uniqueArray = [
          ...new Map(typeMenu.map(item => [item.label, item])).values()
        ];
     

        const selectType = (label, value) => {
          setTypeLabel(label);
          setTypeValue(value);
        
        };
  

      const [prefixObj,setPrefixObj]= useState({
        prefix:"",
        search:"",
        type:""
      })

      console.log(prefixObj.type);
      
      let mainUrl = "";

      const handleChange=(e)=>{
        const { name, value } = e.target;
        setPrefixObj((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setApiData(primaryData);
      }

      const handleChangeSelect = (opt)=>{
        selectType(opt.label, opt.value)
        setPrefixObj(prev=>{
          return {
            ...prev,
            type:opt.label
          }
        })
        setApiData(primaryData);
      }
      
      let prefix = prefixObj.prefix.trim();
      let search = prefixObj.search.trim();
      let type = prefixObj.type;

      mainUrl = `https://baseusrl.com?${prefix && `prefix=` + prefix}${prefix && search && "&"}${search && `search=` + search}${(prefix || search) && type && "&"}${type && `type=` + type}`;

      const callApi = () => {
         const newData = apiData?.filter(data => data?.prefix === prefixObj?.prefix || data?.description === prefixObj?.search || data?.type === prefixObj?.type);
         console.log(newData);
         setApiData(newData);
      }

      const handleApiClick = (value)=>{
        setPrefixObj(prev=>{
          return {
            ...prev,
            type:value
          }
        })
        setTypeValue(value);
        setTypeLabel(value);
      }

      console.log(mainUrl);




    
    

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
                <span className='ml-2' style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}onClick={()=> setOpen(true)}>New Rate Task</span>
                <span className='ml-1'>Or</span>
                <span className='ml-2'style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Code Delete Task with Helper</span>
                <span className='ml-1'>Or</span>
                <span className='ml-2'style={{color: '#034af3', textDecoration: 'underline',cursor:'pointer'}}>Import</span>
                <span className='mx-1'>Rate Sheet</span>
                <input type="file" accept=".csv" onChange={checkUploadedFile}/>

             </div>

             <div className='mt-3'>
                <span className='mr-1'>Find Prefix [*]</span>
                <input className='mr-1' type='text' style={{borderRadius: '5px'}} value={prefixObj.prefix} name='prefix'  onChange={(e)=>handleChange(e)}/>
                <span className='mr-1'>and Search Description</span>
                <input type='text' className='mr-1'  style={{borderRadius: '5px'}} value={prefixObj.search} name="search"  onChange={(e)=>handleChange(e)}/>
                <span className='mr-1'>and, Type:</span>
              
           
                <Select
              styles={customStyles}
             value={{
                       label: typeLabel,
                       value: typeValue,
                     }}
             onChange={(opt) => handleChangeSelect(opt)}
             options={uniqueArray}
           />
          
                <button className='btn btn-primary mr-1' onClick={callApi}>Find</button>
                <button className='btn btn-primary mr-1'>Find & Select</button>
                <button className='btn btn-primary'>Export</button>

             </div>


             <div className='mt-3'>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline", cursor:'pointer'}} onClick={()=>handleApiClick("All")}>Total:0</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Complete")}>Complete:0</span>
                <span className='' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Incomplete")}>Incomplete:0</span>


                <span className=' ml-4 mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Validation Errors")}>Validation Error:0</span>
                <span className='' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Overlap")}>Overlap:0</span>

                <span className='ml-5 mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Rate Param Conflict")}>Rate Param Conflict:0</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Rate Position Not Found")}>Rate Position Not Found:0</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Existing")}>Existing:0</span>
                <span className='mr-1' style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Code End")}>Code End:0</span>
                
                <br/>

                <span className='mr-2'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("New Codes")}>New:0</span>
                <span className='mr-2'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Increase")}>Increase:0</span>
                <span className='mr-2'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Decrease")}>Decrease:0</span>
                <span className='mr-1'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Unchanged")}>Unchanged:0</span>
                <span className='mr-1'style={{color: '#a52a2a',textDecoration:"underline",cursor:'pointer'}} onClick={()=>handleApiClick("Overlap Adjusted")}>OverlapAdjusted:0</span>

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


             <div className='mt-4' style={{overflowX: "scroll"}}>

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
          <td>
                <input type='checkbox'/>
            </td>
            <td>
                <input type='checkbox' defaultChecked='true' disabled/>
            </td>
            <td>{item?.type}</td>
            <td>{item?.executionOrder}</td>
            <td>{item?.prefix}</td>
            <td>{item?.description}</td>
            <td>{item?.rateAmount}</td>
            <td>{item?.startDate}</td>
            <td>{item?.endDate}</td>
            <td>{item?.resolution}</td>
            <td>{item?.minDurationSec}</td>
            <td>{item?.countryCode}</td>
            <td>{item?.rateAmountRoundupDecimal}</td>
            <td>{item?.otherAmount1}</td>
            <td>{item?.otherAmount2}</td>
            <td>{item?.otherAmount3}</td>
            <td>{item?.otherAmount4}</td>
            <td>{item?.otherAmount5}</td>
            <td>{item?.otherAmount6}</td>
            <td>{item?.otherAmount7}</td>
            <td>{item?.otherAmount8}</td>
            <td>{item?.surchargeTime}</td>
            <td>{item?.surchargeAmount}</td>
            <td>
            <select disabled="true" style={{width: "204px"}}>
            <option selected>{item?.category}</option>
            </select>
            </td>
            <td>
            <select disabled="true" style={{width: "100px"}}>
            <option selected>{item?.subCategory}</option>
            </select>
            </td>
            <td>{item?.field2}</td>
            <td style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Edit</td>
            <td style={{color: '#034af3', textDecoration: 'underline', cursor:'pointer'}}>Delete</td>
          </tr>
          </>)
         }
</TableBody>
     </Table>


</div>

{


  open ?

  <div>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Task Rate
          </Typography>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="prefix">
                  <Form.Label>Prefix: </Form.Label>
                  <Form.Control
                    type="text"
                    name="prefix"
                    required
                  />
                </Form.Group>
                {/* dropdown */}
                <Form.Group controlId="country">
                  <Form.Label>Country: </Form.Label>
                  <Form.Control
                    as="select"
                    name="country"
                    //   value={formData.userStatus}
                   
                  >
                    <option value="">Choose...</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description: </Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="rateAmount">
                  <Form.Label>Rate Amount: </Form.Label>
                  <Form.Control
                    type="text"
                    name="rateAmount"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="pulse">
                  <Form.Label>Pulse: </Form.Label>
                  <Form.Control
                    type="text"
                    name="pulse"
                    placeholder="1"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="minDuration">
                  <Form.Label>Minimum Duration: (Sec) </Form.Label>
                  <Form.Control
                    type="text"
                    name="minDuration"
                    placeholder="0"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="effectiveFrom">
                  <Form.Label>Effective From: [Own TZ]: <br/> Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="effectiveFrom"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="time">
                  <Form.Label>Time:</Form.Label>
                  <Form.Control
                    type="text"
                    name="time"
                    placeholder="00:00:00"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="validBefore">
                  <Form.Label>
                  Valid Before: [Own TZ] <br/> Date:
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="validBefore"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="time">
                  <Form.Label>Time: </Form.Label>
                  <Form.Control
                    type="text"
                    name="time"
                    placeholder="00:00:00"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="otherAmount1">
                  <Form.Label>Other Amount 1: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount1"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="otherAmount2">
                  <Form.Label>Other Amount 2: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount2"
                    required
                  />

                  
                </Form.Group>
              </Col>

              <Col md={6}>
            

                <Form.Group controlId="otherAmount3">
                  <Form.Label>Other Amount 3: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount3"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="otherAmount4">
                  <Form.Label>Other Amount 4: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount4"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="otherAmount5">
                  <Form.Label>Other Amount 5: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount5"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="otherAmount6">
                  <Form.Label>Other Amount 6: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount6"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="otherAmount7">
                  <Form.Label>Other Amount 7: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount7"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="otherAmount8">
                  <Form.Label>Other Amount 8: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherAmount8"
                    required
                  />
                </Form.Group>

                  {/* dropdown */}
                  <Form.Group controlId="category">
                  <Form.Label>Category: </Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    //   value={formData.userStatus}
                   
                  >
                    <option value="">Choose...</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </Form.Control>
                </Form.Group>


                  {/* dropdown */}
                  <Form.Group controlId="subCategory">
                  <Form.Label>Sub Category: </Form.Label>
                  <Form.Control
                    as="select"
                    name="subCategory"
                    //   value={formData.userStatus}
                   
                  >
                    <option value="">Choose...</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="fixedInitialPeriod">
                  <Form.Label>Fixed Initial Period (Sec):</Form.Label>
                  <Form.Control
                    type="text"
                    name="fixedInitialPeriod"
                    placeholder="0"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="chargeForFixedInitialPeriod">
                  <Form.Label>Charge for Fixed Initial Period:</Form.Label>
                  <Form.Control
                    type="text"
                    name="chargeForFixedInitialPeriod"
                    placeholder="0"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="defaultFixroundDigitsAfterDecimalForRateAmountedChargeAmount">
                  <Form.Label>Round Digits after Decimal for Rate Amount: </Form.Label>
                  <Form.Control
                    type="text"
                    name="roundDigitsAfterDecimalForRateAmount"
                    placeholder="0"
                    required
                  />
                </Form.Group>

               
          
              </Col>
            </Row>
            <Button className="mt-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </div>

    :

    null

}


            </CardBody>
        </Card>
    </div>
  )
}

export default RateTask