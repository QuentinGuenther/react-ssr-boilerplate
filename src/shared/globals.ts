declare const __isBrowser__: boolean;
const _isBrowser = __isBrowser__;
export { _isBrowser as isBrowser };

declare global {
    interface Window { 
        __INITIAL_DATA__: string 
    }
}