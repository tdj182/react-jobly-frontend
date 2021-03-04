import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import UserContext from './UserContext'
import 'bootstrap/dist/css/bootstrap.css';
import './Profile.css'

/** Login form.
 *
 */
function Profile({ saveChanges }) {
  const history = useHistory();
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
      updatedUser = await saveChanges(currUser.username, form)
    } catch (e) {
      console.log(e)
      return
    }

    setFormData(f => ({ ...f, password: "" }));
    setCurrUser(updatedUser)
  }

  const {password, firstName, lastName, email} = form;


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
            value={firstName}
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
            value={lastName}
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
            value={email}
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
            value={password}
            required
          />
          </FormGroup>
        <Button className="Profile-submit">Save Changes</Button>
      </Form>
    </div>
  );
}

export default Profile;