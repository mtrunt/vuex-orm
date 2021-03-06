import Utils from '../../support/Utils';
import Relation from '../../attributes/relations/Relation';
var Attacher = /** @class */ (function () {
    function Attacher() {
    }
    /**
     * Attach missing relational key to the records.
     */
    Attacher.process = function (query, data) {
        Utils.forOwn(data, function (entity, name) {
            var fields = query.getModel(name).fields();
            Utils.forOwn(entity, function (record) {
                Utils.forOwn(record, function (value, key) {
                    var field = fields[key];
                    if (field instanceof Relation) {
                        value !== null && field.attach(value, record, data);
                    }
                });
            });
        });
        return data;
    };
    return Attacher;
}());
export default Attacher;
//# sourceMappingURL=Attacher.js.map