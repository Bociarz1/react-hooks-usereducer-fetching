import { useEffect, useReducer } from "react";
import axios from 'axios';

const actions = {
  SUCCESS: 'SUCCESS',
  UNSUCCESS: 'UNSUCCESS'
}
// 1. create initialState as an Object
const initialState = {  
  post:'',
  error:''
}
// 2. create reducer with ACTION.PAYLOAD
const reducer = (state,action) => {
  switch(action.type) {
    case actions.SUCCESS:
      return {
        post: action.payload,
        error:''
      }
    case actions.UNSUCCESS:
      return {
        post:'',
        error: action.payload
      }  
  }
}

function FetchingData() {
  // 3. create useReducer
  const [state, dispatch] = useReducer(reducer, initialState)
  // 4. get request
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(res=> {
        console.log(res.data.title)
        // 5. dispatch with action as an Object
        dispatch({type:actions.SUCCESS, payload:res.data.title})
      })
      .catch(err=> {
        console.log(err)
        dispatch({type:actions.UNSUCCESS, payload:err.message})
      })
  },[])

  return ( 
    <>
    {/* 6. display in UI */}
      <h4>Message:</h4>
      {state.post? state.post: state.error}
    </>
   );
}

export default FetchingData;