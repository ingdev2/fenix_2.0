export interface Itokens {
    access_token: string;
    refresh_token: string;
}
const LocalStorageService = (function () {
    function _setToken(tokenObj: Itokens) {
        localStorage.setItem("access", tokenObj.access_token);
        localStorage.setItem("refresh", tokenObj.refresh_token);
    }
    function _getAccessToken() {
        return localStorage.getItem("access");
    }
    function _getRefreshToken() {
        return localStorage.getItem("refresh");
    }
    function _clearToken() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }
    return {
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken,
    };
})();
export default LocalStorageService;