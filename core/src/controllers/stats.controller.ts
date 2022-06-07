import { Public } from "@/common/decorator/auth.decorator";
import SiteStatisticsService from "@/services/stats.service";
import { Controller, Get } from "@nestjs/common";

@Controller({
    version: "1"
})
export default class SiteStatisticsController {
    constructor (
        private siteStatistics: SiteStatisticsService
    ) { }

    @Get("admin/stats")
    public async getStats() {
        return this.siteStatistics.getAggregated()
    }
}