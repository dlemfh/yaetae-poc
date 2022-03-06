export type TrimLeftSlash<S extends string> = S extends `/${infer R}` ? R : S;

export type Split<
  S extends string,
  D extends string
> = S extends `${infer L}${D}${infer R}` ? [L, ...Split<R, D>] : [S];
