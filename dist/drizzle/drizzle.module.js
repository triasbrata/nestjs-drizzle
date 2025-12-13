"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DrizzleModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrizzleModule = void 0;
const common_1 = require("@nestjs/common");
const drizzle_module_definitions_1 = require("./drizzle.module-definitions");
const create_providers_1 = require("./utils/create-providers");
const get_client_token_1 = require("./utils/get-client-token");
const create_entity_providers_1 = require("./utils/create-entity-providers");
const drizzle_constants_1 = require("./drizzle.constants");
let DrizzleModule = DrizzleModule_1 = class DrizzleModule extends drizzle_module_definitions_1.ConfigurableDrizzleModule {
    static forRoot(options) {
        const root = super.forRoot(options);
        const providers = (0, create_providers_1.createProviders)(options.name);
        return {
            ...root,
            providers: [...root.providers, ...providers],
            exports: [...(root.exports ?? []), (0, get_client_token_1.getClientToken)(options.name)],
        };
    }
    static forRootAsync(options) {
        const root = super.forRootAsync(options);
        const providers = (0, create_providers_1.createProviders)(options.name);
        return {
            ...root,
            providers: [...root.providers, ...providers],
            exports: [...(root.exports ?? []), (0, get_client_token_1.getClientToken)(options.name)],
        };
    }
    static forFeature({ entities, name }) {
        const entityProviders = (0, create_entity_providers_1.createEntityProviders)(entities, name || drizzle_constants_1.DEFAULT_CLIENT_TOKEN);
        return {
            module: DrizzleModule_1,
            providers: entityProviders.map(({ provider }) => provider),
            exports: entityProviders.map(({ provide }) => provide),
        };
    }
};
exports.DrizzleModule = DrizzleModule;
exports.DrizzleModule = DrizzleModule = DrizzleModule_1 = __decorate([
    (0, common_1.Module)({})
], DrizzleModule);
//# sourceMappingURL=drizzle.module.js.map