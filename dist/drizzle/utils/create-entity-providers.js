"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntityProviders = void 0;
const drizzle_repository_1 = require("../drizzle.repository");
const get_client_token_1 = require("./get-client-token");
const get_entity_token_1 = require("./get-entity-token");
const createEntityProviders = (entities, name) => entities.map((entity) => {
    const provide = (0, get_entity_token_1.getEntityToken)(entity, name);
    return {
        provide,
        provider: {
            provide,
            useFactory: (drizzleClient) => {
                return new drizzle_repository_1.DrizzleRepository(drizzleClient, entity);
            },
            inject: [(0, get_client_token_1.getClientToken)(name)],
        },
    };
});
exports.createEntityProviders = createEntityProviders;
//# sourceMappingURL=create-entity-providers.js.map