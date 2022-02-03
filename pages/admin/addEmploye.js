
import Typography from '@material-ui/core/Typography'
import Admin from "layouts/Admin.js";
import  Container  from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import SupervisedUserCircleSharpIcon from '@material-ui/icons/SupervisedUserCircleSharp';
import PeopleIcon from '@material-ui/icons/People';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useState } from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import Favorite from '@material-ui/icons/Favorite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Link from 'next/link';
import { withWidth } from '@material-ui/core';

  

const Customer = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));
      const classes = useStyles();

    const[us_name,setName]=useState('')
    const[us_email,setEmail]=useState('')
    const[us_password,setPassword]=useState('')
    const[us_type,setType,]=useState('')
    const[us_phone,setPhone,]=useState('')
    const[us_image,setImage,]=useState('')
    

    const addCustomer = async (e) => {
      const token = localStorage.getItem("token");
        const cus_payload = {cus_name, cus_email, cus_address,cus_loyalty,cus_mobile}
         console.log('data',cus_payload)
        const url = 'http://127.0.0.1:8000/api/add_customer';
        const res = await axios.post(url, cus_payload, { headers: { Authorization: `Bearer ${token}` } }).then(res =>{
           console.log('res',res)
        }).catch(error => {
          console.log('error',error)
       })
        e.preventDefault();
    }
        
    return ( 
        <div>
            <Container
            component="div" style={{ 
              backgroundColor: '#646069', 
              height: '100vh',
               width:'70hv'}}>
               <Card 
               style={{ backgroundColor: '#d7f2fc',
                height: '50vh',
                width:'50hv'
                 }}
               className={classes.root} 
               variant="outlined">
               <CardContent>
                <Typography
                
                variant="overline"
                component="h2"
                align="center"
                color="inherit"
                display="block"
                gutterBottom="false"
                noWrap="true"
                paragraph="true"
                >
                    ADD CUSTOMER
                    <SupervisedUserCircleSharpIcon/>
                

                </Typography>
                

                <form 
                align="center"
                padding="4"
                contendalign="center"
                    height="50hv"
                className={classes.root} >
                    <PeopleIcon/>
                 <Input type='text' onChange={e =>setName(e.target.value)} placeholder="employe_name" inputProps={{ 'aria-label': 'description' }} />
                 
                  <PhoneAndroidTwoToneIcon/>
                 <Input type='phoneField' onChange={e =>setEmail(e.target.value)} placeholder="mobile" inputProps={{ 'aria-label': 'description' }} />
                <br/>
                 <AlternateEmailOutlinedIcon />
                 <Input type='email' onChange={e =>setPhone(e.target.value)} placeholder="email" inputProps={{ 'aria-label': 'description' }} />
                  
                  <VisibilityOffIcon/>
                  <Input type='password' onChange={e =>setPassword(e.target.value)} placeholder="password" inputProps={{ 'aria-label': 'description' }} />
                  <br/>
                  <HomeOutlinedIcon/>
                 <Input type="text" onChange={e =>setType(e.target.value)} placeholder="address" inputProps={{ 'aria-label': 'description' }} />
                 
                 <HomeOutlinedIcon/>
                 <Input type="img" onChange={e =>setImage(e.target.value)} placeholder="address" inputProps={{ 'aria-label': 'description' }} />
                 <br/><br/>
                {/* <Link href='/pages/listCustemer/'> */}
                 <button 
                 align="center"
                 onClick={(e) =>addCustomer(e)}
                 color="primary">save</button>
                 {/* </Link> */}
                </form>
                
                </CardContent>
                </Card>
            </Container>
               
        </div>
         
      
     );
}
Customer.layout = Admin;
export default Customer;