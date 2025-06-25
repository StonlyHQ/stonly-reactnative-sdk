import type { ConfigPlugin } from 'expo/config-plugins';
import { withPlugins } from 'expo/config-plugins';
import { withStonlyAndroid } from './withStonlyAndroid';
import { withStonlyIOS } from './withStonlyIOS';

export interface StonlyPluginProps {
  widgetId: string;
  iosUrlScheme?: string | string[];
  androidUrlScheme?: string | string[];
}

const withStonly: ConfigPlugin<StonlyPluginProps> = (config, props) => {
  if (!props?.widgetId) {
    throw new Error('Stonly plugin requires a widgetId to be specified.');
  }

  return withPlugins(config, [
    [withStonlyAndroid, props],
    [withStonlyIOS, props],
  ]);
};

export default withStonly;
