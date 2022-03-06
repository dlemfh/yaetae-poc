import { Opaque } from 'type-fest';

export type METHOD =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';

export type GET = Opaque<string, 'GET'>;
export type POST = Opaque<string, 'POST'>;
export type PUT = Opaque<string, 'PUT'>;
export type DELETE = Opaque<string, 'DELETE'>;
export type PATCH = Opaque<string, 'PATCH'>;
export type OPTIONS = Opaque<string, 'OPTIONS'>;
export type HEAD = Opaque<string, 'HEAD'>;

export type OpaqueMethod<M extends METHOD> = M extends 'GET'
  ? GET
  : M extends 'POST'
  ? POST
  : M extends 'PUT'
  ? PUT
  : M extends 'DELETE'
  ? DELETE
  : M extends 'PATCH'
  ? PATCH
  : M extends 'OPTIONS'
  ? OPTIONS
  : M extends 'HEAD'
  ? HEAD
  : never;
