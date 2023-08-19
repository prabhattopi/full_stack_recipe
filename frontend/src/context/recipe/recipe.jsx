import { createContext, useEffect, useReducer } from "react"
import { toast } from "react-toastify"
import api from "../../api"
import useAuth from "../../hooks/useAuth"

export const RecipeContext = createContext()
const initialState = {
    loading: false,
    recipes: [],
    singleRecipe: {},
    savedRecipe: [],
    temsavedRecipe: []

}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_RECIPE":
            return { ...state, recipes: action.payload }
        case "SET_LOADING":
            return { ...state, loading: action.payload }

        case "SET_SINGLE":
            return { ...state, singleRecipe: action.payload }
        case "RESET_SINGLE":
            return { ...state, singleRecipe: {} }
        case "SET_SAVED_RECIPE":
            return { ...state, savedRecipe: action.payload }
        case "SET_TEM_SAVED_RECIPE":
            return { ...state, temsavedRecipe: [...state.temsavedRecipe, action.payload] }
        default:
            return state
    }

}

export const RecipeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { token } = useAuth()

    const searchData = async (query = "pasta", number = 10) => {
        try {

            dispatch({ type: 'SET_LOADING', payload: true });

            const response = await api.get(`/recipes/search?query=${query}&number=${number}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
                },
            });
            if (response.status == "200") {
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

    const singleRecipeInformation = async (id) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            let response = await api.get(`/recipes/single/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
                },
            })

            dispatch({ type: "SET_SINGLE", payload: response.data })
        }
        catch (err) {
            toast.error('Failed to create Post', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
            });
        }

        dispatch({ type: 'SET_LOADING', payload: false });


    }

    const postsavedRecipe = async (data) => {
        try {

            let response = await api.post('/recipes/preference', data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
                    },
                })
             let newData=[...state.savedRecipe,data]
            dispatch({ type: "SET_SAVED_RECIPE", payload:newData })
            toast.success(response.data.message || 'Recipe saved successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
        catch (err) {
            toast.error('Failed to saved recipe', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
            });
        }





    }
    const getSavedRecipe = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            let response = await api.get(`/recipes/single/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
                },
            })

            dispatch({ type: "SET_SINGLE", payload: response.data })
        }
        catch (err) {
            toast.error('Failed to create Post', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
            });
        }

        dispatch({ type: 'SET_LOADING', payload: false });



    }
  const deleteSavedRecipe=async(data)=>{
      try{
        let response=await api.delete(`/recipes/preference/${data.recipeId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
            },
          })
          if(response.status=="200"){
            let filterData=state.savedRecipe.filter(e=>e.recipeId!=data.recipeId)
            dispatch({ type: "SET_SAVED_RECIPE", payload: filterData })
            toast.success(response.data.message || 'Recipe saved successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
            });
          }
      }
      catch(err){
        toast.error('failed to delete preference', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
        });
      }
      
     


  }
    useEffect(() => {
        let isCurrent = true
        const getData = async () => {
            try {

                let response = await api.get("/recipes/preference",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('recipe_walle')}`,
                        },
                    })
          
                dispatch({ type: "SET_SAVED_RECIPE", payload: response.data.recipes })
            }
            catch (err) {
                console.log(err)
            }





        }
        if (isCurrent) {
            getData()
        }
        return () => {
            isCurrent = false
        }
    }, [token])

    const value = {
        state,
        dispatch,
        searchData,
        singleRecipeInformation,
        postsavedRecipe,
        getSavedRecipe,
        deleteSavedRecipe
    }
    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    )
}