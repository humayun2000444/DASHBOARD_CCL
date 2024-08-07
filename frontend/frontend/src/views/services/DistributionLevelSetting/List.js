import React, { useState } from 'react';
import remove from '../../../helpers/remove';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { permissionList } from '../../../constants/AuthorizationConstant';
import ButtonLoader from '../Components/ButtonLoader';


const DistributionLevelSettingList = (props) => {

    const {success, setSuccess, distributionData, toggleUpdate} = props;
    const [deleteModal,setDeleteModal] = useState(false);
    const [delData,setDelData] = useState({});
    const {addToast} = useToasts();
    const [buttonStatus,setButtonStatus] = useState(false);
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const [progress,setProgress] = useState(false);
   

    

    const toggleDanger = (data) => {
        setDelData(data);
        setDeleteModal(true);

    }

    const confirmDelete = () => {
      setButtonStatus(true);
      setProgress(true);
        remove(`DistributionLevelSetting/Delete/${delData?.id}`)
        .then(res => {
          setProgress(false);
          setButtonStatus(false);
            addToast(res,{
                appearance:'error',
                autoDismiss: true
            })
            setSuccess(!success);
            setDeleteModal(false);
        })
    }




    return (
        <div>
            <div className='mb-4'>
              <span className='branch-title-style2'>Distribution Level Settings List</span>
             </div>

             <div className="table-responsive">
             <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                    
                    <th>Level Name</th>
                     <th>Level Value</th>
                     <th>Commission Percentage</th>
                     <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {distributionData?.map((ls, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                    
                      <td>
                        {ls?.levelName}
                      </td>
                      <td>
                        {ls?.levelValue}
                      </td>
                      <td>
                        {ls?.commissionPercent}
                      </td>
                     
                     
                     
                      <td style={{ width: "15%" }} className="text-center">
                        <ButtonGroup variant="text">
                       


                          {
                            permissions?.includes(permissionList.Update_Distribution_Level_Setting_info) ?
                            <Button className='mr-1 btn-sm' color='warning' onClick={()=>toggleUpdate(ls)}>
                            <i className="fas fa-edit"></i>


                            </Button>
                            :
                            null
                          }

                            {
                              permissions?.includes(permissionList.Delete_Distribution_Level_Setting) ?
                              <Button className='ml-1 btn-sm' color='danger' onClick={()=>toggleDanger(ls)}>
                            <i className="fas fa-trash-alt"></i>


                            </Button>
                            :
                            null
                            }


                        </ButtonGroup>

                     
                        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                        <ModalBody>
                          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                        </ModalBody>
        
                        <ModalFooter>
                          <Button  color="danger" onClick={confirmDelete} disabled={buttonStatus}>{progress ? <ButtonLoader/> : 'YES' }</Button>
                          <Button onClick={() => setDeleteModal(false)}>NO</Button>
                        </ModalFooter>
                     </Modal>



                      </td>
                    </tr>
                  ))}
                    
                    </tbody>
                    </Table>
             </div>

          
            
        </div>
    );
};

export default DistributionLevelSettingList;