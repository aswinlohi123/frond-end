import {
    Avatar,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
    Button,
  } from "@material-ui/core";
  import React, { Fragment, useState } from "react";
  import { useRouter } from "next/router";
 
  //validation
  
  import { Formik, Field, Form, ErrorMessage, yupToFormErrors } from "formik";
  import * as Yup from "yup";
  import { FormHelperText } from "@material-ui/core";
  //import axios
  import axios from "axios";
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
  const Signup = () => {
    const paperStyle = {
      padding: "20px",
      width: 300,
      margin: "px auto",
    };
    const headertStyle = {
      margin: 0,
    };
    const avatarStyle = {
      backgroundColor: "#0af0e0",
    };
    const paperStyle1 = {
      backgroundColor: "#f2faf9",
      width: 300,
      margin: "0px auto",
      padding: "2px 1px",
    };
    const ErrorStyle = {
      color: "red",
    };
    const initialValues = {
      us_name: "",
      us_email: "",
      us_phone: "",
      us_password: "",
      cpassword: "",
      termAndCondition: false,
    };
  
   const phoneRexpresion=/^[2-9]{1}[0-9]{7}/
   const passwordRex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const validationSchema = Yup.object().shape({
      us_name: Yup.string().min(3, "too short").required("required"),
      us_email: Yup.string().email("Enter valid email").required("Required"),
    us_phone:Yup.string().matches(phoneRexpresion,"Enter valid Number").max(10,"Enter valid Number").required("required"),
      us_password: Yup.string()
        .min(8, "too short !! minimum length should be 8")
        .matches(passwordRex,"passoword must have a upper, lower case, number, special symbol")
        .required("required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("us_password")], "password not match")
        .required("Required"),
      termAndCondition: Yup.string().oneOf(["true"], "Accept term and condition"),
    });
    const router = useRouter();
  
    const onSubmit = async (values, props) => {
      // console.log("values", values);
      const url = "http://127.0.0.1:8000/api/reg";
      const res = await axios
        .post(url, values)
        .then((res) => {
          if (res.status === 200) {
               router.replace('/dashboard')
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
      e.preventDefault();
    };
  
    return (
      <Fragment>
        <Grid>
          <Paper elevation={9} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AddCircleOutlineIcon />
              </Avatar>
              <h3 style={headertStyle}>SIGN UP</h3>
              <Typography variant="captipon" gutterBottom>
                please fill the form to create
              </Typography>
            </Grid>
            <Grid>
              <Paper elevation={27} style={paperStyle1}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <Form noValidate align="center">
                      <PersonPinCircleOutlinedIcon
                        style={{ marginTop: "20px" }}
                      />
                      
                      <Field
                      value={props.values.name}  
                        error={props.errors.us_name}
                        as={TextField}
                        value={props.values.name&&props.touched.name}
                        label="name"
                        type="text"
                        style ={{width: '60%'}}
                        inputStyle ={{width: '10%'}}
                        name="us_name"
                        placeholder="Enter your name"
                       
                        helperText={<ErrorMessage name='us_name' />} required /> 
                      <br />
                      <AlternateEmailOutlinedIcon style={{ marginTop: "20px" }} />
                      <Field
                        as={TextField}
                        type="email"
                        error={props.errors.us_email&&props.touched.us_email}
                        style ={{width: '60%'}}
                        inputStyle ={{width: '10%'}} 
                        label="email"
                        name="us_email"
                        placeholder="Enter your Email"
                        helperText={<ErrorMessage name="us_email" />}
                      />
  
                      <br />
                      <PhoneAndroidOutlinedIcon style={{ marginTop: "20px" }} />
                      <Field
                        as={TextField}
                        type="number"
                        name="us_phone"
                        error={props.errors.us_phone&&props.touched.us_phone}
                        style ={{width: '60%'}}
                        inputStyle ={{width: '10%'}}
                        label="Phone"
                        placeholder="Enter your Phone"
                        helperText={<ErrorMessage name="us_phone" />}
                      />
                      <br />
                      <LockOpenRoundedIcon style={{ marginTop: "20px" }} />
                      <Field
                        as={TextField}
                        type="password"
                        name="us_password"
                        error={props.errors.us_password&&props.touched.us_password}
                        style ={{width: '60%'}}
                        inputStyle ={{width: '10%'}}
                        label="password"
                        helperText={<ErrorMessage name="us_password" />}
                      />
                      <br />
                      <LockOutlinedIcon style={{ marginTop: "20px" }} />
                      <Field
                        as={TextField}
                        type="password"
                        name="cpassword"
                        error={props.errors.cpassword&&props.touched.cpassword}
                        style ={{width: '60%'}}
                        inputStyle ={{width: '10%'}}
                        label="conform password"
                        helperText={<ErrorMessage name="cpassword" />}
                      />
                      <br />
                      <FormControlLabel
                        control={<Field as={Checkbox} name="termAndCondition" />}
                        label="I Accept the terms and Condition"
                      />
                      <FormHelperText>
                        <ErrorMessage name="termAndCondition" />
                      </FormHelperText>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        startIcon={<SaveIcon />} 
                      >
                        Sign up
                      </Button>
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
  
  export default Signup;
  

