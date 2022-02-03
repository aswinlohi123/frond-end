// import React from "react";
// import { Table } from "./tablea";
// import Admin from "layouts/Admin.js";

// const app = () => {
//     return ( 
//         <div>
//             <h1>
//                 react
//             </h1>
//             <Table/>
//         </div>
//      );
// }
// app.layout = Admin;
// export default app;






//api calling
import axios from "axios";

import React, { useEffect, useState } from 'react';
//ui importing
import Table from '@material-ui/core/Table';
import MaterialTable from 'material-table';
import Admin from "layouts/Admin.js";
import { requirePropFactory } from "@material-ui/core";




const AddCustemer = () => {
    const [customer, setCustomer] = useState();
    const [isLoaded, setIsLoaded] = useState(true)
    const url = 'http://127.0.0.1:8000/api/add_customer'

    useEffect(() =>{
    async function getCustomer(){
            const res = await axios.get(url).then((res) =>{
             console.log('res',res)
            res?.data && setCustomer(res?.data)
            setIsLoaded(false)
            })       
        }
        if(isLoaded){
            getCustomer()
        }

    },[])
    console.log('customer',customer)
    

         const columns=[
             {
                 title:'Name',field:'cus_name'
             },
             {
                 title:'Email',field:'cus_email'
             },
             {
                title:'Mobile',field:'cus_mobile'
            },
            {
                title:'Address',field:'cus_address'
            },
            {
                title:'Loyality',field:'cus_loyalty'
            },
          ]

     return isLoaded ? (
            <div className="loading" />
          ) : (
                <div>
                    <MaterialTable title="Customer List" 
                    data={customer}
                    columns={columns}
                    
                    editable={{
                        onRowAdd: ( async(newRow)=>{
                           //back end call
                        //   console.log('new row',newRow)
                          await axios.post(url, newRow)
                          .then(() => axios.get(url)
                             .then(res => setCustomer(res?.data))) 
                         }),
                         onRowUpdate:( async(newRow,oldRow)=>{
                            //back end call
                          console.log('new row',newRow)
                           await axios.put(url+"/"+oldRow.c_id, newRow)
                           .then(() => axios.get(url)
                              .then(res => setCustomer(res?.data)))            
                          }),
                    }}

                 
                    options={{
                        // filtering:true,;
                        exportButton:true,
                        actionsColumnIndex:-1,
                        addRowPosition:"first"
                          
                    }}
        
                    />
                </div>
            )
        
  }
  AddCustemer.layout = Admin;
export default AddCustemer; 