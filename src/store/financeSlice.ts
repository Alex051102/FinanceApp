import { createSlice,type PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

type FinanceState={

  boolAuth:boolean,
  logOrSign:boolean,
  backArrow:boolean
  
}


const initialState: FinanceState = {
  
  boolAuth:false,
  logOrSign:false,
  backArrow:false,
  
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
    }

  },
  
});

/* export const {} = articleSlice.actions; */
export const {setLogOrSign,setBackArrow} = financeSlice.actions;
export default financeSlice.reducer;

