//api calling
import axios from "axios";

import React, { useEffect, useState } from "react";
//ui importing
import Table from "@material-ui/core/Table";
import MaterialTable from "material-table";
import AddIcon from '@material-ui/icons/Add';
import Admin from "layouts/Admin.js";
import { requirePropFactory } from "@material-ui/core";
import LoyaltyTwoToneIcon from '@material-ui/icons/LoyaltyTwoTone';

const AddCustemer = () => {
    const [customer, setCustomer] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const url = "http://127.0.0.1:8000/api/add_customer";

    useEffect(() => {
        async function getCustomer() {
            const token = localStorage.getItem('token')
            const res = await axios.get(url,  { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                console.log("res", res);
                res?.data && setCustomer(res?.data);
                setIsLoaded(false);
            });
        }
        if (isLoaded) {
            getCustomer();
        }
    }, []);
    console.log("customer", customer);

    const columns = [
        {
            title: "Name",
            field: "cus_name",
            cellStyle:{color:'black'},
            headerStyle:{color:"white"}
        },
        {
            title: "Email",
            field: "cus_email",
            headerStyle:{color:"white"}
        },
        {
            title: "Mobile",
            field: "cus_mobile",
            headerStyle:{color:"white"}
        },
        {
            title: "Address",
            field: "cus_address",
            headerStyle:{color:"white"},
            render:(rowData)=><div style={{backgroundcolor:"black"}}>{rowData.cus_address}</div>
        },
        {
            title: "Loyality",
            field: "cus_loyalty",
            headerStyle:{color:"white"},
            render: (rowData) => <div> {rowData.cus_loyalty == true ? 
            <span style={{ background: "#ff0000",borderRadius:"5px",paddingLeft:8,paddingRight:8, fontStyle:'italic',width:60,align:'center'}}>loyal<yaltyTwoToneIcon/></span> : 
            <span style={{ background: "#d2ff4d",borderRadius:"5px",paddingLeft:8,paddingRight:8,fontStyle:'italic',width:60,align:'center'}}>ordinary</span>
            } </div>,
        
        },
    ];

    return isLoaded ? (
        <div className="loading" />
    ) : (
        <div>
            <MaterialTable 
                title="Customer List"
                icons={{Add:()=>< AddIcon />}}
                data={customer}
                columns={columns}
                //add new table
                editable={{
                    onRowAdd: async (newRow) => {
                        //back end call
                        //   console.log('new row',newRow)
                        await axios
                            .post(url, newRow)
                            .then(() => axios.get(url).then((res) => setCustomer(res?.data)));
                    },
                    ///update table
                    onRowUpdate: async (newRow, oldRow) => {
                        //back end call
                        console.log("new row", newRow);
                        console.log("old row", oldRow);
                        await axios
                            .put(url + "/" + oldRow.cus_id, newRow)
                            .then(() => axios.get(url).then((res) => setCustomer(res?.data)));
                    },
                    //delete table 
                    onRowDelete: async (oldRow) => {
                        //back end call
                        await axios
                            .delete(url + "/" + oldRow.cus_id)
                            .then(() => axios.get(url).then((res) => setCustomer(res?.data)));
                    },
                }}
                options={{
                    // filtering:true,;
                    exportButton: true,
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                    rowStyle:(data,index)=>index%2==0?{background:"#c2d9ff"}:null,
                    headerStyle:{background:"#7B1BAB",fontStyle:'italic'}
                }}
            />
        </div>
    );
};
AddCustemer.layout = Admin;
export default AddCustemer;













