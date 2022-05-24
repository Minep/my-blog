"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_decorator_1 = require("../common/decorator/auth.decorator");
const stats_service_1 = require("../services/stats.service");
const common_1 = require("@nestjs/common");
let SiteStatisticsController = class SiteStatisticsController {
    constructor(siteStatistics) {
        this.siteStatistics = siteStatistics;
    }
    async getStats() {
        return this.siteStatistics.getAggregated();
    }
};
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)("admin/stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteStatisticsController.prototype, "getStats", null);
SiteStatisticsController = __decorate([
    (0, common_1.Controller)({
        version: "1"
    }),
    __metadata("design:paramtypes", [stats_service_1.default])
], SiteStatisticsController);
exports.default = SiteStatisticsController;
//# sourceMappingURL=stats.controller.js.map