'use strict';
module.exports = class {
    constructor(data) {
        /**
         * Channel Type
         * @type {Boolean}
         */
        this.type = data.type;
        /**
         * Text-To-Speech
         * @type {Boolean}
         */
        this.tts = data.tts;
        /**
         * The date/time of when the message were sent
         * @type {String}
         */
        this.timestamp = data.timestamp;
        /**
         * Used for validating a message was sent
         * @type {?Snowflake}
         */
        this.nonce = data.nonce;
        /**
         * 
         * @type {Array}
         */
        this.mentions = data.mentions;
        /**
         * @type {Array}
         */
        this.mention_roles = data.mention_roles;
        /**
         * @type {Boolean}
         */
        this.mention_everyone = data.mention_everyone

        /**
         * @type {String}
         */
        this.id = data.id;

        /**
         * @type {Array}
         */
        this.embeds = data.embeds;

        /**
         * @type {Timestamp}
         */
        this.edited_timestamp = data.edited_timestamp;

        /**
         * @type {String}
         */
        this.content = data.content;

        /**
       * @type {String}
       */
        this.channel_id = data.channel_id;

        this.author = data.author ? this.client.users.add(data.author, !data.webhook_id) : null;

        this.member = data.member;

        /**
         * @type {Boolean}
         */
        this.attachments = data.attachments;

        /**
         * @type {String}
         */
        this.guild_id = data.guild.id;
    } 
}