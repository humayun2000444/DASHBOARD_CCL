export  const  expireDateHandler =() => {
    const currentDate = new Date();
    const expiryDate = new Date(localStorage.getItem('date'));
    const permissions  = JSON.parse(localStorage.getItem('permissions'));
    const current_user  = JSON.parse(localStorage.getItem('current_user'));
    const token  = localStorage.getItem('token');
    const userType  = localStorage.getItem('userType');
    const referenceId  = localStorage.getItem('referenceId');
    const date = localStorage.getItem('date');
   

    if(currentDate.getTime() > expiryDate.getTime()){
        // window.localStorage.clear();
        // window.location.reload();
    }
  
    
}