import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser, submitOtp } from '../../api/auth';
import { useMutation } from 'react-query';
import {useAuth} from './../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const LoginContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 2rem;
  form{
    display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  input{
    padding: 1rem;
  }
  button{
    padding: 0.5rem 0;
  }
  }
`

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("")
  const [otp, setOtp] = useState(false)
  const [token, setToken] = useState(null)
  const { Login } = useAuth()
  const navigate = useNavigate();

  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data?.message === "User is not exist" || data?.message === 'Invalid credentials.') {
        toast.error(data.message);
      } else if (data?.message?.startsWith("Email is not verified")) {
        setOtp(true);
        toast.success("Email is not verified. Please verify your email.");
        console.log(data.Token);
        setToken(data.Token)
      }
      if(data?.data){
        Login(data.Token);
        navigate('/')
      }
    },
  });

  const { mutate: mutateOtp } = useMutation(submitOtp, {
    onSuccess: (data) => {
      // Handle successful OTP submission
      toast.success("OTP submitted successfully");
      Login(token);
      navigate('/')

      // Perform any additional actions, such as navigating to a different page
    },
    onError: (error) => {
      // Handle error
      toast.error(error.message || "Failed to submit OTP");
    }
  });

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    await mutateOtp({code, token})
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple validation for the email and password fields
    if (email.trim() === "" || email.length < 3) {
      toast.error("Email must be at least 3 characters long.");
      return;
    }
    if (password.trim() === "" || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
  
    // Call the mutate function to submit the form data
    await mutate({ email, password });
  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type='submit'>Submit</button>
        <Link to={"/signup"}>sign up</Link>
      </form>
      {otp && (
        <form onSubmit={e => handleOtpSubmit(e)}>
          <p>Please check your email inbox for the OTP code.</p>
          <input type='text' value={code} onChange={e => setCode(e.target.value)} />
          <button type='submit'>submit</button>
        </form>
      )}
    </LoginContainer>
  );
}

export default Login;