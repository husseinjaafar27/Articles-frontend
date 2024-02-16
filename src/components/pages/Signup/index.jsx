import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupUser, submitOtp } from '../../api/auth';
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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("")
  const [otp, setOtp] = useState(false)
  const [token, setToken] = useState(null)
  const { Login } = useAuth()
  const navigate = useNavigate();

  const { mutate } = useMutation(signupUser, {
    onSuccess: (data) => {
      if(data?.message === "Email already exists!"){
        toast.error(data?.message)
      }

      if(data?.message === "Verification email sent to your email address."){
        toast.success("Email is not verified. Please verify your email.");
        setOtp(true)
        setToken(data?.token)
      }
      console.log(data);
    },
  });

  const { mutate: mutateOtp } = useMutation(submitOtp, {
    onSuccess: (data) => {
     console.log(data);
      // Handle successful OTP submission
      toast.success("OTP submitted successfully");
      Login(token);
      navigate('/')

      // Perform any additional actions, such as navigating to a different page
    },
    onError: (error) => {
      // Handle error
      toast.error(error?.message && "Failed to submit OTP");
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
    if (first_name.trim() === "" || first_name.length < 2) {
      toast.error("FirstName must be at least 2 characters long.");
      return;
    }
    if (last_name.trim() === "" || last_name.length < 2) {
      toast.error("LastName must be at least 2 characters long.");
      return;
    }
  
    // Call the mutate function to submit the form data
    await mutate({ email, password, first_name, last_name });
  };

  return (
    <LoginContainer>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={first_name} onChange={(e) => setFirst_name(e.target.value)} placeholder="first name" />
        <input type='text' value={last_name} onChange={(e) => setLast_name(e.target.value)} placeholder="last name" />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type='submit'>Submit</button>
        <Link to={"/login"}>Login</Link>

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

export default Signup;