export declare type HashRouteMatchers<R extends string> = Record<R, RegExp | ((hash: string) => boolean)>;
export interface UseHashRouteOptions<R extends string> {
    routes: HashRouteMatchers<R>;
    fallback: R;
}
export declare const useHashRoute: <R extends string>({ routes, fallback, }: UseHashRouteOptions<R>) => [R, (hash: string) => void];
