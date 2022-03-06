import { Opaque } from 'type-fest';
import { Split, TrimLeftSlash } from './helpers';
import { METHOD, OpaqueMethod } from './method';

export type Param = Opaque<string, 'param'>;

type ReplaceParams<Path> = Path extends []
  ? []
  : Path extends [infer S]
  ? S extends `:${string}`
    ? [Param]
    : [S]
  : Path extends [infer S, ...infer R]
  ? S extends `:${string}`
    ? [Param, ...ReplaceParams<R>]
    : [S, ...ReplaceParams<R>]
  : never;

type PackPath<Path, API> = Path extends ['']
  ? API
  : Path extends [infer S]
  ? S extends string
    ? Record<S, API>
    : never
  : Path extends [infer S, ...infer R]
  ? S extends string
    ? Record<S, PackPath<R, API>>
    : never
  : never;

export type PackEndpoint<
  Path extends string,
  Method extends METHOD,
  Response
> = PackPath<
  ReplaceParams<Split<TrimLeftSlash<Path>, '/'>>,
  Record<OpaqueMethod<Method>, Response>
>;

export type PackRouter<Path extends string, Router> = PackPath<
  ReplaceParams<Split<TrimLeftSlash<Path>, '/'>>,
  Router
>;

// test
declare const t1: '/a/:b/c';
declare const t2: TrimLeftSlash<typeof t1>;
declare const t3: Split<typeof t2, '/'>;
declare const t4: ReplaceParams<typeof t3>;
declare const t5: PackEndpoint<typeof t1, 'GET', { data: { hello: 'world' } }>;
declare const api: typeof t5;

// test
const b = 'bbb' as Opaque<'bbb', 'param'>;
const GET = 'GET' as Opaque<'GET', 'GET'>;
const data = api['a'][b]['c'][GET].data;

type UnpackPath<API, Path> = Path extends ['']
  ? API
  : Path extends [infer S]
  ? S extends keyof API
    ? API[S]
    : Opaque<S, 'param'> extends keyof API
    ? API[Opaque<S, 'param'>]
    : never
  : Path extends [infer S, ...infer R]
  ? S extends keyof API
    ? UnpackPath<API[S], R>
    : Opaque<S, 'param'> extends keyof API
    ? UnpackPath<API[Opaque<S, 'param'>], R>
    : never
  : never;

type UnpackMethod<API, Method> = Method extends keyof API ? API[Method] : never;

export type UnpackEndpoint<
  API,
  Path extends string,
  Method extends METHOD
> = UnpackMethod<
  UnpackPath<API, Split<TrimLeftSlash<Path>, '/'>>,
  OpaqueMethod<Method>
>;

// test
declare const t6: '/a/bbb/c';
declare const t7: Split<TrimLeftSlash<typeof t6>, '/'>;
declare const t8: UnpackPath<typeof api, typeof t7>;
declare const t9: UnpackEndpoint<typeof api, typeof t6, 'GET'>;
declare const t10: UnpackEndpoint<typeof api, '/not-found', 'GET'>;
declare const t11: UnpackEndpoint<typeof api, '/a/found/c', 'GET'>;
declare const t12: UnpackEndpoint<typeof api, '/a/found/c', 'POST'>;
