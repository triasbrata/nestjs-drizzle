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
exports.DrizzleRepository = void 0;
const common_1 = require("@nestjs/common");
let DrizzleRepository = class DrizzleRepository {
    constructor(_client, entity) {
        this._client = _client;
        this.entity = entity;
    }
    get client() {
        return this._client;
    }
    select(select) {
        const query = this._client.select(select).from(this.entity);
        return query;
    }
    selectWhere(where, select) {
        const query = this._client.select(select).from(this.entity).where(where);
        return query;
    }
    insert(values) {
        return this._client.insert(this.entity).values(values);
    }
    update(values) {
        return this._client.update(this.entity).set(values);
    }
    updateWhere(where, values) {
        return this._client.update(this.entity).set(values).where(where);
    }
    delete() {
        return this._client.delete(this.entity);
    }
    deleteWhere(where) {
        return this._client.delete(this.entity).where(where);
    }
};
exports.DrizzleRepository = DrizzleRepository;
exports.DrizzleRepository = DrizzleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object])
], DrizzleRepository);
//# sourceMappingURL=drizzle.repository.js.map