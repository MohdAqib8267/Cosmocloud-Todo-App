import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEmploye.css';

function AddEmployee() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    address: { line1: '', city: '', country: '', zipCode: '' },
    contactMethods: [{ contact_method: 'Email', value: '' }]
  });
  const [employee, setEmployee] = useState(null); 

 const fetchEmployee = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}employee/${id}`,{
      headers: {
        'projectId': `${import.meta.env.VITE_PROJECT_ID}`, 
        'environmentId': `${import.meta.env.VITE_ENVIRONMENT_ID}` 
      } 
    });
    setEmployee(response.data);
  };
  useEffect(() => {
    if(id!==undefined){
      fetchEmployee();
    } 
  }, [id]);

  useEffect(() => {
    if (employee && id !== undefined) {
      setData({
        name: employee.name,
        address: employee.address,
        contactMethods: employee.contactMethods
      });
    }
  }, [employee, id]);


  const handleAddContactMethod = () => {
    const newContactMethods = [...data.contactMethods, { contact_method: 'EMAIL', value: '' }];
    setData((prevData) => ({
      ...prevData,
      contactMethods: newContactMethods,  
    }));
  };
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value})
  }
  const handleAddress=(e)=>{
    const {name,value}=e.target;
    const newAddress = {...data.address};
    newAddress[name]=value;
    setData({...data,address:newAddress});
  }
  const handleContactMethod =(index,e,val)=>{
    const {value} = e.target;
    const newContactMethod = [...data.contactMethods]; // it should be email or phone
    val==="value"?newContactMethod[index].value = value:newContactMethod[index].contact_method = value;
    setData({...data,contactMethods:newContactMethod});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(employee && id!==undefined){
        const response = await axios.put(`${import.meta.env.VITE_API_KEY}employee/${id}`, data, {
          headers: {
            'Content-Type': 'application/json', 
            'projectId': `${import.meta.env.VITE_PROJECT_ID}`, 
            'environmentId':`${import.meta.env.VITE_ENVIRONMENT_ID}`
          },
        });
      }
      else{
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}employee`, data, {
          headers: {
            'Content-Type': 'application/json', 
            'projectId': `${import.meta.env.VITE_PROJECT_ID}`, 
            'environmentId':`${import.meta.env.VITE_ENVIRONMENT_ID}`
          },
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="add-employee-container">  
    <div className="add-employee">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={data.name} onChange={handleChange} required />
        <input type="text" placeholder="Address Line 1" name="line1" value={data.address.line1} onChange={handleAddress} required />
        <input type="text" placeholder="City" name='city' value={data.address.city} onChange={handleAddress} required />
        <input type="text" placeholder="Country" name='country' value={data.address.country} onChange={handleAddress} required />
        <input type="text" placeholder="Zip Code" name='zipCode' value={data.address.zipCode} onChange={handleAddress} required />
        {data.contactMethods.map((method, index) => (
          <div key={index} className='contact-options'>
            <select value={method.contact_method} onChange={(e)=>handleContactMethod(index,e,null)}>
              {method.contact_method==="phone"? <><option value="PHONE">Phone:</option><option value="EMAIL">Email:</option></>:<> <option value="EMAIL">Email:</option>  <option value="PHONE">Phone:</option></>}
            </select>
           
            <input type="text" placeholder="Value" value={method.value} onChange={(e)=>handleContactMethod(index,e,"value")} required />
          </div>
        ))}
        <button type="button" onClick={handleAddContactMethod}>Add Contact Method</button>
        <button type="submit">{id!==undefined?"Update":"Add Employee"}</button>
      </form>
    </div>
    </div>
  );
}

export default AddEmployee;
