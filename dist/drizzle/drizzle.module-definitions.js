"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPTIONS_TYPE = exports.ASYNC_OPTIONS_TYPE = exports.DRIZZLE_OPTIONS_TOKEN = exports.ConfigurableDrizzleModule = void 0;
const common_1 = require("@nestjs/common");
_a = new common_1.ConfigurableModuleBuilder()
    .setClassMethodName('forRoot')
    .setExtras({
    isGlobal: true,
    name: 'default',
}, (definition, extras) => ({
    global: extras.isGlobal,
    name: extras.name,
    ...definition,
}))
    .build(), exports.ConfigurableDrizzleModule = _a.ConfigurableModuleClass, exports.DRIZZLE_OPTIONS_TOKEN = _a.MODULE_OPTIONS_TOKEN, exports.ASYNC_OPTIONS_TYPE = _a.ASYNC_OPTIONS_TYPE, exports.OPTIONS_TYPE = _a.OPTIONS_TYPE;
//# sourceMappingURL=drizzle.module-definitions.js.map