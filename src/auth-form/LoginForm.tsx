import React, { useCallback, useMemo } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
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
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#ffffff">
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, bgcolor: "#ffffff", width: 350 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#000" }}>
          Login
        </Typography>
        <Formik initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
          {(formik) => (
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                {...formik.getFieldProps('username')}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                sx={{ input: { color: "#000" }, label: { color: "#000" }, fieldset: { borderColor: "#000" } }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ input: { color: "#000" }, label: { color: "#000" }, fieldset: { borderColor: "#000" } }}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#000", color: "#fff", '&:hover': { bgcolor: "#333" } }}>
                Login
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default LoginForm;