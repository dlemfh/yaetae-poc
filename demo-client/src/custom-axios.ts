import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { API } from 'demo-server/types';
import { METHOD } from 'yaetae/src/method';
import { UnpackEndpoint } from 'yaetae/src/parse';

// https://github.com/ghoullier/awesome-template-literal-types#dot-notation-string-type-safe
// TODO: make it possible to autocomplete url path

export default function customAxios<
  Method extends METHOD,
  Path extends `/api/${string}`
>(
  method: Method,
  url: Path,
  config?: Omit<AxiosRequestConfig, 'method' | 'url'>
): UnpackEndpoint<API, Path, Method> extends never
  ? never
  : AxiosPromise<UnpackEndpoint<API, Path, Method>> {
  return axios({ method, url, ...config }) as any;
}
