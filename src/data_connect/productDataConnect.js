import axios from 'axios';

let ANALYTICS_API_HOST_ADDRESS = process.env.REACT_APP_ANALYTICS_API_HOST;

const productDataConnect = () =>{
    return {
        getProductWithTotalUnit: async function(params){
            return axios.get(`${ANALYTICS_API_HOST_ADDRESS}/api/v1/product/list-fj/with-unit`,{
                params:params,
                withCredentials:true
            })
        }
    }
}

export default productDataConnect;