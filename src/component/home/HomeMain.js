import { useEffect, useReducer } from "react";
import queryString from 'query-string';
import productDataConnect from "../../data_connect/productDataConnect";
import productCategoryDataConnect from "../../data_connect/productCategoryDataConnect";

import NavbarMain from "../navbar/NavbarMain";
import HomeBody from "./HomeBody";
import CategoryNav from "./CategoryNav";
import { useHistory, useLocation, withRouter } from "react-router-dom";

const initialProductCategoryStateList = null;
const initialProductStateList = null;

const productCategoryStateListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const productStateListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const HomeMain = () => {
    const location = useLocation();
    const qs = queryString.parse(location.search);

    const [productCategoryStateList, dispatchProductCategoryStateList] = useReducer(productCategoryStateListReducer, initialProductCategoryStateList);
    const [productStateList, dispatchProductStateList] = useReducer(productStateListReducer, initialProductStateList);

    useEffect(() => {
        async function fetchInit() {
            await productCategoryDataConnect().getProductCategory()
                .then(res => {
                    if (res.status === 200 && res.data.message === 'success') {
                        dispatchProductCategoryStateList({
                            type: 'INIT_DATA',
                            payload: res.data.data
                        })
                    }
                })
                .catch(err => {
                    let res = err.response;
                    console.log(res);
                })
        }
        fetchInit();
    }, []);

    useEffect(() => {
        async function fetchInit() {
            if (!productCategoryStateList || !qs) {
                return;
            }

            let productCategory = productCategoryStateList.filter(r => r.id === qs.productCategoryId)[0];

            let params = {
                productCategoryCid: productCategory?.cid || null,
                keyword: qs.keyword || null
            }
            await productDataConnect().getProductWithTotalUnit(params)
                .then(res => {
                    if (res.status === 200 && res.data.message === 'success') {
                        dispatchProductStateList({
                            type: 'INIT_DATA',
                            payload: res.data.data
                        })
                    }
                })
                .catch(err => {
                    let res = err.response;
                    console.log(res);
                })
        }
        fetchInit();
    }, [productCategoryStateList, location])

    return (
        <>
            <NavbarMain></NavbarMain>
            <CategoryNav
                productCategoryStateList={productCategoryStateList}
            ></CategoryNav>
            <HomeBody
                productStateList={productStateList}
            ></HomeBody>
        </>
    );
}

export default HomeMain;