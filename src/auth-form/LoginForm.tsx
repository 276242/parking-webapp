import React, { useCallback, useMemo } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvider';
import { LoginDto } from '../api/dto/login.dto';

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const initialValues: LoginDto = { username: '', password: '' };

  const validationSchema = useMemo(() =>
    yup.object({
      username: yup.string().required("Username can't be empty"),
      password: yup.string().required("Password can't be empty").min(5),
    }), []);

  const submit = useCallback(async (values: LoginDto, formikHelpers: FormikHelpers<LoginDto>) => {
    try {
      const response = await apiClient.login(values);
      if (response && response.token) {
        navigate('/menu');
      }
    } catch (error) {
      formikHelpers.setFieldError('username', 'Invalid username or password');
    }
  }, [apiClient, navigate]);

  return (
    <Formik initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            label="Username"
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit">Login</Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
