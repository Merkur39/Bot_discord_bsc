import { GuildMember, Client } from 'discord.js';
import { ITwitch } from 'types/twitch.interface';

export const sendDM = (gMember: GuildMember, text: string) => {
  gMember.createDM()
    .then(res => res.send(text))
    .catch((err: Error) => console.error(err));
};

export const sendMessageTwitch = (client: Client, res: ITwitch) => {
  console.log('sendMessageTwitch');
  console.log(res.stream.channel.status);
  // const test = client.channels.get('530593706705813515');
  // client.guilds.get('334776590921891841').members.forEach(val => console.log(val.user.username));
  // console.log(client.guilds.get('334776590921891841').memberCount);
};
