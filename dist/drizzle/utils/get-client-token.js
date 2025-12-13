"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientToken = void 0;
const drizzle_constants_1 = require("../drizzle.constants");
const getClientToken = (name = drizzle_constants_1.DEFAULT_CLIENT_TOKEN) => {
    return `drizzle_client:${name}`;
};
exports.getClientToken = getClientToken;
//# sourceMappingURL=get-client-token.js.map