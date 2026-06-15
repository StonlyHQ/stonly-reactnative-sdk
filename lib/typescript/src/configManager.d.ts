/**
 * Stonly datacenter (server region) the SDK connects to.
 * 'eu' — European datacenter (default), 'us' — American datacenter.
 */
export type StonlyDatacenter = 'eu' | 'us';
export declare const ConfigManager: {
    setDebugEnabled(debugEnabled: boolean): void;
    setMonitoringEnabled(monitoringEnabled: boolean): void;
    setSentryEnabled(enabled: boolean): void;
    setSegmentAnonymousId(segmentAnonymousId: string): void;
    setWidgetLanguage(languageCode: string): void;
    setWidgetId(widgetId: string, datacenter?: StonlyDatacenter): void;
    setAuthorizedDomains(domains: string[]): void;
    getWidgetId(): Promise<string>;
};
//# sourceMappingURL=configManager.d.ts.map