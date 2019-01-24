import { Client } from 'discord.js';
import { guildMemberAdd } from './controllers/member.controller';
import { IBotConfig } from 'types/bot-user.interface';
import { checkStream } from './controllers/twitch.controller';
import { sendMessageTwitch } from './controllers/message.controller';

/**
 * @export
 * @class Bot
 * @implements {IBot}
 */
export class Bot {
  private _client: Client;
  private _config: IBotConfig;
  private _locales: string;
  private _onStream: boolean;

  /**
   *Creates an instance of Bot.
   * @param {IBotConfig} config
   * @param {string} locales
   * @memberof Bot
   */
  constructor(config: IBotConfig, locales: string) {
    this._config = config;
    this._locales = locales;
    this._onStream = false;
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

      checkStream('merkur_tv').then(res => {
        if (res.stream) {
          this._onStream = true;
          sendMessageTwitch(this._client, res);
        } else {
          this._onStream = false;
        }
      });
    });

    // const intervalDefault = setInterval(() => {
    //   checkStream('merkur_tv').then(res => {
    //     res.stream ? state = true : state = false;

    //     if (!state) {
    //       sendMessageTwitch(this._client);
    //     }
    //   });
    // }, 1000000);

    this._client.on('guildMemberAdd', async (gMember) => guildMemberAdd(this._client, gMember, this._locales, this._config));

    this._client.login(process.env.TOKEN)
      .then(() => console.info('Bot connected'))
      .catch((err: Error) => console.error('Bot not connected: ', err));
  }
}
