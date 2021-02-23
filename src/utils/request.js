import axios from "axios";
import { Message } from "element-ui";
class AxiosRequset {
  constructor() {
    // 请求地址
    this.baseURL = this.setURLWithEnv();
    // 超时时间
    this.timeout = 10000;
    // 请求队列
    this.requestQueue = {};
    this.validateStatus = status => {
      // 自定义响应成功的HTTP状态码
      return /^(2|3)\d{2}$/.test(status);
    };
  }
  // 针对不同的环境设置不同的请求地址
  setURLWithEnv() {
    switch (process.env.NODE_ENV) {
      case "developement":
        return "http://49.233.191.35:3000";
      case "production":
        return "http://49.233.191.35:3000";
      case "test":
        return "http://49.233.191.35:3000";
    }
  }
  /**
   * 设置拦截器
   * @param {any} instance axios实例
   * @param {string} url 请求地址
   */
  setInterceptor(instance, url) {
    // 设置请求拦截器
    instance.interceptors.request.use(
      config => {
        // 设置当前请求在请求队列中的key值，用以在响应完成之后从队列中删除该请求
        this.queueKey = `${config.method}-${url}`;
        // 请求前 增加请求队列
        Reflect.defineProperty(this.requestQueue, this.queueKey, {
          value: url
        });
        return config;
      },
      err => {
        // 增加前台校验token是否过期，需要登录时后台传递过期时间
        Promise.reject(err);
      }
    );
    // 设置响应拦截器
    instance.interceptors.response.use(
      res => {
        // 请求完成之后删除请求对列中的对应请求
        Reflect.deleteProperty(this.requestQueue, this.queueKey);
        return Promise.resolve(res.data);
      },
      error => {
        Reflect.deleteProperty(this.requestQueue, this.queueKey);
        Message.error(error.response.data);
        return Promise.reject(error.response);
      }
    );
  }
  /**
   * 请求数据
   * @param {any} options 请求配置
   */
  request(options) {
    let instance = axios.create();
    let config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
      validateStatus: this.validateStatus
    };
    this.setInterceptor(instance, options.url); // 给这个实例增加拦截功能
    return instance(config); // 返回的是一个promise
  }
}
export default new AxiosRequset();
