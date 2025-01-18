import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import { signupSchema } from "../schema/authentication";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/User/UserActions";


const RegisterPage = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    name: "vaishak",
    email: "vaishakh@gmail.com",
    password: "123456a",
  }

  const onSubmit =async (values,actions) => {
    try {
      actions.setSubmitting(true); 

      let res = await dispatch(registerUser(values)).unwrap()
        if(res){
         console.log(res);
         
         navigate('/login')
       }

    } catch (error) {
      console.log(error);

    }finally {
      actions.setSubmitting(false); 
    }
  }


  const { values, handleBlur, isSubmitting, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
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
            Create an Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              placeholder="Enter name"
              fullWidth
              autoFocus
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ mb: 2 }}
            />

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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </Box>

          <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
            <Grid item>
              <Link >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login">
                login
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>

    </Box>
  )
}

export default RegisterPage
