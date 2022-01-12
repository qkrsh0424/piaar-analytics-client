import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import queryString from 'query-string';
import { useEffect, useReducer, useState } from "react";

const Container = styled.div`
    overflow: hidden;
    padding:10px;
`;

const SearchWrapper = styled.div`

`;

const SearchBox = styled.form`
    /* float: left; */
    overflow: hidden;

    .search-input-el{
        padding:5px;
        border: 2px solid #e1e1e1;
        border-radius: 3px;
        transition: all .5s;
        width: ${props=>props.keyword ? '300px' : '150px'};

        &:focus{
            outline: none;
            border: 2px solid #00B8BA;
            width: 300px;
        }
    }

    .search-btn-el{
        padding:5px 10px;
        background:#00B8BA;
        border: 2px solid #00B8BA;
        border-radius: 3px;
        color: white;

        margin-left: 5px;
    }

    @media all and (max-width:992px) {
        .search-input-el{
            width: 100%;
            margin-bottom: 5px;
            padding:3px;
            font-size: 13px;
            &:focus{
                outline: none;
                border: 2px solid #00B8BA;
                width: 100%;
            }
        }

        .search-btn-el{
            padding:3px 10px;
            background:#00B8BA;
            border: 2px solid #00B8BA;
            border-radius: 3px;
            color: white;

            margin-left: 0;
            margin-right: 5px;
            font-size: 13px;
        }

    }
`;

const NavWrapper = styled.div`
    overflow: hidden;
`;

const NavBox = styled.div`
    float: right;
    margin-bottom: 10px;

    .active{
        background:linear-gradient(70deg, #00B8BA, #31CEAE);
        background: -webkit-linear-gradient(70deg, #00B8BA, #31CEAE);
        color:white;
        border:1px solid #00B8BA;
    }
`;

const NavEl = styled.div`
    display: inline-block;
    padding: 5px 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #e1e1e1;
    border-radius: 15px;
    color:#444;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    @media all and (max-width:992px) {
        font-size: 12px;
    }
`;

const initialSearchKeyword = null;

const searchKeywordReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return { ...state };
    }
}

const CategoryNav = (props) => {
    let history = useHistory()
    let location = useLocation();

    const [searchKeyword, dispatchSearchKeyword] = useReducer(searchKeywordReducer, initialSearchKeyword);

    const qs = queryString.parse(location.search);

    useEffect(() => {
        dispatchSearchKeyword({
            type: 'SET_DATA',
            payload: qs.keyword || null
        })
    }, [location])

    const routeTo = (type, productCategoryId) => {
        switch (type) {
            case 'all':
                delete qs.productCategoryId;

                history.replace(
                    queryString.stringifyUrl({
                        url: location.pathname,
                        query: {
                            ...qs
                        }
                    })
                );
                return;
            case 'category':
                history.replace(
                    queryString.stringifyUrl({
                        url: location.pathname,
                        query: {
                            ...qs,
                            productCategoryId: productCategoryId
                        }
                    })
                );
                return;
            default: return null;
        }
    }

    const routeToKeyword = (e) => {
        e.preventDefault();
        if (!searchKeyword || searchKeyword === '') {
            delete qs.keyword;
            history.replace(
                queryString.stringifyUrl({
                    url: location.pathname,
                    query: {
                        ...qs
                    }
                })
            );
            return;
        }
        history.replace(
            queryString.stringifyUrl({
                url: location.pathname,
                query: {
                    ...qs,
                    keyword: searchKeyword
                }
            })
        );
        return;

    }

    const searchKeywordInitialize = () => {
        delete qs.keyword;

        history.replace(
            queryString.stringifyUrl({
                url: location.pathname,
                query: {
                    ...qs
                }
            })
        );
    }
    return (
        <>
            <Container>
                <NavWrapper>
                    <NavBox>
                        <NavEl
                            onClick={() => routeTo('all')}
                            className={`${!qs.productCategoryId ? 'active' : ''}`}
                        >전체</NavEl>
                        {props.productCategoryStateList?.map(r => {
                            return (
                                <NavEl
                                    key={r.id}
                                    onClick={() => routeTo('category', r.id)}
                                    className={`${qs.productCategoryId === r.id ? 'active' : ''}`}
                                >{r.name}</NavEl>
                            );
                        })}
                    </NavBox>
                </NavWrapper>
                <SearchWrapper>
                    <SearchBox 
                        keyword={searchKeyword}
                        onSubmit={(e) => routeToKeyword(e)}
                    >
                        <input type='text' className='search-input-el' value={searchKeyword || ''} onChange={(e) => dispatchSearchKeyword({ type: 'SET_DATA', payload: e.target.value })}></input>
                        <button type='submit' className='search-btn-el'>검색</button>
                        <button type='button' className='search-btn-el' onClick={() => searchKeywordInitialize()}>검색 초기화</button>
                    </SearchBox>
                </SearchWrapper>
            </Container>
        </>
    );
}

export default CategoryNav;