/*
 * @Author: Dad
 * @Date: 2021-03-27 09:32:55
 * @LastEditTime: 2021-03-30 14:37:02
 * @LastEditors: Dad
 * @Description:
 */
import Cookies from 'js-cookie';

const TokenKey: string = 'authorization';
const TypeKey: string = 'authority';

export const getToken: () => string = () => Cookies.get(TokenKey);

export const setToken: (arg0: string) => void = (token) => Cookies.set(TokenKey, token);

export const removeToken: () => void = () => Cookies.remove(TokenKey);

export const removeType: () => void = () => localStorage.removeItem(TypeKey);
