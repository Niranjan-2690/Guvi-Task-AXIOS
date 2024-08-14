import axios from 'axios'
import { useState } from 'react';

function App(){

  const [axiosInput, setAxiosInput] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      city: '',
      zip: ''
    },
    phone: '',
    website: ''})
  

    axios.get("https://jsonplaceholder.typicode.com/users")
          .then((res)=>{setAxiosInput(res.data)})
          .catch((err)=>{console.log("Error", err)})

  
          const handleAddEvent = (e) => {
            e.preventDefault();
            axios.post("https://jsonplaceholder.typicode.com/users", formData)
              .then((res) => {
                setAxiosInput([...axiosInput, res.data]);
                setFormData({
                  name: '',
                  username: '',
                  email: '',
                  address: {
                    street: '',
                    city: '',
                    zip: ''
                  },
                  phone: '',
                  website: '',
                });
              })
              .catch((err) => console.log("Error", err));
          };



  return  <div className='container mt-5'>
            <form className="row g-3">
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={formData.name} id="name" />
              </div>
              <div className="col-md-4">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" />
              </div>
              <div className="col-md-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="col-md-4">
                <label htmlFor="street" className="form-label">Street</label>
                <input type="text" className="form-control" id="street" />
              </div>
              <div className="col-md-4">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputZip" className="form-label">Zip</label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputZip" className="form-label">Phone</label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputZip" className="form-label">Website</label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary" onClick={handleAddEvent}>Add Data</button>
              </div>
            </form>
            <hr/>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {axiosInput.map((input, index)=>(
                  <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{input.name}</td>
                  <td>{input.username}</td>
                  <td>{input.email}</td>
                  <td>{input.address.street}, {input.address.city}, {input.address.zipcode}</td>
                  <td>{input.phone}</td>
                  <td>{input.website}</td>
                  <td><button className='btn btn-warning'><img className="table-btn" src='edit.png'/></button></td>
                  <td><button className="btn btn-danger"><img className="table-btn" src='delete.png'/></button></td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
}

export default App;