const https = require('https');
import { IResponseGetHttps, ITwitch } from '../types/twitch.interface';

export const checkStream = (name: string): Promise<ITwitch> => {
  const urlTwitch = `https://api.twitch.tv/kraken/streams/${ name }?client_id=${ process.env.CLIENT_ID }`;

  return new Promise((resolve, reject) => {
    https.get(urlTwitch, (resp: IResponseGetHttps) => {
      let data = '';
      resp.on('data', (chunk: BinaryType) => data += chunk);
      resp.on('end', () => resolve(JSON.parse(data)));
    });
  });
};

// TODO Use twitch.service.ts & delete this file