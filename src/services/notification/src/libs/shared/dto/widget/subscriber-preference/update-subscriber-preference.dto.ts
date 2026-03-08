import { ChannelTypeEnum } from '../../../types';

interface IUpdateSubscriberPreferenceDto {
  channel?: IChannelPreference;

  enabled?: boolean;
}

interface IChannelPreference {
  type: ChannelTypeEnum;

  enabled: boolean;
}
