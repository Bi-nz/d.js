exports = class {
    constructor(data) {
        /**
         * @type {Object}
         */
        this.user = {
            verified: data.verified,
            username: data.username,
            mfa_enabled: data.mfa_enabled,
            id: data.id,
            email: data.email,
            discriminator: data.discriminator,
            bot: data.bot,
            avatar: data.avatar,
            avatarUrl: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=256`
        };
        /**
         * @type {Array}
         */
        this.shard = data.shard;
        /**
         * @type {String}
         */
        this.session_id = data.session_id;
        /**
         * @type {Array}
         */
        this.relationships = data.relationships;
        /**
         * @type {Array}
         */
        this.private_channels = data.private_channels;
        /**
         * @type {Array}
         */
        this.presences = data.presences;
        /**
         * @type {Array}
         */
        this._trace = data._trace;
    }
}