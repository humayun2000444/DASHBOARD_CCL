import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const Rates = () => {

  const [showTableData, setShowTableData] = useState(false);

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

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      const serviceArray = [
        "[ All]",
    "A2Z Prefix or Destinations [Call]",
    "International Incoming Charges @T1 IGW [Call]",
    "International Outgoing [XYZ] Rates @T1 IGW [Call]",
    "Toll Free Egress Chaging [Call]",
    "International Outgoing [ICX] [Call]"
      ];


      const ratePlanArray = [
        " All",
    "Outgoing XYZ @IGW",
    "IOS Charge Intl In",
    "BD Incoming",
    "test",
    "Etisalat_SUP",
    "Arelion_SUP",
    "Cetin_SUP",
    "Ventatel_SUP",
    "Mie_SUP",
    "TM_SUP",
    "HGC_SUP",
    "Orange_SUP",
    "Sparkle_SUP",
    "China Mobile_SUP",
    "Singtel_SUP",
    "FTDL_SUP",
    "telstra_SUP",
    "telenorlinx_SUP",
    "SHINETOWN_SUP",
    "Celcom_SUP",
    "Vodafone",
    "test2",
    "Digi_SUP",
    "WIND Tre._SUP",
    "NEPAL TEL._SUP",
    "JIO_SUP",
    "TIS_SUP",
    "PTCL_Sup"
      ];

      const categoryArray = [
        
        "Call",
        "Message",
        "Data/Internet Without Metering"
      ];

      const subCategoryArray = [
        
        "Voice",
        "Video",
        "FAX",
        "SMS",
        "MMS"

        ];


        const changeTypeArray = [
          
          "New",
          "Increase",
          "Decrease",
          "Unchanged"
      ];



    


  return (
    <div>
        <Card>
        
        <CardBody>

            {/* filtering section */}

            <span style={{color: "#696969", fontWeight: "700"}}>Select a period over which rates are effective</span>

            <div className='row mt-2'>

                <div className='col-6 d-flex justify-content-space-between'>

                    <div>
                        <span style={normalTextStyle}>Start Year/Month:</span>
                        <input className='ml-1 mr-5' type='text' defaultValue="2024" onChange={(e) =>{
                          console.log(e.target.value);
                        }} style={{width: '45px',paddingLeft:"5px"}} />
                        <span style={normalTextStyle}>End Year/Month:</span>
                        <select class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '150px'}}>
                        <option selected></option>
                      {
                        months?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                        
                      </select>

                      <br/>

                      <span style={{...normalTextStyle, marginRight: '108px'}}>Start Date [Time]:</span>
                      <span style={normalTextStyle}>End Date [Time]:</span>
                      <input type="date" style={{width: '185px'}} className='ml-2 mr-2' />
                      <span style={{color: '#696969', fontWeight: "700"}}>[*Valid Before]</span>
                      <br/>
                      <input type="date" style={{width: '185px'}} />
                     
                        
                        

                    </div>


                    <div>

                    </div>

                </div>


                <div className='col-6'>

                  <span style={{color: "#696969", fontWeight: "700"}}>Quick Select Period </span>
                  <input type='checkbox' className='ml-3 mr-1' />
                  <span style={{color: "#696969", fontWeight: "700"}}>All Period when viewing one Rate Plan</span>

                  <div className='mt-1 ml-2'>

              
                    <input type="radio" id="1" name="selectPeriod"/>
                    <span for="1" className='mr-2'>Recent</span>
                    <input type="radio" id="2" name="selectPeriod" />
                    <span for="2" className='mr-2'>Last 7 Days</span>
                    <input type="radio" id="3" name="selectPeriod" />
                    <span for="3" className='mr-2'>Next 7 Days</span>
                  <input type="radio" id="4" name="selectPeriod" />
                    <span for="4" className='mr-2'>Last 6 Months</span>
                  <input type="radio" id="5" name="selectPeriod" />
                    <span for="5">Last 1 Year</span>

                  <br/>

                    <input type="radio" id="6" name="selectPeriod"/>
                    <span for="6" className='mr-2'>Today</span>
                    <input type="radio" id="7" name="selectPeriod" />
                    <span for="7" className='mr-2'>Last 30 Days</span>
                    <input type="radio" id="8" name="selectPeriod" />
                    <span for="8" className='mr-2'>Next 30 Days</span>
                  <input type="radio" id="9" name="selectPeriod" />
                    <span for="9" className='mr-2'>Next 6 Months</span>
                  <input type="radio" id="10" name="selectPeriod" />
                    <span for="10">Last 1 Year</span>
               
                   

                  </div>

                </div>

            </div>



            <div className='mt-2'>

              <span style={{color: '#8B4500'}}>[Enter only Date in "yyyy-MM-dd (e.g. 2012-11-21) or Date+Time in "yyyy-MM-dd HH:mm:ss" (e.g. 2012-11-21 19:01:59)
                 format]</span>

                 <div className='row mt-2'>

                  <div className='col-4'>

                    <span style={{...normalTextStyle,paddingLeft: '85px'}} >Service:</span>
                    <select class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '326px'}}>
                        <option selected></option>
                      {
                        serviceArray?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                        
                      </select>

                      <br/>

                      <span style={{...normalTextStyle,paddingLeft: '71px'}}>Rate Plan:</span>
                    <select class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '150px'}}>
                        <option selected></option>
                      {
                        ratePlanArray?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                        
                      </select>

                      <span style={{marginRight: '8px', cursor: "pointer", color: '#034af3', fontSize: '12.8px', textDecoration: 'underline'}} className='ml-2'>(New Rate)</span>

                      <span style={{cursor: 'pointer',color: '#034af3', fontSize: '12.8px',  textDecoration: 'underline'}}>(Delete Rates)</span>

                      <br/>

                    <span style={{...normalTextStyle,paddingLeft: '81px'}}>Prefix[*]:</span>
                    <input class="form-select ml-1 mb-2" style={{borderRadius: '5px', width: '185px'}}/>
                    

                    <br/>

                    <span style={{...normalTextStyle,paddingLeft: '17px'}}>Description Having:</span>
                    <input class="form-select ml-1 mb-2" style={{borderRadius: '5px', width: '185px'}}/>




                  </div>

                  <div className='col-4'>

                  <span style={{...normalTextStyle,paddingLeft: '97px'}} >Partner:</span>
                    <select disabled='true' class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '326px'}}>
                        <option selected>All</option>
                    
                        
                      </select>

                      <br/>

                      <span style={{...normalTextStyle,paddingLeft: '105px'}} >Route:</span>
                    <select disabled='true'  class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '45px'}}>
                        <option selected>[All]</option>
                    
                        
                      </select>

                      <br/>

                    <span style={{...normalTextStyle,paddingLeft: '30px'}} >Assigned Direction:</span>
                    <select disabled='true'  class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '85px'}}>
                      <option selected>customer</option>

                      
                    </select>


                    <br/>

                    <span style={normalTextStyle} >Assigned Order [0 = All]:</span>
                    <input disabled='true' value='0'  class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '85px'}}/>
                   
                  </div>


                  <div className='col-4'>

                  <span style={{...normalTextStyle,paddingLeft: '28px'}} >Category:</span>
                    <select class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '204px'}}>
                        <option selected>[All]</option>
                        {
                        categoryArray?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                    
                        
                      </select>

                      <br/>

                      <span style={{...normalTextStyle,paddingLeft: '0px'}} >Sub Category:</span>
                    <select class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '204px'}}>
                        <option selected>[All]</option>
                        {
                        subCategoryArray?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                    
                        
                      </select>

                      <br/>

                      <span style={{...normalTextStyle,paddingLeft: '3px'}} >Change Type:</span>
                    <select class="form-select ml-1 mb-2" style={{borderRadius: '5px', height: '28px', width: '204px'}}>
                        <option selected>All</option>
                        {
                        changeTypeArray?.map((singleElement,index) => 
                          <option value={singleElement} key={index}>{singleElement}</option>
                        
                        )
                      }
                    
                        
                      </select>

                      

                  </div>

                 </div>
            </div>


            {/* find button */}


            <div className='mt-2'> 

              <button onClick={()=>{
                setShowTableData(true);
              }} className='btn btn-primary' style={{width: '117px'}}>
                 Find         
              </button>

            </div>




               {/* table section */}

           {
            showTableData ? 

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

            :

            <>
            </>
     
           }


        </CardBody>

        </Card>
        </div>
  )
}

export default Rates