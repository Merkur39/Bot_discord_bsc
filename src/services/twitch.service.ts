const https = require('https');
import { IResponseGetHttps, ITwitch } from '../types/twitch.interface';

export class Twitch {
  private _onStream: boolean;
  private _urlTwitch: string;

  constructor(name: string) {
    this._urlTwitch = `https://api.twitch.tv/kraken/streams/${ name }?client_id=${ process.env.CLIENT_ID }`;

    this._checkStream(this._urlTwitch).then(res => {
      if (!!res.stream) {
        this._checkOnStream();
      } else {
        console.log('No Stream');
      }
    });
  }

  private _checkStream(urlTwitch: string): Promise<ITwitch> {
    return new Promise((resolve, reject) => {
      https.get(urlTwitch, (resp: IResponseGetHttps) => {
        let data = '';
        resp.on('data', (chunk: BinaryType) => data += chunk);
        resp.on('end', () => resolve(JSON.parse(data)));
      });
    });
  }

  private _checkOnStream() {
    setInterval(() => {
      this._checkStream(this._urlTwitch);
    }, 5000);
  }
}
