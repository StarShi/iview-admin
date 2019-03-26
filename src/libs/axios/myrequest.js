/**
 * 基于axios封装请求函数
 * created by 石鑫 shi.xin@datatom.com
 *
 */

import axios from "axios";
import qs from 'qs'

let baseurl = GLOBAL_CONST._URL;
/**
 * get请求
 * @param apiPath 请求路径 必传
 * @param  params 传递参数 必传,没有时传空
 * @param successCallback 成功回调函数
 * @param errorCallback   失败回调函数
 */
function getRequest (apiPath, params, successCallback, errorCallback) {
    let url = baseurl + apiPath;
    let req = axios.get(url, {
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false });
        }});
    thenResponse(req, successCallback, errorCallback)
}
/**
 * post请求
 * @param apiPath 必传
 * @param  params 必传,没有时传空
 * @param successCallback 成功回调函数
 * @param errorCallback   失败回调函数
 */
function postRequest (apiPath, params, successCallback, errorCallback) {
    let url = baseurl + apiPath;
    let req = axios.post(url, qs.stringify(params, { indices: false }));
    thenResponse(req, successCallback, errorCallback);
}

/**
 * 请求结果处理
 * @param axiosRequest
 * @param successCallback 成功回调函数
 * @param errorCallback   失败回调函数
 */
function thenResponse (axiosRequest, successCallback, errorCallback) {
    axiosRequest.then((res) => {
        if (res.status === 200) {
            res = res.data;
            if (res.code == '200') {
                successCallback && successCallback(res);
            } else {
                errorCallback && errorCallback(res)
            }
        }
    }).catch((error) => {
        errorCallback && errorCallback(-1, error.message)
    })
}
export {getRequest, postRequest}