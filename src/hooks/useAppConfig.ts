import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config";

export interface AppConfig {
    iosQrImage?: string;
    androidQrImage?: string;
    iosLink?: string;
    androidLink?: string;
    logoUrl?: string; // Content Block (site-config)
    liveVideoUrl?: string; // Content Block (site-config)
    audioStreamUrl?: string; // Content Block (site-config)
    headerMarqueeText?: string; // Content Block (site-config)
}

export const useAppConfig = () => {
    const [config, setConfig] = useState<AppConfig | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                // Fetch App Config (Links, QRs)
                // Using /v1/cms/app-config to ensure it hits the correct route
                const appConfigRes = await axios.get(`${API_URL.replace('/api', '/api/v1')}/cms/app-config`);

                // Fetch Site Config (Logo, Marquee, Live URLs)
                // Using /v1/content/site-config which maps to /:identifier in cmsRoutes
                const siteConfigRes = await axios.get(`${API_URL.replace('/api', '/api/v1')}/content/site-config`);

                let mergedConfig = {};

                if (appConfigRes.data) {
                    mergedConfig = { ...mergedConfig, ...appConfigRes.data };
                }

                if (siteConfigRes.data && siteConfigRes.data.content) {
                    mergedConfig = { ...mergedConfig, ...siteConfigRes.data.content };
                }

                if (Object.keys(mergedConfig).length > 0) {
                    setConfig(mergedConfig as AppConfig);
                } else {
                    // Fallback defaults if API fails or returns empty
                    setConfig({
                        iosLink: "https://apps.apple.com/app/bookmyseva",
                        androidLink: "https://play.google.com/store/apps/details?id=com.bookmyseva",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch app config:", error);
                // Fallback on error
                setConfig({
                    iosLink: "https://apps.apple.com/app/bookmyseva",
                    androidLink: "https://play.google.com/store/apps/details?id=com.bookmyseva",
                });
            }
        };

        fetchConfig();
    }, []);

    return config;
};
