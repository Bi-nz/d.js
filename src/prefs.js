const gateway_v = exports.gateway_v = 6;
const url = exports.url = 'https://discordapp.com/api';
const cdn = exports.cdn = 'https://cdn.discordapp.com';
const api = exports.api = `https://discordapp.com/api/v${gateway_v}`;
const ws = exports.ws = `wss://gateway.discord.gg/?v=${gateway_v}&encoding=json`
const Endpoints = exports.endpoints = {
    login: `${api}/auth/login`,
    logout: `${api}/auth/logout`,
    gateway: `${api}/gateway`
};

exports.API = {
    user: `${api}/users`,
    guilds: `${api}/guilds`,
    me: `${url}/users/@me`
};
