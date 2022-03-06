import { RequestHandler, RouteParameters } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { METHOD } from './method';
import { PackEndpoint, PackRouter } from './parse';

// Taken and adapted from @types/express-serve-static-core
export interface IRouterMatcher<API, Method extends METHOD> {
  <
    Route extends string,
    P = RouteParameters<Route>,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
  >(
    path: Route,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): Router<API & PackEndpoint<Route, Method, ResBody>>;
}

// Taken and adapted from @types/express-serve-static-core
export type Router<API = {}> = RequestHandler & {
  get: IRouterMatcher<API, 'GET'>;
  post: IRouterMatcher<API, 'POST'>;
  put: IRouterMatcher<API, 'PUT'>;
  delete: IRouterMatcher<API, 'DELETE'>;
  patch: IRouterMatcher<API, 'PATCH'>;
  options: IRouterMatcher<API, 'OPTIONS'>;
  head: IRouterMatcher<API, 'HEAD'>;

  // TODO: needs improvement
  use: <Route extends string, T>(
    path: Route,
    ...routers: Array<Router<T>>
  ) => Router<API & PackRouter<Route, T>>;
};

export type API<R> = R extends Router<infer A> ? A : never;
