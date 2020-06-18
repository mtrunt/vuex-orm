import './polyfills';
import { Install } from './store/install';
import { Use } from './plugins/use';
import Container from './container/Container';
import Database from './database/Database';
import Model from './model/Model';
import Fields from './model/contracts/Fields';
import Query from './query/Query';
import Attribute from './attributes/Attribute';
import Type from './attributes/types/Type';
import Attr from './attributes/types/Attr';
import String from './attributes/types/String';
import Number from './attributes/types/Number';
import Boolean from './attributes/types/Boolean';
import Uid from './attributes/types/Uid';
import Relation from './attributes/relations/Relation';
import HasOne from './attributes/relations/HasOne';
import BelongsTo from './attributes/relations/BelongsTo';
import HasMany from './attributes/relations/HasMany';
import HasManyBy from './attributes/relations/HasManyBy';
import BelongsToMany from './attributes/relations/BelongsToMany';
import HasManyThrough from './attributes/relations/HasManyThrough';
import MorphTo from './attributes/relations/MorphTo';
import MorphOne from './attributes/relations/MorphOne';
import MorphMany from './attributes/relations/MorphMany';
import MorphToMany from './attributes/relations/MorphToMany';
import MorphedByMany from './attributes/relations/MorphedByMany';
import GettersContract from './modules/contracts/Getters';
import ActionsContract from './modules/contracts/Actions';
import RootGettersContract from './modules/contracts/RootGetters';
import RootActionsContract from './modules/contracts/RootActions';
import RootMutationsContract from './modules/contracts/RootMutations';
export interface VuexORM {
    install: Install;
    use: Use;
    Container: typeof Container;
    Database: typeof Database;
    Model: typeof Model;
    Fields: Fields;
    Query: typeof Query;
    Attribute: typeof Attribute;
    Type: typeof Type;
    Attr: typeof Attr;
    String: typeof String;
    Number: typeof Number;
    Boolean: typeof Boolean;
    Uid: typeof Uid;
    Relation: typeof Relation;
    HasOne: typeof HasOne;
    BelongsTo: typeof BelongsTo;
    HasMany: typeof HasMany;
    HasManyBy: typeof HasManyBy;
    BelongsToMany: typeof BelongsToMany;
    HasManyThrough: typeof HasManyThrough;
    MorphTo: typeof MorphTo;
    MorphOne: typeof MorphOne;
    MorphMany: typeof MorphMany;
    MorphToMany: typeof MorphToMany;
    MorphedByMany: typeof MorphedByMany;
    Getters: GettersContract;
    Actions: ActionsContract;
    RootGetters: RootGettersContract;
    RootActions: RootActionsContract;
    RootMutations: RootMutationsContract;
}
declare const _default: VuexORM;
export default _default;