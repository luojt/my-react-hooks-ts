/** 
 * 用户模块接口
 */
 import { httpPost, ResponetFrom } from './request';

 /**
  * 登录
  * @param params
  * @returns
  */
  const login = (params: any): Promise<ResponetFrom> => {
    return httpPost('/user/login', params);
  };

 /**
  * 查询用户列表
  * @param params
  * @returns
  */
 const getUserList = (params: any): Promise<ResponetFrom> => {
   return httpPost('/user/getUserList', params);
 };
 
 /**
  * 查询角色列表
  * @param params
  * @returns
  */
 const getRoleList = (params: any): Promise<ResponetFrom> => {
   return httpPost('/user/getRoleList', params);
 };
 
 export default {
   login,
   getUserList,
   getRoleList
 };
 