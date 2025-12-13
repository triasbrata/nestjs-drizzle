"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectClient = void 0;
const common_1 = require("@nestjs/common");
const get_client_token_1 = require("../utils/get-client-token");
const InjectClient = (name) => (0, common_1.Inject)((0, get_client_token_1.getClientToken)(name));
exports.InjectClient = InjectClient;
//# sourceMappingURL=inject-client.decorator.js.map