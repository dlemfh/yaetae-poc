export type API = import('yaetae').API<typeof src>;
declare const src: import("yaetae").Router<Record<"api", Record<"admin", Record<"users", Record<import("yaetae/src/method").GET, import("./src/models/User").User[]> & Record<import("yaetae/src/parse").Param, Record<"articles", Record<import("yaetae/src/method").GET, import("./src/models/Article").Article[]>>> & Record<"very", Record<"very", Record<"long", Record<"path", Record<import("yaetae/src/method").POST, any>>>>>>> & Record<"articles", Record<import("yaetae/src/method").GET, import("./src/models/Article").Article[]> & Record<import("yaetae/src/method").PUT, import("./src/models/Article").Article>>>>;
export {};
