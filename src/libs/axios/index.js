import Vue from 'vue';
import axios from 'axios'
import {getRequest,postRequest} from './myrequest'


Vue.prototype.$axios = axios; //自定义axios属性
Vue.prototype.$getRequest = getRequest; //自定义getRequest方法
Vue.prototype.$postRequest = postRequest; //自定义postRequest方法
export default {};