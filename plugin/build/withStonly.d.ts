import type { ConfigPlugin } from 'expo/config-plugins';
export interface StonlyPluginProps {
  widgetId: string;
  iosUrlScheme?: string | string[];
  androidUrlScheme?: string | string[];
}
declare const withStonly: ConfigPlugin<StonlyPluginProps>;
export default withStonly;
