import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

interface Process {
  browser: boolean
}
declare var process: Process


let isRefreshing = false;
let failedRequestQueue:any = [];

export function setupApiClient (ctx= undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    //baseURL: 'https://deploy.controlhonorarios.com',
    headers: {
      Authorization: `Bearer ${cookies['feesControlAuth.token']}`
    }
  });
  
  api.interceptors.response.use(response=>{
    return response;
    },
    (error: AxiosError)=>{
      if(error.response?.status === 401){
        if(error.response.data?.code === 'token.expired'){
          cookies = parseCookies(ctx);
  
          const {'feesControlAuth.refreshToken': refreshToken} = cookies;
          const originalConfig = error.config;
  
          if(!isRefreshing){
            isRefreshing = true;
  
            api.post('/refresh-token', {refreshToken}).then(response => {
              const {token} = response.data;
    
              setCookie(ctx, 'feesControlAuth.token', token,{
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
              });
              setCookie(ctx, 'feesControlAuth.refreshToken', response.data.refreshToken,{
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
              });
    
              api.defaults.headers['Authorization']=`Bearer ${token}`;
  
              failedRequestQueue.forEach((request:any) => request.onSuccess(token));
              failedRequestQueue = [];
            }).catch(err => {
              failedRequestQueue.forEach((request:any) => request.onFailure(err));
              failedRequestQueue = [];
  
              if(process.browser){
                signOut();
              }
            }).finally(() => {
              isRefreshing=false;
            });
          }
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess:(token:string)=>{
                originalConfig.headers['Authorization']= `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              onFailure:(err: AxiosError)=>{
                reject(err);
              }
            })
          });
        }
        else {
          if(process.browser){
            signOut();
          }
          else{
            return Promise.reject(new AuthTokenError());
          }
        }
      }
      return Promise.reject(error);
    });
    return api;
}