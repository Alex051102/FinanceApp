import { createSlice} from '@reduxjs/toolkit';

type FinanceState={

  boolAuth:boolean,
  logOrSign:boolean,
  backArrow:boolean,
  boolUpdateProfile:boolean,
  boolAddExpense:boolean,
  boolPass:boolean,
  boolDelete:boolean,
  boolLogOut:boolean,


  logOutButt:boolean,
  deleteAccountButt:boolean,

  backHref:string
  
}


const initialState: FinanceState = {
  
  boolAuth:false,
  logOrSign:false,
  backArrow:false,



  boolUpdateProfile:false,
  boolAddExpense:false,

  boolPass:false,
  boolDelete:false,
  boolLogOut:false,
  

  logOutButt:false,
  deleteAccountButt:false,

  backHref:'/'
}

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setLogOrSign(state,action){
      state.logOrSign=action.payload
    },
    setBackArrow(state,action){
      state.backArrow=action.payload
    },
    setUpdateProfile(state,action){
      state.boolUpdateProfile=action.payload
    },
    setAddExpense(state,action){
      state.boolAddExpense=action.payload
    },
    setNewPassword(state,action){
      state.boolPass=action.payload
    },
    setDeleteProfile(state,action){
      state.boolDelete=action.payload
    },
    setLogOut(state,action){
      state.boolLogOut=action.payload
    },

    setDeleteProfileButt(state,action){
      state.deleteAccountButt=action.payload
    },
    setLogOutButt(state,action){
      state.logOutButt=action.payload
    },
    setterBackHref(state,action){
      state.backHref=action.payload
    }

  },
  
});

/* export const {} = articleSlice.actions; */
export const {setterBackHref,setNewPassword,setLogOrSign,setBackArrow,setAddExpense,setUpdateProfile,setDeleteProfile,setLogOut,setDeleteProfileButt,setLogOutButt} = financeSlice.actions;
export default financeSlice.reducer;

