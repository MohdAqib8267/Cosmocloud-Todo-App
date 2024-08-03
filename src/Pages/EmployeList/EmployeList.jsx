import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Circles } from 'react-loader-spinner'
import "./EmployeList.css";
import axios from "axios";


const EmployeList = () => {
  const [employeeList,setEmployeeList]=useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}employee?limit=100&offset=0`, {
        headers: {
          'projectId': `${import.meta.env.VITE_PROJECT_ID}`, 
          'environmentId': `${import.meta.env.VITE_ENVIRONMENT_ID}` 
        }  
      });
      console.log('Employee list fetched successfully:', response.data);
      setEmployeeList(response.data.data);
    } catch (error) {
      console.error('Error fetching employee list:', error.response ? error.response.data : error.message);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
 
  const deleteEmployee = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}employee/${id}`,
         
        {
          data: {},
          headers: {
            'projectId': `${import.meta.env.VITE_PROJECT_ID}`,'environmentId': `${import.meta.env.VITE_ENVIRONMENT_ID}`
          }
        }
      );
      setEmployeeList(employeeList.filter(list=> list._id !== id))
      
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }
  return (
    <div className="employee-list">
      <div className="heading">
        <h1>Employees</h1>
        <button className="add-employee-link" onClick={()=>navigate('add')}>Add Employe</button>
      </div>

      {loading?
      (
        <div style={{width:"100%", textAlign:"center", display:'flex', alignContent:'center',justifyContent:'center'}}>
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
      )
      :(
        <>
        {employeeList.length===0?(
          <h4>No Employee in the system</h4>
        ):
        (
          <>
          <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Action1</th>
              <th>Action2</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td style={{fontWeight:'bold'}}>      
                    {employee.name}
                </td>

                <td>
                  <button
                    className="delete-employe"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={()=>navigate(`/add/${employee._id}`)} className="delete-employe" style={{background:"#007bff"}}>Update</button>
                </td>
                <td>
                <Link to={`/employee/${employee._id}`}>
                  <button
                    className="view-profile"
                  >
                    View Profile
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          
          </>
        )
        }
        </>
        )
      }
    </div>
  );
};

export default EmployeList;
