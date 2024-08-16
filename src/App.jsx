import axios from 'axios';
import { useState } from 'react';

function App() {
  const [formInput, setFormInput] = useState({
    names: "",
    username: "",
    email: "",
    address: { street: "", city: "", zip: "" },
    phone: "",
    website: ""
  });
  const [formData, setFormData] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "street" || id === "city" || id === "zip") {
      setFormInput(prevInput => ({
        ...prevInput,
        address: {
          ...prevInput.address,
          [id]: value
        }
      }));
    } else {
      setFormInput(prevInput => ({
        ...prevInput,
        [id]: value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Updating existing data
      const updatedData = [...formData];
      updatedData[editIndex] = formInput;
      setFormData(updatedData);

      // Update the data on the server
      axios.patch(`https://jsonplaceholder.typicode.com/users/${editIndex + 1}`, formInput)
        .then(res => {
          console.log(res);
          resetForm();
          setEditIndex(null); // Clear the edit index after updating
        })
        .catch(err => console.log("Error", err));

    } else {
      // Adding new data
      setFormData([...formData, formInput]);

      // Post data to the server
      axios.post("https://jsonplaceholder.typicode.com/users", formInput)
        .then(res => {
          console.log(res);
          resetForm();
        })
        .catch(err => console.log("Error", err));
    }
  };

  const resetForm = () => {
    setFormInput({
      names: "",
      username: "",
      email: "",
      address: { street: "", city: "", zip: "" },
      phone: "",
      website: ""
    });
  };

  const handleEditData = (index) => {
    setEditIndex(index);
    setFormInput(formData[index]);
  };

  const handleDeleteData = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);

    // Optionally remove data from the server
    axios.delete(`https://jsonplaceholder.typicode.com/users/${index + 1}`)
      .then(res => console.log(res))
      .catch(err => console.log("Error", err));
  };

  return (
    <div className='container mt-5'>
      <form className="row g-3" onSubmit={handleFormSubmit}>
        <div className="col-md-4">
          <label htmlFor="names" className="form-label">Name</label>
          <input type="text" className="form-control" value={formInput.names} id="names" onChange={handleInputChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" value={formInput.username} id="username" onChange={handleInputChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" value={formInput.email} id="email" onChange={handleInputChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="street" className="form-label">Street</label>
          <input type="text" className="form-control" value={formInput.address.street} id="street" onChange={handleInputChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" value={formInput.address.city} id="city" onChange={handleInputChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="zip" className="form-label">Zip</label>
          <input type="text" className="form-control" value={formInput.address.zip} id="zip" onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" value={formInput.phone} id="phone" onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="website" className="form-label">Website</label>
          <input type="text" className="form-control" value={formInput.website} id="website" onChange={handleInputChange} />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            {editIndex !== null ? "Update Data" : "Add Data"}
          </button>
        </div>
      </form>
      <hr />
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
          {formData.map((input, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{input.names}</td>
              <td>{input.username}</td>
              <td>{input.email}</td>
              <td>{input.address.street}, {input.address.city}, {input.address.zip}</td>
              <td>{input.phone}</td>
              <td>{input.website}</td>
              <td>
                <button className='btn btn-warning' onClick={() => handleEditData(index)}>
                  <img className="table-btn" src='edit.png' alt="Edit" />
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteData(index)}>
                  <img className="table-btn" src='delete.png' alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
