exports.OPCodes = {
  DISPATCH: 0,
  HEARTBEAT: 1,
  IDENTIFY: 2,
  STATUS_UPDATE: 3,
  VOICE_STATE_UPDATE: 4,
  VOICE_SERVER_PING: 5,
  RESUME: 6,
  RECONNECT: 7,
  REQUEST_GUILD_MEMBERS: 8,
  INVALID_SESSION: 9,
  HELLO: 10,
  HEARTBACK_ACK: 11
}:

exports.Events = {
  CHANNEL_CREATE: 'createChannel',
  CHANNEL_UPDATE: 'updateChannel',
  CHANNEL_DELETE: 'deleteChannel',
  CHANNEL_PINS_UPDATE: 'updateChannelPins',

  GUILD_DELETE: 'deleteGuild',
  GUILD_UPDATE: 'updateGuild',
  GUILD_CREATE: 'createGuild',
  UILD_BAN_ADD: 'addGuildBan',
  GUILD_BAN_REMOVE: 'removeGuildBan',
  GUILD_EMOJIS_UPDATE: 'updateGuildEmojis',
  GUILD_INTEGRATIONS_UPDATE: 'updateGuildIntegrations',
  GUILD_MEMBER_ADD: 'addGuildMember',
  GUILD_MEMBER_REMOVE: 'removeGuildMember',
  GUILD_MEMBER_UPDATE: 'updateGuildMember',
  GUILD_MEMBER_CHUNKS: 'chunksGuildMember',
  GUILD_ROLE_CREATE: 'roleCreateGuild',
  GUILD_ROLE_UPDATE: 'roleUpdateGuild',
  GUILD_ROLE_DELETE: 'roleDeleteGuild',

  MESSAGE_CREATE: 'createMessage',
  MESSAGE_UPDATE: 'updateMessage',
  MESSAGE_DELETE: 'deleteMessage',
  MESSAGE_DELETE_BULK: 'deleteBulkMessage',
  MESSAGE_REACTION_ADD: 'addMessageReaction',
  MESSAGE_REACTION_REMOVE: 'removeMessageReaction',
  MESSAGE_REACTION_REMOVE_ALL: 'removeAllMessageReaction',

  PRESENCE_UPDATE: 'updatePresence',

  TYPING_START: 'startTyping',
  TYPING_STOP: 'stopTyping',
  USER_UPDATE: 'updateUser',

  VOICE_STATE_UPDATE: 'updateVoiceState',
  VOICE_SERVER_UPDATE: 'updateVoiceServer',
  VOICE_BROADCAST_SUBSCRIBE: 'subscribe',
  VOICE_BROADCAST_UNSUBSCRIBE: 'unsubscribe',

  DISCONNECT: 'disconnect',
  RECONNECTING: 'reconnecting',

  WEBHOOKS_UPDATE: 'updateWebhooks',
  
  READY: 'ready',
  RESUMED: 'resumed',
  DEBUG: 'debug',
  WARN: 'warn',
};
