interface Window {
    cardano?: {
        lace?: {
            enable: () => Promise<{
                getUsedAddresses: () => Promise<string[]>;
                            }>;
        };
    };
}