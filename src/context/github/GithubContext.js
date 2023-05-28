import { createContext , useReducer } from "react";
// import axios from "axios";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_CLIENTID = process.env.REACT_APP_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET_KEY;

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        userRepos: {},
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // SEARCH USERS
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

    // GET A SINLGE USER
    const getUser = async (login) => {
      setLoading();

      const response = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/json",
        },
      });

      if ( response.status === 404) {
        window.location = '/notfound'
      }else{
        const data = await response.json();

        // console.log(data);
        dispatch({
          type: "GET_USER",
          payload: data,
        });
      }      
    }; 

    const getUserRepos = async (username) => {
      setLoading();
      const url = `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc`;

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/json",
        },
      });

      if (response.status === 404) {
        window.location = "/notfound";
      } else {
        const data = await response.json();
        // console.log(data);
        dispatch({
          type: "GET_REPOS",
          payload: data,
        });
      }
    };

    const clearUsers = () => dispatch({ type: 'CLEAR_USERS'})

    const value = {
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers, 
        getUser,
        getUserRepos,
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