"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedPicture = exports.UserSession = exports.SiteStatistics = exports.Category = exports.CategoryLevel = exports.CategoryMetadata = exports.Article = exports.ArticleMetadata = exports.ArticleSummary = exports.ArticlePageResult = exports.UserIdentity = void 0;
__exportStar(require("./inbound.dto"), exports);
function Dto() {
    return (constructor) => { constructor; };
}
class UserIdentity {
}
exports.UserIdentity = UserIdentity;
class ArticlePageResult {
}
exports.ArticlePageResult = ArticlePageResult;
let ArticleSummary = class ArticleSummary {
    static createFrom(entity) {
        return {
            id: entity.id.toString(),
            title: entity.title,
            category: entity.category.name,
            date: entity.date,
            visible: entity.visible,
            pinned: entity.pinned
        };
    }
};
ArticleSummary = __decorate([
    Dto()
], ArticleSummary);
exports.ArticleSummary = ArticleSummary;
let ArticleMetadata = class ArticleMetadata {
    static createFrom(entity) {
        return {
            id: entity.id.toString(),
            title: entity.title,
            desc: entity.desc,
            pinned: entity.pinned,
            category: CategoryMetadata.createFrom(entity.category),
            time: entity.date
        };
    }
};
ArticleMetadata = __decorate([
    Dto()
], ArticleMetadata);
exports.ArticleMetadata = ArticleMetadata;
let Article = class Article extends ArticleMetadata {
    static createFrom(entity) {
        return Object.assign(Object.assign({}, ArticleMetadata.createFrom(entity)), { content: entity.content.text });
    }
};
Article = __decorate([
    Dto()
], Article);
exports.Article = Article;
let CategoryMetadata = class CategoryMetadata {
    static createFrom(category) {
        return {
            id: category.id.toString(),
            name: category.name
        };
    }
};
CategoryMetadata = __decorate([
    Dto()
], CategoryMetadata);
exports.CategoryMetadata = CategoryMetadata;
let CategoryLevel = class CategoryLevel {
    static createFrom(category) {
        var _a, _b;
        return {
            parent: (!category.parent
                ? undefined
                : CategoryMetadata.createFrom(category.parent)),
            current: CategoryMetadata.createFrom(category),
            children: (_b = (_a = category.children) === null || _a === void 0 ? void 0 : _a.map(child => CategoryMetadata.createFrom(child))) !== null && _b !== void 0 ? _b : []
        };
    }
};
CategoryLevel = __decorate([
    Dto()
], CategoryLevel);
exports.CategoryLevel = CategoryLevel;
let Category = class Category extends CategoryMetadata {
    static createFrom(category) {
        var _a, _b;
        return Object.assign(Object.assign({}, CategoryMetadata.createFrom(category)), { children: (_b = (_a = category.children) === null || _a === void 0 ? void 0 : _a.map(child => CategoryMetadata.createFrom(child))) !== null && _b !== void 0 ? _b : [] });
    }
};
Category = __decorate([
    Dto()
], Category);
exports.Category = Category;
class SiteStatistics {
}
exports.SiteStatistics = SiteStatistics;
class UserSession {
}
exports.UserSession = UserSession;
class HostedPicture {
}
exports.HostedPicture = HostedPicture;
//# sourceMappingURL=index.js.map