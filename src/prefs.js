const gateway_v = exports.gateway_v = 7;
const api = exports.api = `https://discordapp.com/api/v${gateway_v}`;
const ws = exports.ws = `wss://gateway.discord.gg/?v=${gateway_v}&encoding=json`
const Endpoints = exports.endpoints = {
    login: `${api}/auth/login`,
    logout: `${api}/auth/logout`,
    gateway: `${api}/gateway`,

};