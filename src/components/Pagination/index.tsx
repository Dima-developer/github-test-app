import React, { useState, useEffect } from "react";
import styles from './Pagination.module.scss';
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useAppState } from "../../context";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";

const Pagination: React.FC = () => {
    const { state } = useAppState();
    const repositories = state.githubRepos;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [indexPortion, setIndexPortion] = useState<number>(1);
    const [isStart, setIsStart] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [isStartPage, setIsStartPage] = useState<boolean>(true);
    const [isEndPage, setIsEndPage] = useState<boolean>(false);
    let history = useHistory();
    let location = useLocation();

    const repositoriesLength: number = repositories.length;

    useEffect(() => {
        const pageNum: number = Number(location.pathname.slice(1));
        setCurrentPage(pageNum);
        const portionNum: number = Math.ceil(pageNum / 10);
        setIndexPortion(portionNum);
        if (portionNum > 1 && portionNum < (repositoriesLength/10)) {
            setIsStart(false);
            setIsEnd(false);
        } else if (portionNum === 1) {
            setIsStart(true);
            setIsEnd(false);
        } else {
            setIsStart(false);
            setIsEnd(true);
        };
        if (pageNum > 1 && pageNum < repositoriesLength) {
            setIsStartPage(false);
            setIsEndPage(false);
        } else if (pageNum === 1) {
            setIsStartPage(true);
            setIsEndPage(false);
        } else {
            setIsStartPage(false);
            setIsEndPage(true);
        }
    }, [location, repositoriesLength])

    const profilesPerPage = 10;
    let profiles = [];
    for (let i = 1; i <= repositoriesLength; i++) {
        profiles.push(i); // [1 ... 100]
    };

    const pagePortion: number = Math.ceil(repositoriesLength / profilesPerPage);

    const indexPage: number = (indexPortion - 1) * profilesPerPage;
    const profileAmount = profiles.slice(indexPage, indexPage + profilesPerPage)
   
    const previousPortionHandler = () => {
        let currentPortion: number = indexPortion - 1;
        if (currentPortion === 1) {
            setIndexPortion(1);
            setIsStart(true);
            setIsEnd(false);
        } else if (indexPortion > 1) {
            setIndexPortion(indexPortion - 1);
            setIsEnd(false);
            setIsStart(false);
        };
    };
    const nextPortionHandler = () => {
        let currentPortion: number = indexPortion + 1;
        if (currentPortion === pagePortion) {
            setIndexPortion(pagePortion);
            setIsEnd(true);
            setIsStart(false);
        } else if (indexPortion < pagePortion) {
            setIndexPortion(indexPortion + 1);
            setIsStart(false);
        };
    };
    const previousPageHandler = () => {
        let previousPage: number = currentPage - 1;
        if (previousPage === 1) {
            setIsStartPage(true);
            history.push(`/${previousPage}`);
        } else if (currentPage > 1) {
            history.push(`/${previousPage}`);
        };
    };
    const nextPageHandler = () => {
        let nextPage: number = currentPage + 1;
        if (nextPage === repositoriesLength) {
            setIsEndPage(true);
            history.push(`/${nextPage}`);
        } else if (currentPage < repositoriesLength) {
            history.push(`/${nextPage}`);
        };
    };
    return (
        <div className={styles.paginationBlock}>
            {
                pagePortion > 1 &&
                <div
                    className={isStart ? `${styles.btnChevron} ${styles.disabledBtn}` : `${styles.btnChevron}`}
                    onClick={previousPortionHandler}
                >
                    <ChevronsLeft className={styles.chevron} size={26}/>
                </div>
            }
            {
                repositoriesLength > 0 &&
                <div
                    className={isStartPage ? `${styles.btnChevron} ${styles.disabledBtn}` : `${styles.btnChevron}`}
                    onClick={previousPageHandler}
                >
                    <ChevronLeft className={styles.chevron} size={26} />
                </div>
            }
            
            <div className={styles.portions}>
                {
                    profileAmount.map((page, idx) => {
                        return (
                            <NavLink to={`/${page}`} key={idx}>
                                <span
                                    className={
                                        page === currentPage ?
                                            `${styles.selectedPageIndex}` : ""}
                                >
                                    {page}
                                </span>
                            </NavLink>
                            
                        )
                    })
                }
            </div>
            {
                repositoriesLength > 0 &&
                <div
                    className={isEndPage ? `${styles.btnChevron} ${styles.disabledBtn}` : `${styles.btnChevron}`}
                    onClick={nextPageHandler}
                >
                    <ChevronRight className={styles.chevron} size={26} />
                </div>
            }
            
            {
                pagePortion > 1 &&
                <div
                    className={isEnd ? `${styles.btnChevron} ${styles.disabledBtn}` : `${styles.btnChevron}`}
                    onClick={nextPortionHandler}
                >
                    <ChevronsRight className={styles.chevron} size={26} />
                </div>
            }
        </div>
    )
};

export default Pagination;
