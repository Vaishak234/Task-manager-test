import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import { loginSchema } from "../schema/authentication";
import { loginUser } from "../features/User/UserActions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";



const LoginPage = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [persist, setPersist] = useState(localStorage.getItem('persist'))

  const handlePersist= () =>{
    setPersist(prev=>!prev)
  }

  useEffect(()=>{
     localStorage.setItem('persist',persist)
  },[persist])

  const initialValues = {
   email: "vaishakh@gmail.com",
   password: "123456a",

 }


  const onSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);

      const res = await dispatch(loginUser(values)).unwrap();
      if(res){
        
        navigate('/')
      }
      

    } catch (error) {
      console.log(error);

    } finally {
      actions.setSubmitting(false);
    }
  }

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: true,
  });
  


  return (
    <Box>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "secondary.main",
              textAlign: "center",
              mb: 1,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              placeholder="Enter email"
              fullWidth
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ mb: 2 }}
            />

            <TextField
              placeholder="Enter password"
              fullWidth
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={<Checkbox checked={!!persist} onChange={handlePersist} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              Sign In
            </Button>
          </Box>
          <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
            <Grid item>
              <Link  >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link  to="/register">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
