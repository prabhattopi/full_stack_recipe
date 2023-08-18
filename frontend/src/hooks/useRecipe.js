import { useContext } from 'react'
import { RecipeContext } from '../context/recipe/recipe'

const useRecipe = () => {
   return useContext(RecipeContext)
}

export default useRecipe