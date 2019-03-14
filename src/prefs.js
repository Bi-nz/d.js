const gateway_v = exports.gateway_v = 6;
const api = exports.api = `https://discordapp.com/api/v${gateway_v}`;
const Endpoints = exports.endpoints = {
    login: `${api}/auth/login`,
    logout: `${api}/auth/logout`,
    gateway: `${api}/gateway`
};