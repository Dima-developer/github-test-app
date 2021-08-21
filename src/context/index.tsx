import React, {
    useEffect,
    useContext,
    useReducer
} from "react";
import axios from "axios";
import { ProfileTypes } from "../types";

type AppState = {
    repositories: ProfileTypes[] | [],
    githubRepos: ProfileTypes[] | [],
};

const appData: AppState = {
    repositories: [],
    githubRepos: []
};

type Action =
    | {
        type: 'DATA_FROM_API', payload: ProfileTypes[]
      }
    | {
        type: 'SEARCH_DATA', payload: string
      }

type AppContextProps = {
    state: AppState,
    dispatch: React.Dispatch<Action>
};

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'DATA_FROM_API': {

            return {
                ...state,
                repositories: action.payload,
                githubRepos: action.payload
            }
        }
        case 'SEARCH_DATA': {
            const reposData = state.repositories.filter((item: ProfileTypes)  => {
                if (item.full_name.includes(action.payload)) {

                    return item.full_name
                }
            });

            return {
                ...state,
                githubRepos: reposData
            }
        }
        default: {
            return state
        }
    }
}

const AppStateContext = React.createContext<AppContextProps>({} as AppContextProps);

export const AppStateProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(appStateReducer, appData)
       
    useEffect(() => {
        async function fetchFun() {
        await axios.get('https://api.github.com/repositories')
            .then(({ data }) => {      
                dispatch({type: 'DATA_FROM_API', payload: data})
            })
        }
        fetchFun();
    }, []);
  
  
  return (
    <AppStateContext.Provider value={{state, dispatch}}>
      {children}
    </AppStateContext.Provider>
    )
};

export const useAppState = () => {
    return useContext(AppStateContext)
};
