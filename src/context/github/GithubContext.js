import { createContext , useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {
      setLoading()
      const params = new URLSearchParams({
        q: text,
      })
      const response = await fetch(
        `${GITHUB_URL}/search/users?${params}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/json",
          },
        }
      );
      const { items } = await response.json();

      console.log(items);
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }; 

    const clearUsers = () => dispatch({ type: 'CLEAR_USERS'})

    const value = {
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }

    const setLoading = () => {
      dispatch({
        type: 'SET_LOADING'
      })
    }

    return <GithubContext.Provider value = {value}  >
        {children}
    </GithubContext.Provider>

}

export default GithubContext