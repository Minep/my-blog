import SiteStatisticsService from "@/services/stats.service";
export default class SiteStatisticsController {
    private siteStatistics;
    constructor(siteStatistics: SiteStatisticsService);
    getStats(): Promise<import("../dtos").SiteStatistics>;
}
