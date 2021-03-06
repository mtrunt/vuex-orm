import { __assign } from "tslib";
/**
 * Check if the given value is the type of array.
 */
export function isArray(value) {
    return Array.isArray(value);
}
/**
 * Gets the size of collection by returning its length for array-like values
 * or the number of own enumerable string keyed properties for objects.
 */
export function size(collection) {
    return isArray(collection) ? collection.length : Object.keys(collection).length;
}
/**
 * Check if the given array or object is empty.
 */
export function isEmpty(collection) {
    return size(collection) === 0;
}
/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property.
 */
export function forOwn(object, iteratee) {
    Object.keys(object).forEach(function (key) { return iteratee(object[key], key, object); });
}
/**
 * Creates an array of values by running each element in collection thru
 * iteratee. The iteratee is invoked with three arguments:
 * (value, key, collection).
 */
export function map(object, iteratee) {
    var result = [];
    for (var key in object) {
        result.push(iteratee(object[key], key, object));
    }
    return result;
}
/**
 * Creates an object with the same keys as object and values generated by
 * running each own enumerable string keyed property of object thru
 * iteratee. The iteratee is invoked with three arguments:
 * (value, key, object).
 */
export function mapValues(object, iteratee) {
    var newObject = Object.assign({}, object);
    return Object.keys(object).reduce(function (records, key) {
        records[key] = iteratee(object[key], key, object);
        return records;
    }, newObject);
}
/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection by the given key.
 */
export function keyBy(collection, key) {
    var o = {};
    collection.forEach(function (item) {
        o[item[key]] = item;
    });
    return o;
}
/**
 * Creates an array of elements, sorted in specified order by the results
 * of running each element in a collection thru each iteratee.
 */
export function orderBy(collection, iteratees, directions) {
    var index = -1;
    var result = collection.map(function (value) {
        var criteria = iteratees.map(function (iteratee) {
            return typeof iteratee === 'function' ? iteratee(value) : value[iteratee];
        });
        return { criteria: criteria, index: ++index, value: value };
    });
    return baseSortBy(result, function (object, other) {
        return compareMultiple(object, other, directions);
    });
}
/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order
 * of equal elements.
 */
function baseSortBy(array, comparer) {
    var length = array.length;
    array.sort(comparer);
    var newArray = [];
    while (length--) {
        newArray[length] = array[length].value;
    }
    return newArray;
}
/**
 * Used by `orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order.
 * Otherwise, specify an order of "desc" for descending or "asc" for
 * ascending sort order of corresponding values.
 */
function compareMultiple(object, other, orders) {
    var index = -1;
    var objCriteria = object.criteria;
    var othCriteria = other.criteria;
    var length = objCriteria.length;
    var ordersLength = orders.length;
    while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
            if (index >= ordersLength) {
                return result;
            }
            var order = orders[index];
            return result * (order === 'desc' ? -1 : 1);
        }
    }
    return object.index - other.index;
}
/**
 * Compares values to sort them in ascending order.
 */
function compareAscending(value, other) {
    if (value !== other) {
        var valIsDefined = value !== undefined;
        var valIsNull = value === null;
        var valIsReflexive = value === value;
        var othIsDefined = other !== undefined;
        var othIsNull = other === null;
        var othIsReflexive = other === other;
        if (typeof value !== 'number' || typeof other !== 'number') {
            value = String(value);
            other = String(other);
        }
        if ((!othIsNull && value > other) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
            return 1;
        }
        if ((!valIsNull && value < other) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
            return -1;
        }
    }
    return 0;
}
/**
 * Creates an object composed of keys generated from the results of running
 * each element of collection thru iteratee.
 */
export function groupBy(collection, iteratee) {
    return collection.reduce(function (records, record) {
        var key = iteratee(record);
        if (records[key] === undefined) {
            records[key] = [];
        }
        records[key].push(record);
        return records;
    }, {});
}
/**
 * Deep clone the given target object.
 */
export function cloneDeep(target) {
    if (target === null) {
        return target;
    }
    if (isArray(target)) {
        var cp_1 = [];
        target.forEach(function (v) { return cp_1.push(v); });
        return cp_1.map(function (n) { return cloneDeep(n); });
    }
    if (typeof target === 'object' && target !== {}) {
        var cp_2 = __assign({}, target);
        Object.keys(cp_2).forEach(function (k) { return (cp_2[k] = cloneDeep(cp_2[k])); });
        return cp_2;
    }
    return target;
}
export default {
    isArray: isArray,
    size: size,
    isEmpty: isEmpty,
    forOwn: forOwn,
    map: map,
    mapValues: mapValues,
    keyBy: keyBy,
    orderBy: orderBy,
    groupBy: groupBy,
    cloneDeep: cloneDeep
};
//# sourceMappingURL=Utils.js.map