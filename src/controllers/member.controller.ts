import { Role, Guild, GuildMember, Client } from 'discord.js';
import { sendDM } from './message.controller';
import { IBotConfig } from 'types/bot-user.interface';

export const guildMemberAdd = (client: Client, gMember: GuildMember, locales: any, config: IBotConfig): void => {
  let accessRole: Role | null;
  client.guilds.forEach((val: Guild) => {
    accessRole = val.roles.find(role => role.name === config.accessRole);
  });
  if (accessRole) {
    sendDM(gMember, locales.message.welcome);
    setTimeout(() => {
      gMember.setRoles([accessRole.id])
        .then(() => console.log('Role has been applied'))
        .catch((err: Error) => console.error('Role has not been applied', err));
    }, 300000); // 5 min
  }
};
