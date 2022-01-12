import axios from 'axios';

let ANALYTICS_API_HOST_ADDRESS = process.env.REACT_APP_ANALYTICS_API_HOST;

const productCategoryDataConnect = () =>{
    return {
        getProductCategory: async function(){
            return axios.get(`${ANALYTICS_API_HOST_ADDRESS}/api/v1/product-category/list`,{
                withCredentials:true
            })
        }
    }
}

export default productCategoryDataConnect;