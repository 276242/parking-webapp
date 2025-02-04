import React, { useCallback, useMemo } from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import LoginIcon from '@mui/icons-material/Login';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

type LoginFormProps = {
  username: string;
  password: string;
};

function LoginForm() {
  const initialValues: LoginFormProps = { username: '', password: '' };
  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
    async (values: LoginFormProps, formik: any) => {
      try {
        const response = await apiClient.login(values);
        if (response && response.token) {
          navigate('/history');
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      } catch (error) {
        formik.setFieldError('username', 'Invalid username or password');
      }
    },
    [apiClient, navigate]
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup.string().required("Username can't be empty"),
        password: yup.string().required("Password can't be empty").min(5),
      }),
    []
  );

  return (
    <div className="Login-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
      >
        {(formik: any) => (
          <form
            id="loginForm"
            className="Login-form"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <h1>{('Login')}</h1>
            <TextField
              id="username"
              label="Username"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              sx={{ bgcolor: 'black', color: 'white', padding: '0.8rem', fontWeight: 'bold' }}
              disabled={!formik.isValid && formik.dirty}
            >
              Sign in
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
