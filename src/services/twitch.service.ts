const https = require('https');

interface ResponseTwitch {
  stream: String;
  _links: {
    self: String;
    channel: String;
  };
}

interface ResponseGetHttps {
  on: {
    (arg0: string, arg1: (chunk: BinaryType) => string): void;
    (arg0: string, arg1: () => void): void;
  };
}

export class Twitch {
  private _onStream: boolean;

  constructor(name: string) {
    const urlTwitch = `https://api.twitch.tv/kraken/streams/${ name }?client_id=${ process.env.CLIENT_ID }`;

    this._start(urlTwitch).then(res => {
      this._onStream = !!res.stream;
      if (this._onStream) {
        this._checkOnStream();
      }
    });
  }

  private _start(urlTwitch: string): Promise<ResponseTwitch> {
    return new Promise((resolve, reject) => {
      https.get(urlTwitch, (resp: ResponseGetHttps) => {
        let data = '';
        resp.on('data', (chunk: BinaryType) => data += chunk);
        resp.on('end', () => resolve(JSON.parse(data)));
      });
    });
  }

  private _checkOnStream() {
    //
  }
}
