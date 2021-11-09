import axios from 'axios';
import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';

type TRegistrationInputForm = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  type: ''|'member'|'trainer';
  firstLogin?: boolean;
}

const Index: FC = () => {

  const [inputForm, setInputForm] = useState<TRegistrationInputForm>({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    type: ''
  });

  const onInputChange = (key: keyof IUser) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputForm({
      ...inputForm,
      [key]: event.currentTarget.value
    });
  };

  const onSubmitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('/api/auth/register', inputForm);

      alert('Registration Complete');
      location.href = '/login';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }

  const fetchAuthUser = useCallback(async () => {
    try {
      await axios.get('/api/auth');
  
      location.href = '/';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchAuthUser();
  }, [fetchAuthUser]);

  return (
    <Container>
      <Col className="mt-5 mx-auto" md={6}>
        <Card>
          <CardHeader>
            <h1>Register</h1>
          </CardHeader>
          <CardBody>
            <Form onSubmit={onSubmitRegister}>
              <FormGroup row>
                <Col md={6}>

                  <Input
                    placeholder="First Name"
                    onChange={onInputChange('firstname')}
                    value={inputForm.firstname}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    placeholder="Last Name"
                    onChange={onInputChange('lastname')}
                    value={inputForm.lastname}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="E-mail"
                  onChange={onInputChange('email')}
                  value={inputForm.email}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Username"
                  onChange={onInputChange('username')}
                  value={inputForm.username}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Password"
                  onChange={onInputChange('password')}
                  value={inputForm.password}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="select"
                  type="select"
                  onChange={onInputChange('type')}
                  value={inputForm.type}
                >
                  <option value='' disabled>Select User Type</option>
                  <option value="member">
                    Member
                  </option>
                  <option value="trainer">
                    Trainer
                  </option>
                </Input>
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a href="/login">Login</a>
                  <Button color="primary">Register</Button>
                </div>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Index;
