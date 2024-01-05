import { createSlice } from "@reduxjs/toolkit";

let initialState={
    items:[{
        id:'1',
        taskName: "Make an Edit functionality",
        progress:40,
        createdDate: "1/10/23",
        deadline: "2024-01-04",
        message: "Lorem ipsum dolor, sit amet",
        status: "ongoing",
    },
    {   
        id:'2',
        taskName: "Make an Delete functionality",
        progress:22,
        createdDate: "1/12/23",
        deadline: "2024-01-27",
        message: "Llorem cbdh jf hkgiur r ghriug",
        status: "completed",
    },
    {
        id:'3',
        taskName: "Make an Edit functionality",
        progress:30,
        createdDate: "01/11/23",
        deadline: "2024-01-04",
        message: "Lorem ipsum dolor, sit amet",
        status: "ongoing",
    },
    {   
        id:'4',
        taskName: "Make an Delete functionality",
        progress:69,
        createdDate: "1/1/24",
        deadline: "2024-01-27",
        message: "Llorem cbdh jf hkgiur r ghriug",
        status: "completed",
    }],
}

export const tableSlice = createSlice({
    name:'table',
    initialState,
    reducers:{
        addItem:(state,action)=>{ 
            return {items:[...action.payload]}
        }
    }
})

export const {addItem} = tableSlice.actions
export default tableSlice.reducer