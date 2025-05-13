import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/products');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <h1>Login</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, getFieldProps }) => (
            <StyledForm>
              <FormGroup>
                <Input
                  {...getFieldProps('username')}
                  placeholder="Username"
                  type="text"
                />
                {errors.username && touched.username && (
                  <ErrorMessage>{errors.username}</ErrorMessage>
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

              <Button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </Button>
              <SignUpLink to="/signup">
                Don't have an account? Sign Up
              </SignUpLink>
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

const SignUpLink = styled(Link)`
  text-align: center;
  color: #007bff;
  text-decoration: none;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
