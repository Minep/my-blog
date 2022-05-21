import { useTitle } from "@vueuse/core";
import { appConfig } from "virtual:app-configer";

export default function usePageTitle(pageTitle: string) {
    return useTitle(pageTitle, {
        titleTemplate: `%s | ${appConfig.siteName}`
    })
}