import { isArray } from '../support/Utils';
import Uid from '../support/Uid';
import UidAttribute from '../attributes/types/Uid';
var IdAttribute = /** @class */ (function () {
    function IdAttribute() {
    }
    /**
     * Creates a closure that generates the required id's for an entity.
     */
    IdAttribute.create = function (model) {
        var _this = this;
        return function (value, _parentValue, _key) {
            _this.generateIds(value, model);
            var indexId = _this.generateIndexId(value, model);
            return indexId;
        };
    };
    /**
     * Generate a field that is defined as primary keys. For keys with a proper
     * value set, it will do nothing. If a key is missing, it will generate
     * UID for it.
     */
    IdAttribute.generateIds = function (record, model) {
        var keys = isArray(model.primaryKey) ? model.primaryKey : [model.primaryKey];
        keys.forEach(function (k) {
            if (record[k] !== undefined && record[k] !== null) {
                return;
            }
            var attr = model.getFields()[k];
            record[k] = attr instanceof UidAttribute ? attr.make() : Uid.make();
        });
    };
    /**
     * Generate index id field (which is `$id`) and attach to the given record.
     */
    IdAttribute.generateIndexId = function (record, model) {
        record.$id = model.getIndexIdFromRecord(record);
        return record.$id;
    };
    return IdAttribute;
}());
export default IdAttribute;
//# sourceMappingURL=IdAttribute.js.map