export declare const Stonly: {
    setupNavigation(navigation: any): void;
    setupNativeNavigation(navigationRef: any): void;
    identify(customerId: string, properties?: {}): void;
    track(eventName: string): void;
    setDebugEnabled(debugEnabled: boolean): void;
    setMonitoringEnabled(monitoringEnabled: boolean): void;
    setSegmentAnonymousId(segmentAnonymousId: string): void;
    setWidgetLanguage(languageCode: string): void;
    sendData(dataObject: object): void;
    clearSentData(): void;
    setWindowLevel(windowLevel: number): void;
    openGuide(guideId: string, stepId?: null, widgetOptions?: {}): void;
    openGuidedTour(guideId: string, stepId?: null): void;
    openKnowledgeBase(teamKnowledgeBaseId: string, folderId?: null): void;
    closeWidget(widgetRuleId: string): void;
    setStonlyEnabled(enabled: boolean): void;
    getWidgetId(): Promise<string>;
    setWidgetId(widgetId: string): Promise<void>;
    getStoredWidgetId(): Promise<string | null>;
    setAuthorizedDomains(domains: string[]): void;
};
//# sourceMappingURL=index.d.ts.map