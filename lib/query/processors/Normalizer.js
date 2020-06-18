import { normalize } from 'normalizr';
import Utils from '../../support/Utils';
var Normalizer = /** @class */ (function () {
    function Normalizer() {
    }
    /**
     * Normalize the record.
     */
    Normalizer.process = function (query, record) {
        if (Utils.isEmpty(record)) {
            return {};
        }
        var entity = query.database.schemas[query.model.entity];
        var schema = Utils.isArray(record) ? [entity] : entity;
        return normalize(record, schema).entities;
    };
    return Normalizer;
}());
export default Normalizer;
//# sourceMappingURL=Normalizer.js.map