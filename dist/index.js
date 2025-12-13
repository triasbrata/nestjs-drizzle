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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrizzleRepository = exports.DrizzleModule = exports.InjectRepository = exports.InjectClient = void 0;
var inject_client_decorator_1 = require("./drizzle/decorators/inject-client.decorator");
Object.defineProperty(exports, "InjectClient", { enumerable: true, get: function () { return inject_client_decorator_1.InjectClient; } });
var inject_repository_decorator_1 = require("./drizzle/decorators/inject-repository.decorator");
Object.defineProperty(exports, "InjectRepository", { enumerable: true, get: function () { return inject_repository_decorator_1.InjectRepository; } });
var drizzle_module_1 = require("./drizzle/drizzle.module");
Object.defineProperty(exports, "DrizzleModule", { enumerable: true, get: function () { return drizzle_module_1.DrizzleModule; } });
var drizzle_repository_1 = require("./drizzle/drizzle.repository");
Object.defineProperty(exports, "DrizzleRepository", { enumerable: true, get: function () { return drizzle_repository_1.DrizzleRepository; } });
__exportStar(require("./drizzle/interfaces"), exports);
//# sourceMappingURL=index.js.map