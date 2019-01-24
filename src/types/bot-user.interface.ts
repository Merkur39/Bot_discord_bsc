import { RichEmbed } from 'discord.js';

export interface IBotConfig {
  username: string;
  game: string;
  accessRole: string;
  lang: string;
}

export interface IUser {
  id: string;
  username: string;
  tag: string;
  permission: string[];
}
