import React from "react";
import styles from "./Profile.module.scss";
import { useParams } from "react-router-dom";
import { useAppState } from "../../context";
import { ProfileTypes } from "../../types";
import { useEffect } from "react";
import { useState } from "react";

const Profile: React.FC = () => {
    const { state } = useAppState();
    const repositories = state.githubRepos;

    const [repository, setRepository] = useState<ProfileTypes | {}>({});

    let page = Number(useParams<{page: string}>().page);

    const repos = repositories[page - 1];

    useEffect(() => {
        setRepository(repos)
    }, [repos, repositories]);
    
    return (
        <div className={styles.profile}>
            {
                repository && Object.keys(repository).length > 0
                    ? (<>
                        <div className={styles.imageBlock}>
                            <img
                                src={(repository as ProfileTypes).owner.avatar_url}
                                alt="profile"
                            />
                        </div>
                        <div className={styles.descriptionBlock}>
                            <h3>Information about github profile</h3>
                            <ul className={styles.descriptionRepo}>
                                <li><span>Profile owner:</span>{(repository as ProfileTypes).owner.login}</li>
                                <li><span>Repository:</span>{(repository as ProfileTypes).name}</li>
                                <li>
                                    <span>Repository URL:</span>
                                    <a href={(repository as ProfileTypes).html_url} target="blank">
                                        {(repository as ProfileTypes).html_url}
                                    </a>
                                </li>
                                <li><span>Description:</span>{(repository as ProfileTypes).description}</li>
                            </ul>
                        </div>
                    </>)
                    : (<div>
                            <span className={styles.infoBlock}>
                                Data loading...
                            </span>
                            <span className={styles.infoBlock}>
                                Or something went wrong.
                            </span>
                       </div>)
            }
            
        </div>
    )
};
export default Profile;