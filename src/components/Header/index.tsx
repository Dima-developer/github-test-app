import React, { useState } from "react";
import { useAppState } from "../../context";
import { useHistory } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
    const { dispatch } = useAppState();
    const [repositoryName, setRepositoryName] = useState<string>('');
    let history = useHistory();

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRepositoryName(e.target.value);
    };

    const searchHandler = (): void => {
        dispatch({ type: 'SEARCH_DATA', payload: repositoryName });
        history.push('/1');
    };
    const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
         if (event.code === "Enter") {
            dispatch({ type: 'SEARCH_DATA', payload: repositoryName });
            history.push('/1'); 
        }
    }
    return (
        <div className={styles.headerBar}>
            <div className={styles.searchBar}>
                <label htmlFor="search_bar">Search Github profile</label>
                <input
                    className={styles.input}
                    id="search_bar"
                    type="text"
                    value={repositoryName}
                    onChange={changeNameHandler}
                    onKeyUp={enterHandler}
                    placeholder="Enter github profile name"
                />
                <button
                    className={styles.btn}
                    onClick={searchHandler}
                >
                    Search
                </button>
            </div>
            
        </div>
    )
}
export default Header;