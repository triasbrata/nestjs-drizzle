"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntityToken = exports.getEntityName = void 0;
const getEntityName = (entity) => {
    return entity[Symbol.for('drizzle:Name')];
};
exports.getEntityName = getEntityName;
const getEntityToken = (entity, connection) => {
    return `drizzle_entity:${connection}:${(0, exports.getEntityName)(entity)}`;
};
exports.getEntityToken = getEntityToken;
//# sourceMappingURL=get-entity-token.js.map