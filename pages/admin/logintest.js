import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import React, { Fragment, useState, } from "react";
import { useRouter } from "next/router";

//import axios
import axios from "axios";
import * as Yup from "yup";
//validation 
import { Field, Formik, Form, ErrorMessage } from "formik";
//meterial icons
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save";
const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: "20px 20px",
    width: 300,
    margin: "px auto",
  };
  const headertStyle = {
    margin: "0px",
    padding: "0px 0px",
  };
  const avatarStyle = {
    backgroundColor: "#0af0e0",
  };
  const paperStyle1 = {
    backgroundColor: "#f2faf9",
    width: 280,
    height: "39vh",
    margin: "20px auto",
    padding: "8px 0px",
  };
  const btnStyle = {
    margin: "10px 13px",
  };
  const formStyle = {
    margin: "20px",
  };
  const textSTyle = {
    margin: "px px",
    padding: "4px 0px",
    backgroundColor: "transparent",
    width: 204,
  };
 
  const initialValues = {
    us_email: '',
    us_password: '',
    remember: false
  }

  const validationSchema = Yup.object().shape({
    us_email: Yup.string().email("please Enter valid email").required("required"),
    us_password: Yup.string() .min(6, "too short !! minimum length should be 6").required("required"),
    
  });

  const router = useRouter();

  // The empty '' in the useState() function are default values
  // If you pass 'leo' to the email, that will be the default of your email field useState('leo')

  // this funtions handles when the form is submitted
  const onSubmit = async (values, props) => {
    try {
      const url = "http://localhost:8000/api/log";
      const res = await axios.post(url, values).then((val) => {
        if (val.status === 200) {
          localStorage.setItem('token', val?.data?.jwt)
          // if login is successful, redirect to dashboard
          router.replace("/dashboard",);
          
        }
      });
    } catch (err) {
      // else this code will run
      alert("An error occured logging in. Check your credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Grid>
        <Paper elevation={9} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h3 style={headertStyle}>LOGIN</h3>
            <Typography variant="captipon" gutterBottom>
              please fill the form to create
            </Typography>
          </Grid>
          <Grid>
            <Paper elevation={27} style={paperStyle1}>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {(props) => (
                <Form noValidate align="center" >
                  <AlternateEmailOutlinedIcon
                    style={{
                      marginTop: "20px",
                      marginLeft: "0px",
                      marginRight: "1px",
                    }}
                  />

                  <Field
                    as={TextField}
                    type="email"
                    style={textSTyle}
                    error={props.errors.us_email&&props.touched.us_email}
                    name="us_email"
                    label="email"
                    placeholder="email"
                    helperText={<ErrorMessage name="us_email" />}required
                  />
                  <br />

                  <LockOpenRoundedIcon
                    style={{
                      marginTop: "20px",
                      marginLeft: "0px",
                      marginRight: "1px",
                    }}
                  />
                  <Field
                    as={TextField}
                    type="password"
                    name="us_password"
                    style={textSTyle}
                    error={props.errors.us_password&&props.touched.us_password}
                    label="password"
                    placeholder="Password"
                    helperText={<ErrorMessage name="us_password" />} required
                  />
                  <br />
                  <FormControlLabel
                    control={<Checkbox name="remember" 
                    color="primary" />}
                    label="remember me"
                    helperText={<ErrorMessage name="remember" />}
                  />
                  <br />

                  <Button
                    variant="contained"
                    color="secondary" 
                    size="small"
                    type="submit"
                    style={btnStyle}
                  // {isLoading ? '...loading' : 'Login'}
                    onClick={()=>{onSubmit}}
                    startIcon={<SaveIcon />}
                  >
                    LOGIN
                  </Button>
                  <Typography>
                    <Link href="#">Forgot password ?</Link>
                  </Typography>
                  <Typography>
                    Do you have an account?
                    <Link onClick={() => handleChange("event", 1)} href="#">
                      SignUp
                    </Link>
                  </Typography>
                </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default Login;