
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
import Link from 'next/link';

  

const Customer = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));
      const classes = useStyles();

    const[cus_name,setName]=useState('')
    const[cus_email,setEmail]=useState('')
    const[cus_address,setAddress]=useState('')
    const[cus_mobile,setMobile,]=useState('')
    const[cus_loyalty,setLoyalty,]=useState(false)

    const token = localStorage.getItem("token");

    const addCustomer = async (e) => {
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
            <Container>
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
                <form className={classes.root} >
                    <PeopleIcon/>
                 <Input type='text' onChange={e =>setName(e.target.value)} placeholder="customer_name" inputProps={{ 'aria-label': 'description' }} />
                 <br/><br/>
                  <AlternateEmailOutlinedIcon />
                 <Input type='email' onChange={e =>setEmail(e.target.value)} placeholder="email" inputProps={{ 'aria-label': 'description' }} />
                 <br/><br/>
                 <PhoneAndroidTwoToneIcon/>
                 <Input type='phoneField' onChange={e =>setMobile(e.target.value)} placeholder="mobile" inputProps={{ 'aria-label': 'description' }} />
                  <br/><br/>
                  <HomeOutlinedIcon/>
                 <Input type="text" onChange={e =>setAddress(e.target.value)} placeholder="address" inputProps={{ 'aria-label': 'description' }} />
                 <br/><br/>
                 <FormControlLabel type="checkbox"
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}  name="loyality" onChange={e =>setLoyalty(!cus_loyalty)}/>}
                   label="loyality"
                    
                 />
                 <br/><br/>
                {/* <Link href='/pages/listCustemer/'> */}
                 <button onClick={(e) =>addCustomer(e)}
                 color="primary">save</button>
                 {/* </Link> */}
                </form>
               
            </Container>
               
        </div>
         
      
     );
}
Customer.layout = Admin;
export default Customer;

