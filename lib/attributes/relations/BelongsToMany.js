import { __assign, __extends } from "tslib";
import Utils from '../../support/Utils';
import Relation from './Relation';
var BelongsToMany = /** @class */ (function (_super) {
    __extends(BelongsToMany, _super);
    /**
     * Create a new belongs to instance.
     */
    function BelongsToMany(model, related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey) {
        var _this = _super.call(this, model) /* istanbul ignore next */ || this;
        /**
         * The key name of the pivot data.
         */
        _this.pivotKey = 'pivot';
        _this.related = _this.model.relation(related);
        _this.pivot = _this.model.relation(pivot);
        _this.foreignPivotKey = foreignPivotKey;
        _this.relatedPivotKey = relatedPivotKey;
        _this.parentKey = parentKey;
        _this.relatedKey = relatedKey;
        return _this;
    }
    /**
     * Specify the custom pivot accessor to use for the relationship.
     */
    BelongsToMany.prototype.as = function (accessor) {
        this.pivotKey = accessor;
        return this;
    };
    /**
     * Define the normalizr schema for the relationship.
     */
    BelongsToMany.prototype.define = function (schema) {
        return schema.many(this.related);
    };
    /**
     * Attach the relational key to the given data. Since belongs to many
     * relationship doesn't have any foreign key, it would do nothing.
     */
    BelongsToMany.prototype.attach = function (_key, _record, _data) {
        return;
    };
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    BelongsToMany.prototype.make = function (value, _parent, _key) {
        return this.makeManyRelation(value, this.related);
    };
    /**
     * Load the belongs to relationship for the record.
     */
    BelongsToMany.prototype.load = function (query, collection, name, constraints) {
        var _this = this;
        var relatedQuery = this.getRelation(query, this.related.entity, constraints);
        var pivotQuery = query.newQuery(this.pivot.entity);
        this.addEagerConstraintForPivot(pivotQuery, collection);
        var pivots = pivotQuery.get();
        this.addEagerConstraintForRelated(relatedQuery, pivots);
        var relateds = this.mapPivotRelations(pivots, relatedQuery);
        collection.forEach(function (item) {
            var related = relateds[item[_this.parentKey]];
            item[name] = related || [];
        });
    };
    /**
     * Set the constraints for the pivot relation.
     */
    BelongsToMany.prototype.addEagerConstraintForPivot = function (query, collection) {
        query.whereFk(this.foreignPivotKey, this.getKeys(collection, this.parentKey));
    };
    /**
     * Set the constraints for the related relation.
     */
    BelongsToMany.prototype.addEagerConstraintForRelated = function (query, collection) {
        query.whereFk(this.relatedKey, this.getKeys(collection, this.relatedPivotKey));
    };
    /**
     * Create a new indexed map for the pivot relation.
     */
    BelongsToMany.prototype.mapPivotRelations = function (pivots, relatedQuery) {
        var _this = this;
        var relations = this.mapManyRelations(relatedQuery.get(), this.relatedKey);
        if (relatedQuery.orders.length) {
            return this.mapRelationsByOrders(pivots, relations, this.foreignPivotKey, this.relatedPivotKey);
        }
        return pivots.reduce(function (records, record) {
            var id = record[_this.foreignPivotKey];
            if (!records[id]) {
                records[id] = [];
            }
            var related = relations.get(record[_this.relatedPivotKey]);
            if (related) {
                records[id] = records[id].concat(related.map(function (model) {
                    model[_this.pivotKey] = record;
                    return model;
                }));
            }
            return records;
        }, {});
    };
    /**
     * Create pivot records for the given records if needed.
     */
    BelongsToMany.prototype.createPivots = function (parent, data, key) {
        var _this = this;
        if (!Utils.isArray(this.pivot.primaryKey))
            return data;
        Utils.forOwn(data[parent.entity], function (record) {
            var related = record[key];
            if (related === undefined || related.length === 0) {
                return;
            }
            _this.createPivotRecord(data, record, related);
        });
        return data;
    };
    /**
     * Create a pivot record.
     */
    BelongsToMany.prototype.createPivotRecord = function (data, record, related) {
        var _this = this;
        related.forEach(function (id) {
            var _a, _b;
            var parentId = record[_this.parentKey];
            var relatedId = data[_this.related.entity][id][_this.relatedKey];
            var pivotKey = JSON.stringify([
                _this.pivot.primaryKey[0] === _this.foreignPivotKey ? parentId : relatedId,
                _this.pivot.primaryKey[1] === _this.foreignPivotKey ? parentId : relatedId
            ]);
            var pivotRecord = data[_this.pivot.entity] ? data[_this.pivot.entity][pivotKey] : {};
            var pivotData = data[_this.related.entity][id][_this.pivotKey] || {};
            data[_this.pivot.entity] = __assign(__assign({}, data[_this.pivot.entity]), (_a = {}, _a[pivotKey] = __assign(__assign(__assign({}, pivotRecord), pivotData), (_b = { $id: pivotKey }, _b[_this.foreignPivotKey] = parentId, _b[_this.relatedPivotKey] = relatedId, _b)), _a));
        });
    };
    return BelongsToMany;
}(Relation));
export default BelongsToMany;
//# sourceMappingURL=BelongsToMany.js.map