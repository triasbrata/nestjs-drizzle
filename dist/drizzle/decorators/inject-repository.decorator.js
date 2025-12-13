"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRepository = void 0;
const common_1 = require("@nestjs/common");
const get_entity_token_1 = require("../utils/get-entity-token");
const drizzle_constants_1 = require("../drizzle.constants");
const InjectRepository = (entity, connection = drizzle_constants_1.DEFAULT_CLIENT_TOKEN) => (0, common_1.Inject)((0, get_entity_token_1.getEntityToken)(entity, connection));
exports.InjectRepository = InjectRepository;
//# sourceMappingURL=inject-repository.decorator.js.map