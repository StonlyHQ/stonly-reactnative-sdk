declare const Stonly: {
    addListener: (eventName: string, listener: any) => void;
    removeAllListeners: (eventName: string) => void;
    setWidgetId: (widgetId: string) => void;
    setDebugEnabled: (debugEnabled: boolean) => void;
    setWizardEnabled: (wizardEnabled: boolean) => void;
    setMonitoringEnabled: (monitoringEnabled: boolean) => void;
    setSegmentAnonymousId: (segmentAnonymousId: string) => void;
    sendData: (dataObject: object) => void;
    clearSentData: () => void;
    setWidgetLanguage: (languageCode: string) => void;
    setWindowLevel: (windowLevel: number) => void;
    openGuide: (guideId: string, stepId?: null, widgetOptions?: {}) => void;
    openGuidedTour: (guideId: string, stepId?: null) => void;
    openKnowledgeBase: (teamKnowledgeBaseId: string, folderId?: null) => void;
    closeWidget: (widgetRuleId: string) => void;
    identify: (customerId: string, properties?: {}) => void;
    track: (eventName: string) => void;
};
export default Stonly;
//# sourceMappingURL=stonly.d.ts.map