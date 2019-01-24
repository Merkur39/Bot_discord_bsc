import { Client } from 'discord.js';
import { guildMemberAdd } from './controllers/member.controller';
import { IBotConfig } from 'types/bot-user.interface';
import { checkStream } from './controllers/twitch.controller';
import { sendMessageTwitch } from './controllers/message.controller';
import { ITwitch } from 'types/twitch.interface';

/**
 * @export
 * @class Bot
 * @implements {IBot}
 */
export class Bot {
  private _client: Client;
  private _config: IBotConfig;
  private _locales: string;

  /**
   *Creates an instance of Bot.
   * @param {IBotConfig} config
   * @param {string} locales
   * @memberof Bot
   */
  constructor(config: IBotConfig, locales: string) {
    this._config = config;
    this._locales = locales;
    this._start();
  }

  /**
   * Starting bot
   * @private
   * @memberof Bot
   */
  private _start() {
    this._client = new Client();

    this._client.on('ready', () => {
      if (this._config.game.length > 0) {
        this._client.user.setActivity(this._config.game);
      }
      if (this._config.username.length > 0 && this._client.user.username !== this._config.username) {
        this._client.user.setUsername(this._config.username);
      }
      this._client.user.setStatus('online');

      this._client.guilds.forEach(val => {
        const test = val.roles.find(role => role.name === 'Streamer');
        console.log(test);
      });
    });

    this._client.on('guildMemberAdd', async (gMember) => guildMemberAdd(this._client, gMember, this._locales, this._config));

    this._client.login(process.env.TOKEN)
      .then(() => console.info('Bot connected'))
      .catch((err: Error) => console.error('Bot not connected: ', err));
  }
}
