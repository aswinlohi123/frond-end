// import axios from "axios";
// import React, { useEffect, useState } from 'react';
// import Table from '@material-ui/core/Table';
// import MaterialTable from 'material-table';
// import Admin from "layouts/Admin.js";
// import { Avatar, Grid } from "@material-ui/core";




// const AddCustemer = () => {
//     const [customer, setCustomer] = useState();
//     const [isLoaded, setIsLoaded] = useState(true)

//     useEffect(() =>{
//     async function getCustomer(){
//             const res = await axios.get('http://127.0.0.1:8000/api/add_customer').then((res) =>{
//              console.log('res',res)
//             res?.data && setCustomer(res?.data)
//             setIsLoaded(false)
//             })       
//         }
//         if(isLoaded){
//             getCustomer()
//         }

//     },[])
//     console.log('customer',customer)
    

//          const columns=[
//              {
//                  title:'Name',field:'cus_name', render:(row)=><Grid container alignItems="center">
//                     <Grid item sm={3}>
//                     <Avatar  style={{backgroundColor:"#34c9b3",Opacity:".005px"}}>{row.cus_name[0]}</Avatar>
//                      </Grid> 
//                      <Grid item>
//                      {row.cus_name}
//                      </Grid> 
//                        </Grid>
//              },
//              {
//                  title:'Email',field:'cus_email'
//              },
//              {
//                 title:'Mobile',field:'cus_mobile'
//             },
//             {
//                 title:'Address',field:'cus_address'
//             },
//             {
//                 title:'Loyality',field:'cus_loyalty'
//             },
//             {
//                 title:'cus_join_date',field:'cus_join_date'
//             },
//           ]


//      return isLoaded ? (
//             <div className="loading" />
//           ) : (
//                 <div>
//                     <MaterialTable title="Customer List" 
//                     data={customer}
//                     columns={columns}
//                     editable={{
//                         onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
//                             const updatedRows=[...data,newRow]
//                              setTimeout(()=>{
//                                  setData(updatedRows)
//                                 resolve()
//                             },2000)
                         
//                             console.log(newRow)
//                         }),
//                         onRowDelete:selectedRow=> new Promise((resolve,reject)=>{
//                             const index=selectedRow.tableData.id;
//                             const updatedRows=[...data]
//                             updatedRows.splice(index,1)
//                             setTimeout(()=>{
//                                 setData(updatedRows)
//                                 resolve()
//                             })
                           
//                         })
//                     }}
                   
//                     options={{
//                         // filtering:true,
//                         exportButton:true,
//                         addRowposition:"first",
//                         actionsColumnIndex:-1,

                        
                          
//                     }} 
                    
        
//                     />
//                 </div>
//             )
        
//   }
//   AddCustemer.layout = Admin;
// export default AddCustemer;  












import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}