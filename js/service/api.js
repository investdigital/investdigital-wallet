/*
*
* Api service
*
*/

//import showToast from '../utils/toast';

// api
const baseApi = 'http://192.168.1.189:8882/wallet';

const btcApi = 'http://192.168.1.189:8882/BitCoin';

const fetchService = (url, options = {}) => {
  return fetch(url, options)
  .then(response => {
    return response.json();
  })
  .then(json => {
//    showToast(json.message);
    return json;
  })
  .catch(error => {
//    showToast('网络错误');
    console.warn(error);
  });
};

// apis
export default class Api {

  // 获取 首页
  static getBalance({address,type}) {
//     console.log(`${address},${type}`)
      return fetchService(`${baseApi}/getBlanace/${address}/${type}`);
     }
  // 获取 实时价格行情
  static getAllPrice() {
      return fetchService(`${btcApi}/getAllPrice`);
     }
    //获取nonce
   static getNonce({address}){
       return fetchService(`${baseApi}/getNonce/${address}`,{method: "GET"});
   }
   //发送ETH
    static sendETH({txStr}){
        let formData = new FormData();
        formData.append("tx",txStr);
        return fetchService(`${baseApi}/sendTx`,{method: "POST",body: formData});
    }

//     // 获取 NONCE
//     static getNonce(address){
////     console.log(address);
//         return fetchService(`${baseApi}/getNonce/${address}`);
//        }
        //  发起交易 获取交易ID
//    static sendTransaction(){
   //  console.log();
//      return fetchService(`${baseApi}/sendTx`);
//           }

//    获取 首页列表
    static getOrderList(order) {
      const queryParams = order ? `?order=${order}` : '';
      return fetchService(`${baseApi}/article${queryParams}`);
    }
//
//  // 获取order订单详情
//  static getOrderDetail(order_id) {
//    return fetchService(`${baseApi}/order/${order_id}`);
//  }
//
//  // 搜索订单
//  static   SearchOrderList(like_data) {
//    return fetchService(`${baseApi}/like`, {
//      method: 'POST',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(like_data)
//    })
//  }
//
}
