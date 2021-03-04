import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginForm.css'

/** Login form.
 *
 */
function LoginForm({ login }) {
  const history = useHistory();
  const [form, setFormData] = useState({username: "testadmin", password:"password"});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await login(form)
    if (res.success) {
      history.push("/companies");
    } else {
      console.log(res)
    }
  }

  const {username, password} = form;


  return (
    <div className="LoginForm">
      <h3 className="LoginForm-title">Log In</h3>
      <Form className="LoginForm-form" onSubmit={handleSubmit}>
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
        <Button className="LoginForm-submit">Submit</Button>
      </Form>
    </div>
  );
}

export default LoginForm;