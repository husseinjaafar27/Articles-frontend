import axios from "axios";

export const loginUser = async ({ email, password }) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };
        const response = await fetch(`${process.env.REACT_APP_API}/user/login`, requestOptions);

        return await response.json();

    } catch (error) {
        throw new Error(error.message || 'Failed to login');
    }
};


export const signupUser = async ({ first_name, last_name, email, password }) => {
    console.log({ first_name, last_name, email, password });
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name, last_name, email, password })
        };
        const response = await fetch(`${process.env.REACT_APP_API}/user/signup`, requestOptions);

        return await response.json();

    } catch (error) {
        throw new Error(error.message || 'Failed to login');
    }
};

export const submitOtp = async ({ code, token }) => {
    console.log(code);
    try {
        const response = await axios.post(
            process.env.REACT_APP_API + '/user/verify',
            { code },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the Authorization header
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to login');
    }
};
