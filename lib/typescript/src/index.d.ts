import type { StonlyDatacenter } from './configManager';
export type { StonlyDatacenter } from './configManager';
export declare const Stonly: {
    setupNavigation(navigation: any): void;
    setupNativeNavigation(navigationRef: any): void;
    identify(customerId: string, properties?: {}): void;
    track(eventName: string): void;
    setDebugEnabled(debugEnabled: boolean): void;
    setMonitoringEnabled(monitoringEnabled: boolean): void;
    /**
     * Enables or disables SDK crash reporting to Stonly servers (Sentry).
     * Enabled by default — call with `false` to opt out.
     * For full silence, call before `setWidgetId`; calling at runtime
     * closes an already-started reporter.
     */
    setSentryEnabled(enabled: boolean): void;
    setSegmentAnonymousId(segmentAnonymousId: string): void;
    setWidgetLanguage(languageCode: string): void;
    sendData(dataObject: object): void;
    clearSentData(): void;
    setWindowLevel(windowLevel: number): void;
    openGuide(guideId: string, stepId?: Number | null, widgetOptions?: {}): void;
    openGuidedTour(guideId: string, stepId?: Number | null): void;
    openKnowledgeBase(teamKnowledgeBaseId: string, folderId?: Number | null): void;
    closeWidget(widgetRuleId: string): void;
    setStonlyEnabled(enabled: boolean): void;
    getWidgetId(): Promise<string>;
    /**
     * Initializes the Stonly SDK with the given widget id.
     *
     * @param datacenter Stonly datacenter (server region) the SDK connects to:
     * 'eu' (European, default) or 'us' (American).
     */
    setWidgetId(widgetId: string, datacenter?: StonlyDatacenter): Promise<void>;
    getStoredWidgetId(): Promise<string | null>;
    getStoredDatacenter(): Promise<StonlyDatacenter | null>;
    setAuthorizedDomains(domains: string[]): void;
};
//# sourceMappingURL=index.d.ts.map