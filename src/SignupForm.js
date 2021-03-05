import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './SignupForm.css'

/** Login form.
 *
 */
function SignupForm({ signup }) {
  const history = useHistory();
  const [form, setFormData] = useState({
      username: "", 
      password: "",
      firstName: "",
      lastName: "",
      email: ""
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
    let res = await signup(form)
    if (res.success) {
      history.push("/companies");
    } else {
      console.log(res)
      alert(res)
    }
  }

  const {username, password, firstName, lastName, email} = form;


  return (
    <div className="SignupForm">
      <h3 className="SignupForm-title">Sign Up</h3>
      <Form className="SignupForm-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            name="username"
            id="username"
            type="text"
            onChange={handleChange}
            value={username}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
            value={password}
            required
          />
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
        <Button className="SignupForm-submit" color="primary">Submit</Button>
      </Form>
    </div>
  );
}

export default SignupForm;