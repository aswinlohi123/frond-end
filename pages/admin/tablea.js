
import MaterialTable from 'material-table';


export const Table=()=>{
    const data=[

        {name:'aswin',age:23},
        {name:'sanju',age:25},
        {name:'vishnu',age:26},
        {name:'ishu',age:13},
    ]
     const columns=[
         {
             title:'Name',field:'name'
         },
         {
             title:'Age',field:'age'
         }
     ]
    return (
        <div>
            <MaterialTable title="Material Table" 
            data={data}
            columns={columns}
            editable={{
                onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
                    const updatedRows=[...data,newRow]
                     setTimeout(()=>{
                         setData(updatedRows)
                        resolve()
                    },2000)
                 
                    console.log(newRow)
                })
            }}
           
            options={{
                filtering:true,
                exportButton:true,
                  
            }}

            />
        </div>
    )

}
export default Table;

