export interface ITwitch {
  stream: IStream;
  _links: ITestLinks;
}

export interface ITestLinks {
  self:    string;
  channel: string;
}

export interface IStream {
  _id:          number;
  game:         string;
  viewers:      number;
  video_height: number;
  average_fps:  number;
  delay:        number;
  created_at:   string;
  is_playlist:  boolean;
  stream_type:  string;
  preview:      IPreview;
  channel:      IChannel;
  _links:       IStreamLinks;
}

export interface IStreamLinks {
  self: string;
}

export interface IChannel {
  mature:                          boolean;
  partner:                         boolean;
  status:                          string;
  broadcaster_language:            string;
  broadcaster_software:            string;
  display_name:                    string;
  game:                            string;
  language:                        string;
  _id:                             number;
  name:                            string;
  created_at:                      string;
  updated_at:                      string;
  delay:                           null;
  logo:                            string;
  banner:                          null;
  video_banner:                    string;
  background:                      null;
  profile_banner:                  string;
  profile_banner_background_color: string;
  url:                             string;
  views:                           number;
  followers:                       number;
  _links:                          IChannelLinks;
}

export interface IChannelLinks {
  self:          string;
  follows:       string;
  commercial:    string;
  stream_key:    string;
  chat:          string;
  features:      string;
  subscriptions: string;
  editors:       string;
  teams:         string;
  videos:        string;
}

export interface IPreview {
  small:    string;
  medium:   string;
  large:    string;
  template: string;
}

export interface IResponseGetHttps {
  on: {
    (arg0: string, arg1: (chunk: BinaryType) => string): void;
    (arg0: string, arg1: () => void): void;
  };
}
