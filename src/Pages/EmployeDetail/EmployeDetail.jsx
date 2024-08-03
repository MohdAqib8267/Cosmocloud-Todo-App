import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeDetail.css';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

function EmployeeDetail() {

  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}employee/${id}`,{
        headers: {
          'projectId': `${import.meta.env.VITE_PROJECT_ID}`, 
          'environmentId': `${import.meta.env.VITE_ENVIRONMENT_ID}` 
        } 
      });
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
    
  };
  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <div className="container" >
      
    {
      loading?(
        <div style={{width:"100%", textAlign:"center", display:'flex', alignContent:'center',justifyContent:'center'}}>
      <Circles
        height="80"
        width="80"
        color="white"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
        </div>
      ):(
     
        <div className="employee-detail">
      <h2>Employee Details</h2>
      <div className="details">
        <div className="left">
          <p><strong>Name:</strong> {employee?.name}</p>
          <p><strong>Employee ID:</strong> {employee?._id}</p>
          <p><strong>Address:</strong> {employee?.address.line1}, {employee?.address.city}, {employee?.address.country}, {employee?.address.zipCode}</p>
        </div>
        <div className="vertical-divider"></div>
        <div className="right">
          <h3>Contact Methods</h3>
          <ul className="contact-methods">
            {employee?.contactMethods?.map((method, index) => (
              <li key={index}>
                <span>{method?.contact_method}:</span>
                {method?.value}
              </li>
               ))} 
          </ul>
        </div>
      </div>
      <div className="divider"></div>
      <div>
      <button className='view-profile' style={{width:'fitContent'}} onClick={()=>navigate('/')}>Back To Home</button>
      </div>
    </div>
 
      )
    }
    </div>
  );
}

export default EmployeeDetail;
