import { createContext, useReducer } from "react"
import { toast } from "react-toastify"
import api from "../../api"

export const RecipeContext= createContext()
const initialState={
    loading:false,
    recipes:[],
    singleRecipe:{},

}

const reducer=(state,action)=>{
    switch(action.type){
        case "SET_RECIPE":
             return {...state,recipes:action.payload}
        case "SET_LOADING":
             return {...state,loading:action.payload}     

         case "SET_SINGLE":
            return {...state,singleRecipe:action.payload}   
        case "RESET_SINGLE":
            return {...state,singleRecipe:{}}  
         default:
             return state     
    }

}

export const RecipeProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initialState)


     const searchData=async(query="pasta",number=10)=>{
        try {
   
            dispatch({ type: 'SET_LOADING', payload: true });
           
            const response = await api.get(`/recipes/search?query=${query}&number=${number}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
                  },
              });
             if(response.status=="200"){
               console.log("hello")
                dispatch({ type: 'SET_RECIPE', payload: response.data.data });
                toast.success(response.data.message || 'Post created successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                  });
             }
          
    
            } catch (error) {
            toast.error('Failed to create Post', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              hideProgressBar: false,
            });
          }
          dispatch({ type: 'SET_LOADING', payload: false });


     }

  const singleRecipeInformation=async(id)=>{
      try{
        dispatch({ type: 'SET_LOADING', payload: true });
        let response=await api.get(`/recipes/single/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
              },
          })

          dispatch({type:"SET_SINGLE",payload:response.data})
      }
      catch(err){
        toast.error('Failed to create Post', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          });
      }

      dispatch({ type: 'SET_LOADING', payload: false });
     
      
  }

    const value={
      state,
      dispatch,
      searchData,
      singleRecipeInformation
    }
     return (
         <RecipeContext.Provider value={value}>
         {children}
         </RecipeContext.Provider>
     )
}