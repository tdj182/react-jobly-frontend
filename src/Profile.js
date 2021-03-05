import { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {JoblyApi} from './JoblyApi'
import UserContext from './UserContext'
import 'bootstrap/dist/css/bootstrap.css';
import './Profile.css'

/** Profile 
 *
 * Pulls currUser data and places it within the form.
 *  
 * Will call API to change the users data when form is submitted
 * 
 * routed at /profile
 *
 */
function Profile() {
  const { currUser, setCurrUser } = useContext(UserContext);

  const [form, setFormData] = useState({
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
      password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let updatedUser
    
    try {
      updatedUser = await JoblyApi.saveChanges(currUser.username, form);
      console.log(updatedUser)
    } catch (e) {
      console.error(`Error: ${e}`);
      return e;
    }

    setFormData(f => ({ ...f, password: "" }));
    setCurrUser(updatedUser)
  }


  return (
    <div className="Profile">
      <h3 className="Profile-title">Profile</h3>
      <Form className="Profile-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <p>{currUser.username}</p>
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First name</Label>
          <Input
            name="firstName"
            id="firstName"
            type="text"
            onChange={handleChange}
            value={form.firstName}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last name</Label>
          <Input
            name="lastName"
            id="lastName"
            type="text"
            onChange={handleChange}
            value={form.lastName}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            onChange={handleChange}
            value={form.email}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Confirm password to make changes:</Label>
          <Input
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            required
          />
          </FormGroup>
        <Button className="Profile-submit">Save Changes</Button>
      </Form>
    </div>
  );
}

export default Profile;