import { __extends } from "tslib";
import { isArray } from '../../support/Utils';
import Attribute from '../Attribute';
var Relation = /** @class */ (function (_super) {
    __extends(Relation, _super);
    function Relation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get relation query instance with constraint attached.
     */
    Relation.prototype.getRelation = function (query, name, constraints) {
        var relation = query.newQuery(name);
        constraints.forEach(function (constraint) { constraint(relation); });
        return relation;
    };
    /**
     * Get specified keys from the given collection.
     */
    Relation.prototype.getKeys = function (collection, key) {
        return collection.reduce(function (models, model) {
            if (model[key] === null || model[key] === undefined) {
                return models;
            }
            models.push(model[key]);
            return models;
        }, []);
    };
    /**
     * Create a new indexed map for the single relation by specified key.
     */
    Relation.prototype.mapSingleRelations = function (collection, key) {
        var relations = new Map();
        collection.forEach(function (record) {
            var id = record[key];
            !relations.get(id) && relations.set(id, record);
        });
        return relations;
    };
    /**
     * Create a new indexed map for the many relation by specified key.
     */
    Relation.prototype.mapManyRelations = function (collection, key) {
        var relations = new Map();
        collection.forEach(function (record) {
            var id = record[key];
            var ownerKeys = relations.get(id);
            if (!ownerKeys) {
                ownerKeys = [];
                relations.set(id, ownerKeys);
            }
            ownerKeys.push(record);
        });
        return relations;
    };
    /**
     * Create a new indexed map for relations with order constraints.
     */
    Relation.prototype.mapRelationsByOrders = function (collection, relations, ownerKey, relationKey) {
        var records = {};
        relations.forEach(function (related, id) {
            collection.filter(function (record) { return record[relationKey] === id; }).forEach(function (record) {
                var id = record[ownerKey];
                if (!records[id]) {
                    records[id] = [];
                }
                records[id] = records[id].concat(related);
            });
        });
        return records;
    };
    /**
     * Check if the given record is a single relation, which is an object.
     */
    Relation.prototype.isOneRelation = function (record) {
        if (!isArray(record) && record !== null && typeof record === 'object') {
            return true;
        }
        return false;
    };
    /**
     * Check if the given records is a many relation, which is an array
     * of object.
     */
    Relation.prototype.isManyRelation = function (records) {
        if (!isArray(records)) {
            return false;
        }
        if (records.length < 1) {
            return false;
        }
        return true;
    };
    /**
     * Wrap the given object into a model instance.
     */
    Relation.prototype.makeOneRelation = function (record, model) {
        if (!this.isOneRelation(record)) {
            return null;
        }
        var relatedModel = model.getModelFromRecord(record) || model;
        return new relatedModel(record);
    };
    /**
     * Wrap the given records into a collection of model instances.
     */
    Relation.prototype.makeManyRelation = function (records, model) {
        var _this = this;
        if (!this.isManyRelation(records)) {
            return [];
        }
        return records.filter(function (record) {
            return _this.isOneRelation(record);
        }).map(function (record) {
            var relatedModel = model.getModelFromRecord(record) || model;
            return new relatedModel(record);
        });
    };
    return Relation;
}(Attribute));
export default Relation;
//# sourceMappingURL=Relation.js.map