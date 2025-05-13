import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Step1Schema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/@[^.]*\.(com|in)$/, 'Email must end with @xyz.com or @xyz.in')
    .required('Required'),
  password: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Required'),
});

const Step2Schema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  zipcode: Yup.string().required('Required'),
});

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const formattedData = {
        email: values.email,
        username: values.username,
        password: values.password,
        name: {
          firstname: values.firstName,
          lastname: values.lastName
        },
        address: {
          city: values.city,
          street: values.street,
          address: values.address,
          zipcode: values.zipcode,
          geolocation: {
            lat: '-37.3159',
            long: '81.1496'
          }
        },
        phone: values.phone
      };

      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      const data = await response.json();
      console.log('Success:', data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <h1>Sign Up - Step {step}</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            phone: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            street: '',
            zipcode: ''
          }}
          validationSchema={step === 1 ? Step1Schema : Step2Schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, getFieldProps, isValid, dirty }) => (
            <StyledForm>
              {step === 1 ? (
                <>
                  <FormGroup>
                    <Input
                      {...getFieldProps('username')}
                      placeholder="Username"
                    />
                    {errors.username && touched.username && (
                      <ErrorMessage>{errors.username}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      {...getFieldProps('email')}
                      placeholder="Email"
                      type="email"
                    />
                    {errors.email && touched.email && (
                      <ErrorMessage>{errors.email}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <PasswordWrapper>
                      <Input
                        {...getFieldProps('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                      />
                      <EyeIcon
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </EyeIcon>
                    </PasswordWrapper>
                    {errors.password && touched.password && (
                      <ErrorMessage>{errors.password}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      {...getFieldProps('phone')}
                      placeholder="Phone Number"
                    />
                    {errors.phone && touched.phone && (
                      <ErrorMessage>{errors.phone}</ErrorMessage>
                    )}
                  </FormGroup>
                </>
              ) : (
                <>
                  <FormGroup>
                    <Input
                      {...getFieldProps('firstName')}
                      placeholder="First Name"
                    />
                    {errors.firstName && touched.firstName && (
                      <ErrorMessage>{errors.firstName}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      {...getFieldProps('lastName')}
                      placeholder="Last Name"
                    />
                    {errors.lastName && touched.lastName && (
                      <ErrorMessage>{errors.lastName}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <TextArea
                      {...getFieldProps('address')}
                      placeholder="Address"
                    />
                    {errors.address && touched.address && (
                      <ErrorMessage>{errors.address}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      {...getFieldProps('city')}
                      placeholder="City"
                    />
                    {errors.city && touched.city && (
                      <ErrorMessage>{errors.city}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      {...getFieldProps('street')}
                      placeholder="Street"
                    />
                    {errors.street && touched.street && (
                      <ErrorMessage>{errors.street}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Input
                      {...getFieldProps('zipcode')}
                      placeholder="Zip Code"
                    />
                    {errors.zipcode && touched.zipcode && (
                      <ErrorMessage>{errors.zipcode}</ErrorMessage>
                    )}
                  </FormGroup>
                </>
              )}

              <Button
                type="submit"
                disabled={!isValid || !dirty || loading}
              >
                {loading ? 'Loading...' : step === 1 ? 'Next' : 'Sign Up'}
              </Button>
            </StyledForm>
          )}
        </Formik>
      </FormCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const FormCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  padding: 0.8rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
`;

export default SignUp;
