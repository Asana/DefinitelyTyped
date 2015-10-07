/// <reference path="lodash.d.ts" />

declare var $: any, jQuery: any;

interface IFoodOrganic {
    name: string;
    organic: boolean;
}

interface IFoodType {
    name: string;
    type: string;
}

interface IFoodCombined {
    name: string;
    organic: boolean;
    type: string;
}

interface IStoogesQuote {
    name: string;
    quotes: string[];
}

interface IStoogesAge {
    name: string;
    age: number;
}

interface IStoogesCombined {
    name: string;
    age: number;
    quotes: string[];
}

interface IKey {
    dir: string;
    code: number;
}

interface IDictionary<T> {
    [index: string]: T;
}

var foodsOrganic: IFoodOrganic[] = [
    { name: 'banana', organic: true },
    { name: 'beet', organic: false },
];
var foodsType: IFoodType[] = [
    { name: 'apple', type: 'fruit' },
    { name: 'banana', type: 'fruit' },
    { name: 'beet', type: 'vegetable' }
];
var foodsCombined: IFoodCombined[] = [
    { 'name': 'apple', 'organic': false, 'type': 'fruit' },
    { 'name': 'carrot', 'organic': true, 'type': 'vegetable' }
];

var stoogesQuotes: IStoogesQuote[] = [
    { 'name': 'curly', 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] },
    { 'name': 'moe', 'quotes': ['Spread out!', 'You knucklehead!'] }
];
var stoogesAges: IStoogesAge[] = [
    { 'name': 'moe', 'age': 40 },
    { 'name': 'larry', 'age': 50 }
];
var stoogesAgesDict: IDictionary<IStoogesAge> = {
    first: { 'name': 'moe', 'age': 40 },
    second: { 'name': 'larry', 'age': 50 }
};
var stoogesCombined: IStoogesCombined[] = [
    { 'name': 'curly', 'age': 30, 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] },
    { 'name': 'moe', 'age': 40, 'quotes': ['Spread out!', 'You knucklehead!'] }
];

var keys: IKey[] = [
    { 'dir': 'left', 'code': 97 },
    { 'dir': 'right', 'code': 100 }
];

class Dog {
    constructor(public name: string) { }

    public bark() {
        console.log('Woof, woof!');
    }
}

var result: any;

/*************
 * Chaining *
 *************/
result = <_.LoDashWrapper<string>>_('test');
result = <_.LoDashWrapper<number>>_(1);
result = <_.LoDashWrapper<boolean>>_(true);
result = <_.LoDashArrayWrapper<string>>_(['test1', 'test2']);
// Appears to be a change in the compiler, if the type explicity implements the object indexer.
// Looking at: https://typescript.codeplex.com/wikipage?title=Known%20breaking%20changes%20between%200.8%20and%200.9&referringTitle=Documentation
// "The ‘noimplicitany’ option now warns on the use of the hidden default indexer"
result = <_.LoDashObjectWrapper<_.Dictionary<string>>>_(<{ [index: string]: string; }>{ 'key1': 'test1', 'key2': 'test2' });

result = <_.LoDashWrapper<string>>_.chain('test');
result = <_.LoDashWrapper<string>>_('test').chain();
result = <_.LoDashWrapper<number>>_.chain(1);
result = <_.LoDashWrapper<number>>_(1).chain();
result = <_.LoDashWrapper<boolean>>_.chain(true);
result = <_.LoDashWrapper<boolean>>_(true).chain();
result = <_.LoDashArrayWrapper<string>>_.chain(['test1', 'test2']);
result = <_.LoDashArrayWrapper<string>>_(['test1', 'test2']).chain();
result = <_.LoDashObjectWrapper<_.Dictionary<string>>>_.chain(<{ [index: string]: string; }>{ 'key1': 'test1', 'key2': 'test2' });
result = <_.LoDashObjectWrapper<_.Dictionary<string>>>_(<{ [index: string]: string; }>{ 'key1': 'test1', 'key2': 'test2' }).chain();

//Wrapped array shortcut methods
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).concat(5, 6);
result = <_.LoDashWrapper<string>>_([1, 2, 3, 4]).join(',');
result = <_.LoDashWrapper<number>>_([1, 2, 3, 4]).pop();
_([1, 2, 3, 4]).push(5, 6, 7);
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).reverse();
result = <_.LoDashWrapper<number>>_([1, 2, 3, 4]).shift();
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).slice(1, 2);
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).slice(2);
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).sort((a, b) => 1);
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).splice(1);
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).splice(1, 2, 5, 6);
result = <_.LoDashWrapper<number>>_([1, 2, 3, 4]).unshift(5, 6);

result = <number[]>_.tap([1, 2, 3, 4], function (array) { console.log(array); });
result = <_.LoDashWrapper<string>>_('test').tap(function (value) { console.log(value); });
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).tap(function (array) { console.log(array); });
result = <_.LoDashObjectWrapper<_.Dictionary<string>>>_(<{ [index: string]: string; }>{ 'key1': 'test1', 'key2': 'test2' }).tap(function (array) { console.log(array); });

result = <string>_('test').toString();
result = <string>_([1, 2, 3]).toString();
result = <string>_({ 'key1': 'test1', 'key2': 'test2' }).toString();

// _.value (aliases: _.run, _.toJSON, _.valueOf)
result = <string>_('test').value();
result = <number[]>_([1, 2, 3]).run();
result = <_.Dictionary<string>>_(<{ [index: string]: string; }>{ 'key1': 'test1', 'key2': 'test2' }).toJSON();
result = <_.Dictionary<number>>_({ a: 1, b: 2}).mapValues(function(num: number) { return num * 2; }).valueOf();

// /*************
//  * Arrays *
//  *************/
result = <any[][]>_.chunk([1, '2', '3', false]);
result = <_.LoDashArrayWrapper<any[]>>_([1, '2', '3', false]).chunk();
result = <any[][]>_.chunk([1, '2', '3', false], 2);
result = <_.LoDashArrayWrapper<any[]>>_([1, '2', '3', false]).chunk(2);
result = <number[][]>_.chunk([1, 2, 3, 4]);
result = <_.LoDashArrayWrapper<number[]>>_([1, 2, 3, 4]).chunk();
result = <number[][]>_.chunk([1, 2, 3, 4], 2);
result = <_.LoDashArrayWrapper<number[]>>_([1, 2, 3, 4]).chunk(2);

// _.compact
module TestCompact {
    let array: TResult[];
    let list: _.List<TResult>;
    let result: TResult[];

    result = _.compact<TResult>();
    result = _.compact<TResult>(array);
    result = _.compact<TResult>(list);
    result = _<TResult>(array).compact().value();
    result = _(list).compact<TResult>().value();
}

result = <number[]>_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4, 5]).difference([5, 2, 10]);

// _.dropWhile
module TestDropWhile {
    let array: TResult[];
    let list: _.List<TResult>;
    let predicateFn: (value: TResult, index: number, collection: _.List<TResult>) => boolean;
    let result: TResult[];

    result = _.dropWhile<TResult>(array);
    result = _.dropWhile<TResult>(array, predicateFn);
    result = _.dropWhile<TResult>(array, predicateFn, any);
    result = _.dropWhile<TResult>(array, '')
    result = _.dropWhile<TResult>(array, '', any);
    result = _.dropWhile<{a: number;}, TResult>(array, {a: 42});

    result = _.dropWhile<TResult>(list);
    result = _.dropWhile<TResult>(list, predicateFn);
    result = _.dropWhile<TResult>(list, predicateFn, any);
    result = _.dropWhile<TResult>(list, '')
    result = _.dropWhile<TResult>(list, '', any);
    result = _.dropWhile<{a: number;}, TResult>(list, {a: 42});

    result = _(array).dropWhile().value();
    result = _(array).dropWhile(predicateFn).value();
    result = _(array).dropWhile(predicateFn, any).value();
    result = _(array).dropWhile('').value();
    result = _(array).dropWhile('', any).value();
    result = _(array).dropWhile<{a: number;}>({a: 42}).value();

    result = _(list).dropWhile<TResult>().value();
    result = _(list).dropWhile<TResult>(predicateFn).value();
    result = _(list).dropWhile<TResult>(predicateFn, any).value();
    result = _(list).dropWhile<TResult>('').value();
    result = _(list).dropWhile<TResult>('', any).value();
    result = _(list).dropWhile<{a: number;}, TResult>({a: 42}).value();
}

result = <number[]>_.rest([1, 2, 3]);
result = <number[]>_.rest([1, 2, 3], 2);
result = <number[]>_.rest([1, 2, 3], (num) => num < 3)
result = <IFoodOrganic[]>_.rest(foodsOrganic, 'test');
result = <IFoodType[]>_.rest(foodsType, { 'type': 'value' });

result = <number[]>_.drop([1, 2, 3]);
result = <number[]>_.drop([1, 2, 3], 2);
result = <number[]>_.drop([1, 2, 3], (num) => num < 3)
result = <IFoodOrganic[]>_.drop(foodsOrganic, 'test');
result = <IFoodType[]>_.drop(foodsType, { 'type': 'value' });

result = <number[]>_.tail([1, 2, 3])
result = <number[]>_.tail([1, 2, 3], 2)
result = <number[]>_.tail([1, 2, 3], (num) => num < 3)
result = <IFoodOrganic[]>_.tail(foodsOrganic, 'test')
result = <IFoodType[]> _.tail(foodsType, { 'type': 'value' })

// _.fill
var testFillArray = [1, 2, 3];
var testFillList: _.List<number> = {0: 1, 1: 2, 2: 3, length: 3};

result = <string[]>_.fill<string>(testFillArray, 'a', 0, 3);
result = <_.List<string>>_.fill<string>(testFillList, 'a', 0, 3);
result = <number[]>_(testFillArray).fill<number>(0, 0, 3).value();
result = <_.List<number>>_(testFillList).fill<number>(0, 0, 3).value();

// _.findIndex
module TestFindIndex {
    let array: TResult[];
    let list: _.List<TResult>;
    let predicateFn: (value: TResult, index?: number, collection?: _.List<TResult>) => boolean;
    let result: number;

    result = _.findIndex<TResult>(array);
    result = _.findIndex<TResult>(array, predicateFn);
    result = _.findIndex<TResult>(array, predicateFn, any);
    result = _.findIndex<TResult>(array, '');
    result = _.findIndex<TResult>(array, '', any);
    result = _.findIndex<{a: number}, TResult>(array, {a: 42});

    result = _.findIndex<TResult>(list);
    result = _.findIndex<TResult>(list, predicateFn);
    result = _.findIndex<TResult>(list, predicateFn, any);
    result = _.findIndex<TResult>(list, '');
    result = _.findIndex<TResult>(list, '', any);
    result = _.findIndex<{a: number}, TResult>(list, {a: 42});

    result = _<TResult>(array).findIndex();
    result = _<TResult>(array).findIndex(predicateFn);
    result = _<TResult>(array).findIndex(predicateFn, any);
    result = _<TResult>(array).findIndex('');
    result = _<TResult>(array).findIndex('', any);
    result = _<TResult>(array).findIndex<{a: number}>({a: 42});

    result = _(list).findIndex();
    result = _(list).findIndex<TResult>(predicateFn);
    result = _(list).findIndex<TResult>(predicateFn, any);
    result = _(list).findIndex('');
    result = _(list).findIndex('', any);
    result = _(list).findIndex<{a: number}>({a: 42});
}

// _.findLastIndex
module TestFindLastIndex {
    let array: TResult[];
    let list: _.List<TResult>;
    let predicateFn: (value: TResult, index?: number, collection?: _.List<TResult>) => boolean;
    let result: number;

    result = _.findLastIndex<TResult>(array);
    result = _.findLastIndex<TResult>(array, predicateFn);
    result = _.findLastIndex<TResult>(array, predicateFn, any);
    result = _.findLastIndex<TResult>(array, '');
    result = _.findLastIndex<TResult>(array, '', any);
    result = _.findLastIndex<{a: number}, TResult>(array, {a: 42});

    result = _.findLastIndex<TResult>(list);
    result = _.findLastIndex<TResult>(list, predicateFn);
    result = _.findLastIndex<TResult>(list, predicateFn, any);
    result = _.findLastIndex<TResult>(list, '');
    result = _.findLastIndex<TResult>(list, '', any);
    result = _.findLastIndex<{a: number}, TResult>(list, {a: 42});

    result = _<TResult>(array).findLastIndex();
    result = _<TResult>(array).findLastIndex(predicateFn);
    result = _<TResult>(array).findLastIndex(predicateFn, any);
    result = _<TResult>(array).findLastIndex('');
    result = _<TResult>(array).findLastIndex('', any);
    result = _<TResult>(array).findLastIndex<{a: number}>({a: 42});

    result = _(list).findLastIndex();
    result = _(list).findLastIndex<TResult>(predicateFn);
    result = _(list).findLastIndex<TResult>(predicateFn, any);
    result = _(list).findLastIndex('');
    result = _(list).findLastIndex('', any);
    result = _(list).findLastIndex<{a: number}>({a: 42});
}

result = <number>_.first([1, 2, 3]);
result = <number[]>_.first([1, 2, 3], 2);
result = <number[]>_.first([1, 2, 3], function (num) {
    return num < 3;
});
result = <IFoodOrganic[]>_.first(foodsOrganic, 'organic');
result = <IFoodType[]>_.first(foodsType, { 'type': 'fruit' });

result = <number>_([1, 2, 3]).first();
result = <number[]>_([1, 2, 3]).first(2).value();
result = <number[]>_([1, 2, 3]).first(function (num) {
    return num < 3;
}).value();
result = <IFoodOrganic[]>_(foodsOrganic).first('organic').value();
result = <IFoodType[]>_(foodsType).first({ 'type': 'fruit' }).value();

result = <Array<number>>_.flatten([[1, 2], [3, 4]]);
result = <Array<number>>_.flatten([[1, 2], [3, 4], 5, 6]);
result = <Array<number|Array<Array<number>>>>_.flatten([1, [2], [3, [[4]]]]);

result = <Array<number>>_.flatten([1, [2], [[3]]], true);
result = <Array<number>>_.flatten<number>([1, [2], [3, [[4]]]], true);
result = <Array<number|boolean>>_.flatten<number|boolean>([1, [2], [3, [[false]]]], true);

result = <Array<number>>_.flattenDeep<number>([[[[1]]]]);

result = <_.LoDashArrayWrapper<number>>_([[1, 2], [3, 4], 5, 6]).flatten();
result = <_.LoDashArrayWrapper<number|Array<Array<number>>>>_([1, [2], [3, [[4]]]]).flatten();

result = <_.LoDashArrayWrapper<number>>_([1, [2], [3, [[4]]]]).flatten(true);

result = <_.LoDashArrayWrapper<number>>_([1, [2], [3, [[4]]]]).flattenDeep();

// _.head
module TestHead {
    let array: TResult[];
    let list: _.List<TResult>;
    let result: TResult;
    result = _.head<TResult>(array);
    result = _.head<TResult>(list);
    result = _(array).head();
    result = _(list).head<TResult>();
}

// _.indexOf
module TestIndexOf {
    let array: TResult[];
    let list: _.List<TResult>;
    let value: TResult;
    let result: number;
    result = _.indexOf<TResult>(array, value);
    result = _.indexOf<TResult>(array, value, true);
    result = _.indexOf<TResult>(array, value, 42);
    result = _.indexOf<TResult>(list, value);
    result = _.indexOf<TResult>(list, value, true);
    result = _.indexOf<TResult>(list, value, 42);
    result = _(array).indexOf(value);
    result = _(array).indexOf(value, true);
    result = _(array).indexOf(value, 42);
    result = _(list).indexOf<TResult>(value);
    result = _(list).indexOf<TResult>(value, true);
    result = _(list).indexOf<TResult>(value, 42);
}

result = <number[]>_.initial([1, 2, 3]);
result = <number[]>_.initial([1, 2, 3], 2);
result = <number[]>_.initial([1, 2, 3], function (num) {
    return num > 1;
});
result = <IFoodOrganic[]>_.initial(foodsOrganic, 'organic');
result = <IFoodType[]>_.initial(foodsType, { 'type': 'vegetable' });

result = <number[]>_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);

// _.last
module TestLast {
    let array: TResult[];
    let list: _.List<TResult>;
    let result: TResult;

    result = _.last<TResult>(array);
    result = _.last<TResult>(list);
    result = _<TResult>(array).last();
    result = _(list).last<TResult>();
}

// _.lastIndexOf
module TestLastIndexOf {
    let array: TResult[];
    let list: _.List<TResult>;
    let value: TResult;
    let result: number;

    result = _.lastIndexOf<TResult>(array, value);
    result = _.lastIndexOf<TResult>(array, value, true);
    result = _.lastIndexOf<TResult>(array, value, 42);

    result = _.lastIndexOf<TResult>(list, value);
    result = _.lastIndexOf<TResult>(list, value, true);
    result = _.lastIndexOf<TResult>(list, value, 42);

    result = _(array).lastIndexOf(value);
    result = _(array).lastIndexOf(value, true);
    result = _(array).lastIndexOf(value, 42);

    result = _(list).lastIndexOf<TResult>(value);
    result = _(list).lastIndexOf<TResult>(value, true);
    result = _(list).lastIndexOf<TResult>(value, 42);
}

result = <_.Dictionary<any>>_.zipObject(['moe', 'larry'], [30, 40]);
result = <_.LoDashObjectWrapper<_.Dictionary<any>>>_(['moe', 'larry']).zipObject([30, 40]);
result = <_.Dictionary<any>>_.object(['moe', 'larry'], [30, 40]);
result = <_.LoDashObjectWrapper<_.Dictionary<any>>>_(['moe', 'larry']).object([30, 40]);
result = <_.Dictionary<any>>_.zipObject([['moe', 30], ['larry', 40]]);
result = <_.LoDashObjectWrapper<_.Dictionary<any>>>_([['moe', 30], ['larry', 40]]).zipObject();
result = <_.Dictionary<any>>_.object([['moe', 30], ['larry', 40]]);
result = <_.LoDashObjectWrapper<_.Dictionary<any>>>_([['moe', 30], ['larry', 40]]).object();

// _.remove
module TestRemove {
    let array: TResult[];
    let list: _.List<TResult>;
    let predicateFn: (value: TResult, index?: number, collection?: _.List<TResult>) => boolean;
    let result: TResult[];

    result = _.remove<TResult>(array);
    result = _.remove<TResult>(array, predicateFn);
    result = _.remove<TResult>(array, predicateFn, any);
    result = _.remove<TResult>(array, '');
    result = _.remove<TResult>(array, '', any);
    result = _.remove<{a: number}, TResult>(array, {a: 42});

    result = _.remove<TResult>(list);
    result = _.remove<TResult>(list, predicateFn);
    result = _.remove<TResult>(list, predicateFn, any);
    result = _.remove<TResult>(list, '');
    result = _.remove<TResult>(list, '', any);
    result = _.remove<{a: number}, TResult>(list, {a: 42});

    result = _<TResult>(array).remove().value();
    result = _<TResult>(array).remove(predicateFn).value();
    result = _<TResult>(array).remove(predicateFn, any).value();
    result = _<TResult>(array).remove('').value();
    result = _<TResult>(array).remove('', any).value();
    result = _<TResult>(array).remove<{a: number}>({a: 42}).value();

    result = _(list).remove<TResult>().value();
    result = _(list).remove<TResult>(predicateFn).value();
    result = _(list).remove<TResult>(predicateFn, any).value();
    result = _(list).remove<TResult>('').value();
    result = _(list).remove<TResult>('', any).value();
    result = _(list).remove<{a: number}, TResult>({a: 42}).value();
}

result = <number>_.sortedIndex([20, 30, 50], 40);
result = <number>_.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
var sortedIndexDict: { wordToNumber: { [idx: string]: number } } = {
    'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
};
result = <number>_.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function (word: string) {
    return sortedIndexDict.wordToNumber[word];
});
result = <number>_.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function (word: string) {
    return this.wordToNumber[word];
}, sortedIndexDict);

// _.take
module TestTake {
    let array: TResult[];
    let list: _.List<TResult>;
    let result: TResult[];
    result = _.take<TResult>(array);
    result = _.take<TResult>(array, 42);
    result = _.take<TResult>(list);
    result = _.take<TResult>(list, 42);
    result = _(array).take().value();
    result = _(array).take(42).value();
    result = _(list).take<TResult>().value();
    result = _(list).take<TResult>(42).value();
}

// _.takeRight
{
    let testTakeRightArray: TResult[];
    let testTakeRightList: _.List<TResult>;
    let result: TResult[];
    result = _.takeRight<TResult>(testTakeRightArray);
    result = _.takeRight<TResult>(testTakeRightArray, 42);
    result = _.takeRight<TResult>(testTakeRightList);
    result = _.takeRight<TResult>(testTakeRightList, 42);
    result = _(testTakeRightArray).takeRight().value();
    result = _(testTakeRightArray).takeRight(42).value();
    result = _(testTakeRightList).takeRight<TResult>().value();
    result = _(testTakeRightList).takeRight<TResult>(42).value();
}

// _.takeRightWhile
module TestTakeRightWhile {
    let array: TResult[];
    let list: _.List<TResult>;
    let predicateFn: (value: TResult, index: number, collection: _.List<TResult>) => boolean;
    let result: TResult[];

    result = _.takeRightWhile<TResult>(array);
    result = _.takeRightWhile<TResult>(array, predicateFn);
    result = _.takeRightWhile<TResult>(array, predicateFn, any);
    result = _.takeRightWhile<TResult>(array, '')
    result = _.takeRightWhile<TResult>(array, '', any);
    result = _.takeRightWhile<{a: number;}, TResult>(array, {a: 42});

    result = _.takeRightWhile<TResult>(list);
    result = _.takeRightWhile<TResult>(list, predicateFn);
    result = _.takeRightWhile<TResult>(list, predicateFn, any);
    result = _.takeRightWhile<TResult>(list, '')
    result = _.takeRightWhile<TResult>(list, '', any);
    result = _.takeRightWhile<{a: number;}, TResult>(list, {a: 42});

    result = _(array).takeRightWhile().value();
    result = _(array).takeRightWhile(predicateFn).value();
    result = _(array).takeRightWhile(predicateFn, any).value();
    result = _(array).takeRightWhile('').value();
    result = _(array).takeRightWhile('', any).value();
    result = _(array).takeRightWhile<{a: number;}>({a: 42}).value();

    result = _(list).takeRightWhile<TResult>().value();
    result = _(list).takeRightWhile<TResult>(predicateFn).value();
    result = _(list).takeRightWhile<TResult>(predicateFn, any).value();
    result = _(list).takeRightWhile<TResult>('').value();
    result = _(list).takeRightWhile<TResult>('', any).value();
    result = _(list).takeRightWhile<{a: number;}, TResult>({a: 42}).value();
}

// _.takeWhile
module TestTakeWhile {
    let array: TResult[];
    let list: _.List<TResult>;
    let predicateFn: (value: TResult, index: number, collection: _.List<TResult>) => boolean;
    let result: TResult[];

    result = _.takeWhile<TResult>(array);
    result = _.takeWhile<TResult>(array, predicateFn);
    result = _.takeWhile<TResult>(array, predicateFn, any);
    result = _.takeWhile<TResult>(array, '')
    result = _.takeWhile<TResult>(array, '', any);
    result = _.takeWhile<{a: number;}, TResult>(array, {a: 42});

    result = _.takeWhile<TResult>(list);
    result = _.takeWhile<TResult>(list, predicateFn);
    result = _.takeWhile<TResult>(list, predicateFn, any);
    result = _.takeWhile<TResult>(list, '')
    result = _.takeWhile<TResult>(list, '', any);
    result = _.takeWhile<{a: number;}, TResult>(list, {a: 42});

    result = _(array).takeWhile().value();
    result = _(array).takeWhile(predicateFn).value();
    result = _(array).takeWhile(predicateFn, any).value();
    result = _(array).takeWhile('').value();
    result = _(array).takeWhile('', any).value();
    result = _(array).takeWhile<{a: number;}>({a: 42}).value();

    result = _(list).takeWhile<TResult>().value();
    result = _(list).takeWhile<TResult>(predicateFn).value();
    result = _(list).takeWhile<TResult>(predicateFn, any).value();
    result = _(list).takeWhile<TResult>('').value();
    result = _(list).takeWhile<TResult>('', any).value();
    result = _(list).takeWhile<{a: number;}, TResult>({a: 42}).value();
}

result = <number[]>_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);

result = <number[]>_.uniq([1, 2, 1, 3, 1]);
result = <number[]>_.uniq([1, 1, 2, 2, 3], true);
result = <string[]>_.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function (letter) {
    return letter.toLowerCase();
});
result = <number[]>_.uniq([1, 2.5, 3, 1.5, 2, 3.5], function (num) { return this.floor(num); }, Math);
result = <{ x: number; }[]>_.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');

result = <number[]>_.unique([1, 2, 1, 3, 1]);
result = <number[]>_.unique([1, 1, 2, 2, 3], true);
result = <string[]>_.unique(['A', 'b', 'C', 'a', 'B', 'c'], function (letter) {
    return letter.toLowerCase();
});
result = <number[]>_.unique([1, 2.5, 3, 1.5, 2, 3.5], function (num) { return this.floor(num); }, Math);
result = <{ x: number; }[]>_.unique([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');

result = <number[]>_([1, 2, 1, 3, 1]).uniq().value();
result = <number[]>_([1, 1, 2, 2, 3]).uniq(true).value();
result = <string[]>_(['A', 'b', 'C', 'a', 'B', 'c']).uniq(function (letter) {
    return letter.toLowerCase();
}).value();
result = <number[]>_([1, 2.5, 3, 1.5, 2, 3.5]).uniq(function (num) { return this.floor(num); }, Math).value();
result = <{ x: number; }[]>_([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }]).uniq('x').value();

result = <number[]>_([1, 2, 1, 3, 1]).unique().value();
result = <number[]>_([1, 1, 2, 2, 3]).unique(true).value();
result = <string[]>_(['A', 'b', 'C', 'a', 'B', 'c']).unique(function (letter) {
    return letter.toLowerCase();
}).value();
result = <number[]>_([1, 2.5, 3, 1.5, 2, 3.5]).unique(function (num) { return this.floor(num); }, Math).value();
result = <{ x: number; }[]>_([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }]).unique('x').value();

result = <number[]>_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);

// _.xor
module TestXor {
    let array: TResult[];
    let list: _.List<TResult>;
    let result: TResult[];

    result = _.xor<TResult>();

    result = _.xor<TResult>(array);
    result = _.xor<TResult>(array, list);
    result = _.xor<TResult>(array, list, array);

    result = _.xor<TResult>(list);
    result = _.xor<TResult>(list, array);
    result = _.xor<TResult>(list, array, list);

    result = _(array).xor().value();
    result = _(array).xor(list).value();
    result = _(array).xor(list, array).value();

    result = _(list).xor<TResult>().value();
    result = _(list).xor<TResult>(array).value();
    result = _(list).xor<TResult>(array, list).value();
}

result = <any[][]>_.zip(['moe', 'larry'], [30, 40], [true, false]);
result = <any[][]>_.unzip(['moe', 'larry'], [30, 40], [true, false]);
result = <any[][]>_(['moe', 'larry']).zip([30, 40], [true, false]).value();
result = <any[][]>_(['moe', 'larry']).unzip([30, 40], [true, false]).value();

// /* *************
//  * Collections *
//  ************* */

/*********
 * Chain *
 *********/

// _.thru
{
    let result: number;
    result = _.thru<number, number>(1, (value: number) => value);
    result = _.thru<number, number>(1, (value: number) => value, any);
}
{
    let result: _.LoDashWrapper<number>;
    result = _(1).thru<number>((value: number) => value);
    result = _(1).thru<number>((value: number) => value, any);
}
{
    let result: _.LoDashWrapper<string>;
    result = _('').thru<string>((value: string) => value);
    result = _('').thru<string>((value: string) => value, any);
}
{
    let result: _.LoDashWrapper<boolean>;
    result = _(true).thru<boolean>((value: boolean) => value);
    result = _(true).thru<boolean>((value: boolean) => value, any);
}
{
    let result: _.LoDashObjectWrapper<any>;
    result = _({}).thru<Object>((value: Object) => value);
    result = _({}).thru<Object>((value: Object) => value, any);
}
{
    let result: _.LoDashArrayWrapper<number>;
    result = _([1, 2, 3]).thru<number>((value: number[]) => value);
    result = _([1, 2, 3]).thru<number>((value: number[]) => value, any);
}

// _.prototype.commit
{
    let result: _.LoDashWrapper<number>;
    result = _(42).commit();
}
{
    let result: _.LoDashArrayWrapper<any>;
    result = _<any>([]).commit();
}
{
    let result: _.LoDashObjectWrapper<any>;
    result = _({}).commit();
}

// _.prototype.plant
{
    let result: _.LoDashWrapper<number>;
    result = _(any).plant(42);
}
{
    let result: _.LoDashStringWrapper;
    result = _(any).plant('');
}
{
    let result: _.LoDashWrapper<boolean>;
    result = _(any).plant(true);
}
{
    let result: _.LoDashNumberArrayWrapper;
    result = _(any).plant([42]);
}
{
    let result: _.LoDashArrayWrapper<any>;
    result = _(any).plant<any>([]);
}
{
    let result: _.LoDashObjectWrapper<{}>;
    result = _(any).plant<{}>({});
}

/**************
 * Collection *
 **************/

// _.all
module TestAll {
    let array: TResult[];
    let list: _.List<TResult>;
    let dictionary: _.Dictionary<TResult>;

    let listIterator: (value: TResult, index: number, collection: _.List<TResult>) => boolean;
    let dictionaryIterator: (value: TResult, key: string, collection: _.Dictionary<TResult>) => boolean;

    let result: boolean;

    result = _.all<TResult>(array);
    result = _.all<TResult>(array, listIterator);
    result = _.all<TResult>(array, listIterator, any);
    result = _.all<TResult>(array, '');
    result = _.all<{a: number}, TResult>(array, {a: 42});

    result = _.all<TResult>(list);
    result = _.all<TResult>(list, listIterator);
    result = _.all<TResult>(list, listIterator, any);
    result = _.all<TResult>(list, '');
    result = _.all<{a: number}, TResult>(list, {a: 42});

    result = _.all<TResult>(dictionary);
    result = _.all<TResult>(dictionary, dictionaryIterator);
    result = _.all<TResult>(dictionary, dictionaryIterator, any);
    result = _.all<TResult>(dictionary, '');
    result = _.all<{a: number}, TResult>(dictionary, {a: 42});

    result = _(array).all();
    result = _(array).all(listIterator);
    result = _(array).all(listIterator, any);
    result = _(array).all('');
    result = _(array).all<{a: number}>({a: 42});

    result = _(list).all<TResult>();
    result = _(list).all<TResult>(listIterator);
    result = _(list).all<TResult>(listIterator, any);
    result = _(list).all('');
    result = _(list).all<{a: number}>({a: 42});

    result = _(dictionary).all<TResult>();
    result = _(dictionary).all<TResult>(dictionaryIterator);
    result = _(dictionary).all<TResult>(dictionaryIterator, any);
    result = _(dictionary).all('');
    result = _(dictionary).all<{a: number}>({a: 42});
}

// _.at
{
    let testAtArray: TResult[];
    let testAtList: _.List<TResult>;
    let testAtDictionary: _.Dictionary<TResult>;
    let result: TResult[];
    result = _.at<TResult>(testAtArray, 0, '1', [2], ['3'], [4, '5']);
    result = _.at<TResult>(testAtList, 0, '1', [2], ['3'], [4, '5']);
    result = _.at<TResult>(testAtDictionary, 0, '1', [2], ['3'], [4, '5']);
    result = _(testAtArray).at(0, '1', [2], ['3'], [4, '5']).value();
    result = _(testAtList).at<TResult>(0, '1', [2], ['3'], [4, '5']).value();
    result = _(testAtDictionary).at<TResult>(0, '1', [2], ['3'], [4, '5']).value();
}

// _.collect
module TestCollect {
    let array: number[];
    let list: _.List<number>;
    let dictionary: _.Dictionary<number>;
    let listIterator: {(value: number, index: number, collection: _.List<number>): TResult};
    let dictionaryIterator: {(value: number, key: string, collection: _.Dictionary<number>): TResult};
    {
        let result: TResult[];
        result = _.collect<number, TResult>(array);
        result = _.collect<number, TResult>(array, listIterator);
        result = _.collect<number, TResult>(array, listIterator, any);
        result = _.collect<number, TResult>(array, '');
        result = _.collect<number, TResult>(list);
        result = _.collect<number, TResult>(list, listIterator);
        result = _.collect<number, TResult>(list, listIterator, any);
        result = _.collect<number, TResult>(list, '');
        result = _.collect<number, TResult>(dictionary);
        result = _.collect<number, TResult>(dictionary, dictionaryIterator);
        result = _.collect<number, TResult>(dictionary, dictionaryIterator, any);
        result = _.collect<number, TResult>(dictionary, '');
        result = _<number>(array).collect<TResult>().value();
        result = _<number>(array).collect<TResult>(listIterator).value();
        result = _<number>(array).collect<TResult>(listIterator, any).value();
        result = _<number>(array).collect<TResult>('').value();
        result = _(list).collect<number, TResult>().value();
        result = _(list).collect<number, TResult>(listIterator).value();
        result = _(list).collect<number, TResult>(listIterator, any).value();
        result = _(list).collect<number, TResult>('').value();
        result = _(dictionary).collect<number, TResult>().value();
        result = _(dictionary).collect<number, TResult>(dictionaryIterator).value();
        result = _(dictionary).collect<number, TResult>(dictionaryIterator, any).value();
        result = _(dictionary).collect<number, TResult>('').value();
    }
    {
        let result: boolean[];
        result = _.collect<number, {}>(array, {});
        result = _.collect<number, {}>(list, {});
        result = _.collect<number, {}>(dictionary, {});
        result = _<number>(array).collect<{}>({}).value();
        result = _(list).collect<{}>({}).value();
        result = _(dictionary).collect<{}>({}).value();
    }
}

result = <boolean>_.contains([1, 2, 3], 1);
result = <boolean>_.contains([1, 2, 3], 1, 2);
result = <boolean>_.contains({ 'moe': 30, 'larry': 40, 'curly': 67 }, 40);
result = <boolean>_.contains('curly', 'ur');

result = <boolean>_([1, 2, 3]).contains(1);
result = <boolean>_([1, 2, 3]).contains(1, 2);
result = <boolean>_({ 'moe': 30, 'larry': 40, 'curly': 67 }).contains(40);
result = <boolean>_('curly').contains('ur');

result = <boolean>_.include([1, 2, 3], 1);
result = <boolean>_.include([1, 2, 3], 1, 2);
result = <boolean>_.include({ 'moe': 30, 'larry': 40, 'curly': 67 }, 40);
result = <boolean>_.include('curly', 'ur');

result = <boolean>_([1, 2, 3]).include(1);
result = <boolean>_([1, 2, 3]).include(1, 2);
result = <boolean>_({ 'moe': 30, 'larry': 40, 'curly': 67 }).include(40);
result = <boolean>_('curly').include('ur');

result = <boolean>_.includes([1, 2, 3], 1);
result = <boolean>_.includes([1, 2, 3], 1, 2);
result = <boolean>_.includes({ 'moe': 30, 'larry': 40, 'curly': 67 }, 40);
result = <boolean>_.includes('curly', 'ur');

result = <boolean>_([1, 2, 3]).includes(1);
result = <boolean>_([1, 2, 3]).includes(1, 2);
result = <boolean>_({ 'moe': 30, 'larry': 40, 'curly': 67 }).includes(40);
result = <boolean>_('curly').includes('ur');

result = <_.Dictionary<number>>_.countBy([4.3, 6.1, 6.4], function (num) { return Math.floor(num); });
result = <_.Dictionary<number>>_.countBy([4.3, 6.1, 6.4], function (num) { return this.floor(num); }, Math);
result = <_.Dictionary<number>>_.countBy(['one', 'two', 'three'], 'length');

result = <_.LoDashObjectWrapper<_.Dictionary<number>>>_([4.3, 6.1, 6.4]).countBy(function (num) { return Math.floor(num); });
result = <_.LoDashObjectWrapper<_.Dictionary<number>>>_([4.3, 6.1, 6.4]).countBy(function (num) { return this.floor(num); }, Math);
result = <_.LoDashObjectWrapper<_.Dictionary<number>>>_(['one', 'two', 'three']).countBy('length');

// _.every
module TestEvery {
    let array: TResult[];
    let list: _.List<TResult>;
    let dictionary: _.Dictionary<TResult>;

    let listIterator: (value: TResult, index: number, collection: _.List<TResult>) => boolean;
    let dictionaryIterator: (value: TResult, key: string, collection: _.Dictionary<TResult>) => boolean;

    let result: boolean;

    result = _.every<TResult>(array);
    result = _.every<TResult>(array, listIterator);
    result = _.every<TResult>(array, listIterator, any);
    result = _.every<TResult>(array, '');
    result = _.every<{a: number}, TResult>(array, {a: 42});

    result = _.every<TResult>(list);
    result = _.every<TResult>(list, listIterator);
    result = _.every<TResult>(list, listIterator, any);
    result = _.every<TResult>(list, '');
    result = _.every<{a: number}, TResult>(list, {a: 42});

    result = _.every<TResult>(dictionary);
    result = _.every<TResult>(dictionary, dictionaryIterator);
    result = _.every<TResult>(dictionary, dictionaryIterator, any);
    result = _.every<TResult>(dictionary, '');
    result = _.every<{a: number}, TResult>(dictionary, {a: 42});

    result = _(array).every();
    result = _(array).every(listIterator);
    result = _(array).every(listIterator, any);
    result = _(array).every('');
    result = _(array).every<{a: number}>({a: 42});

    result = _(list).every<TResult>();
    result = _(list).every<TResult>(listIterator);
    result = _(list).every<TResult>(listIterator, any);
    result = _(list).every('');
    result = _(list).every<{a: number}>({a: 42});

    result = _(dictionary).every<TResult>();
    result = _(dictionary).every<TResult>(dictionaryIterator);
    result = _(dictionary).every<TResult>(dictionaryIterator, any);
    result = _(dictionary).every('');
    result = _(dictionary).every<{a: number}>({a: 42});
}

result = <number[]>_.filter([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });
result = <IFoodCombined[]>_.filter(foodsCombined, 'organic');
result = <IFoodCombined[]>_.filter(foodsCombined, { 'type': 'fruit' });

result = <number[]>_([1, 2, 3, 4, 5, 6]).filter(function (num) { return num % 2 == 0; }).value();
result = <IFoodCombined[]>_(foodsCombined).filter('organic').value();
result = <IFoodCombined[]>_(foodsCombined).filter({ 'type': 'fruit' }).value();

result = <number[]>_.select([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });
result = <IFoodCombined[]>_.select(foodsCombined, 'organic');
result = <IFoodCombined[]>_.select(foodsCombined, { 'type': 'fruit' });

result = <number[]>_([1, 2, 3, 4, 5, 6]).select(function (num) { return num % 2 == 0; }).value();
result = <IFoodCombined[]>_(foodsCombined).select('organic').value();
result = <IFoodCombined[]>_(foodsCombined).select({ 'type': 'fruit' }).value();

result = <number>_.find([1, 2, 3, 4], num => num % 2 == 0);
result = <IFoodCombined>_.find(foodsCombined, { 'type': 'vegetable' });
result = <IFoodCombined>_.find(foodsCombined, 'type', 'vegetable');
result = <IFoodCombined>_.find(foodsCombined, 'organic');
result = <number>_([1, 2, 3, 4]).find(num => num % 2 == 0);
result = <IFoodCombined>_(foodsCombined).find({ 'type': 'vegetable' });
result = <IFoodCombined>_(foodsCombined).find('type', 'vegetable');
result = <IFoodCombined>_(foodsCombined).find('organic');

result = <number>_.detect([1, 2, 3, 4], function (num) {
    return num % 2 == 0;
});
result = <IFoodCombined>_.detect(foodsCombined, { 'type': 'vegetable' });
result = <IFoodCombined>_.detect(foodsCombined, 'organic');

result = <number>_.findWhere([1, 2, 3, 4], function (num) {
    return num % 2 == 0;
});
result = <IFoodCombined>_.findWhere(foodsCombined, { 'type': 'vegetable' });
result = <IFoodCombined>_.findWhere(foodsCombined, 'organic');

result = <number>_.findLast([1, 2, 3, 4], function (num) {
    return num % 2 == 0;
});
result = <IFoodCombined>_.findLast(foodsCombined, { 'type': 'vegetable' });
result = <IFoodCombined>_.findLast(foodsCombined, 'organic');

result = <number>_([1, 2, 3, 4]).findLast(function (num) {
    return num % 2 == 0;
});
result = <IFoodCombined>_(foodsCombined).findLast({ 'type': 'vegetable' });
result = <IFoodCombined>_(foodsCombined).findLast('organic');

result = <number[]>_.forEach([1, 2, 3], function (num) { console.log(num); });
result = <_.Dictionary<number>>_.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function (num) { console.log(num); });
result = <IFoodType>_.forEach<IFoodType, string>({ name: 'apple', type: 'fruit' }, function (value, key) { console.log(value, key) });

result = <number[]>_.each([1, 2, 3], function (num) { console.log(num); });
result = <_.Dictionary<number>>_.each({ 'one': 1, 'two': 2, 'three': 3 }, function (num) { console.log(num); });
result = <IFoodType>_.each<IFoodType, string>({ name: 'apple', type: 'fruit' }, function (value, key) { console.log(value, key) });

result = <_.LoDashArrayWrapper<number>>_([1, 2, 3]).forEach(function (num) { console.log(num); });
result = <_.LoDashObjectWrapper<_.Dictionary<number>>>_(<{ [index: string]: number; }>{ 'one': 1, 'two': 2, 'three': 3 }).forEach(function (num) { console.log(num); });

result = <_.LoDashArrayWrapper<number>>_([1, 2, 3]).each(function (num) { console.log(num); });
result = <_.LoDashObjectWrapper<_.Dictionary<number>>>_(<{ [index: string]: number; }>{ 'one': 1, 'two': 2, 'three': 3 }).each(function (num) { console.log(num); });

result = <number[]>_.forEachRight([1, 2, 3], function (num) { console.log(num); });
result = <_.Dictionary<number>>_.forEachRight({ 'one': 1, 'two': 2, 'three': 3 }, function (num) { console.log(num); });

result = <number[]>_.eachRight([1, 2, 3], function (num) { console.log(num); });
result = <_.Dictionary<number>>_.eachRight({ 'one': 1, 'two': 2, 'three': 3 }, function (num) { console.log(num); });

result = <_.LoDashArrayWrapper<number>>_([1, 2, 3]).forEachRight(function (num) { console.log(num); });
result = <_.LoDashObjectWrapper<_.Dictionary<number>>>_(<{ [index: string]: number; }>{ 'one': 1, 'two': 2, 'three': 3 }).forEachRight(function (num) { console.log(num); });

result = <_.LoDashArrayWrapper<number>>_([1, 2, 3]).eachRight(function (num) { console.log(num); });
result = <_.LoDashObjectWrapper<_.Dictionary<number>>>_(<{ [index: string]: number; }>{ 'one': 1, 'two': 2, 'three': 3 }).eachRight(function (num) { console.log(num); });

result = <_.Dictionary<number[]>>_.groupBy([4.2, 6.1, 6.4], function (num) { return Math.floor(num); });
result = <_.Dictionary<number[]>>_.groupBy([4.2, 6.1, 6.4], function (num) { return this.floor(num); }, Math);
result = <_.Dictionary<string[]>>_.groupBy(['one', 'two', 'three'], 'length');

result = <_.Dictionary<number[]>>_.groupBy({ prop1: 4.2, prop2: 6.1, prop3: 6.4}, function (num) { return Math.floor(num); });
result = <_.Dictionary<number[]>>_.groupBy({ prop1: 4.2, prop2: 6.1, prop3: 6.4}, function (num) { return this.floor(num); }, Math);
result = <_.Dictionary<string[]>>_.groupBy({ prop1: 'one', prop2: 'two', prop3: 'three'}, 'length');

result = <_.Dictionary<number[]>>_([4.2, 6.1, 6.4]).groupBy(function (num) { return Math.floor(num); }).value();
result = <_.Dictionary<number[]>>_([4.2, 6.1, 6.4]).groupBy(function (num) { return this.floor(num); }, Math).value();
result = <_.Dictionary<string[]>>_(['one', 'two', 'three']).groupBy('length').value();

result = <_.Dictionary<number[]>>_({ prop1: 4.2, prop2: 6.1, prop3: 6.4}).groupBy<number>(function (num) { return Math.floor(num); }).value();
result = <_.Dictionary<number[]>>_({ prop1: 4.2, prop2: 6.1, prop3: 6.4}).groupBy<number>(function (num) { return this.floor(num); }, Math).value();
result = <_.Dictionary<string[]>>_({ prop1: 'one', prop2: 'two', prop3: 'three'}).groupBy<string>('length').value();

result = <_.Dictionary<IKey>>_.indexBy(keys, 'dir');
result = <_.Dictionary<IKey>>_.indexBy(keys, function (key) { return String.fromCharCode(key.code); });
result = <_.Dictionary<IKey>>_.indexBy(keys, function (key) { this.fromCharCode(key.code); }, String);

result = <number[][]>_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
result = <string[][]>_.invoke([123, 456], String.prototype.split, '');

result = <number[]>_.map([1, 2, 3], function (num) { return num * 3; });
result = <number[]>_.map({ 'one': 1, 'two': 2, 'three': 3 }, function (num) { return num * 3; });
result = <IStoogesAge[]>_.map(stoogesAges, 'name');

result = <number[]>_([1, 2, 3]).map(function (num) { return num * 3; }).value();
result = <number[]>_({ 'one': 1, 'two': 2, 'three': 3 }).map(function (num: number) { return num * 3; }).value();
result = <IStoogesAge[]>_(stoogesAges).map('name').value();

result = <number[]>_.collect([1, 2, 3], function (num) { return num * 3; });
result = <number[]>_.collect({ 'one': 1, 'two': 2, 'three': 3 }, function (num) { return num * 3; });
result = <IStoogesAge[]>_.collect(stoogesAges, 'name');

result = <number[]>_([1, 2, 3]).collect(function (num) { return num * 3; }).value();
result = <number[]>_({ 'one': 1, 'two': 2, 'three': 3 }).collect(function (num: number) { return num * 3; }).value();
result = <IStoogesAge[]>_(stoogesAges).collect('name').value();

// _.ceil
result = <number>_.ceil(4.006);
// → 5
result = <number>_.ceil(6.004, 2);
// → 6.01
result = <number>_.ceil(6040, -2);
// → 6100
result = <number>_(4.006).ceil();
// → 5
result = <number>_(6.004).ceil(2);
// → 6.01
result = <number>_(6040).ceil(-2);
// → 6100

// _.floor
result = <number>_.floor(4.006);
// → 4
result = <number>_.floor(0.046, 2);
// → 0.04
result = <number>_.floor(4060, -2);
// → 4000
result = <number>_(4.006).floor();
// → 4
result = <number>_(0.046).floor(2);
// → 0.04
result = <number>_(4060).floor(-2);
// → 4000

result = <number>_.max([4, 2, 8, 6]);
result = <IStoogesAge>_.max(stoogesAges, function (stooge) { return stooge.age; });
result = <IStoogesAge>_.max(stoogesAges, 'age');
result = <_.LoDashWrapper<number>>_([4, 2, 8, 6]).max();
result = <_.LoDashWrapper<IStoogesAge>>_(stoogesAges).max(function (stooge) { return stooge.age; });
result = <_.LoDashWrapper<IStoogesAge>>_(stoogesAges).max('age');

result = <number>_.min([4, 2, 8, 6]);
result = <IStoogesAge>_.min(stoogesAges, function (stooge) { return stooge.age; });
result = <IStoogesAge>_.min(stoogesAges, 'age');
result = <_.LoDashWrapper<number>>_([4, 2, 8, 6]).min();
result = <_.LoDashWrapper<IStoogesAge>>_(stoogesAges).min(function (stooge) { return stooge.age; });
result = <_.LoDashWrapper<IStoogesAge>>_(stoogesAges).min('age');

// _.round
result = <number>_.round(4.006);
// → 4
result = <number>_.round(4.006, 2);
// → 4.01
result = <number>_.round(4060, -2);
// → 4100
result = <number>_(4.006).round();
// → 4
result = <number>_(4.006).round(2);
// → 4.01
result = <number>_(4060).round(-2);
// → 4100

result = <number>_.sum([4, 2, 8, 6]);
result = <number>_.sum([4, 2, 8, 6], function(v) { return v; });
result = <number>_.sum({a: 2, b: 4});
result = <number>_.sum({a: 2, b: 4}, function(v) { return v; });
result = <number>_.sum(stoogesAges, function (stooge) { return stooge.age; });
result = <number>_.sum(stoogesAges, 'age');
result = <number>_.sum(stoogesAgesDict, function(stooge) { return stooge.age; });
result = <number>_.sum(stoogesAgesDict, 'age');
result = <number>_([4, 2, 8, 6]).sum();
result = <number>_([4, 2, 8, 6]).sum(function(v) { return v; });
result = <number>_({a: 2, b: 4}).sum();
result = <number>_({a: 2, b: 4}).sum(function(v) { return v; });
result = <number>_(stoogesAges).sum(function (stooge) { return stooge.age; });
result = <number>_(stoogesAges).sum('age');
result = <number>_(stoogesAgesDict).sum(function (stooge) { return stooge.age; });
result = <number>_(stoogesAgesDict).sum('age');

result = <string[]>_.pluck(stoogesAges, 'name');
result = <string[]>_(stoogesAges).pluck('name').value();

interface ABC {
    [index: string]: number;
    a: number;
    b: number;
    c: number;
}

result = <number>_.reduce<number, number>([1, 2, 3], function (sum: number, num: number) {
    return sum + num;
});
result = <ABC>_.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function (r: ABC, num: number, key: string) {
    r[key] = num * 3;
    return r;
}, {});

result = <number>_.foldl([1, 2, 3], function (sum: number, num: number) {
    return sum + num;
});
result = <ABC>_.foldl({ 'a': 1, 'b': 2, 'c': 3 }, function (r: ABC, num: number, key: string) {
    r[key] = num * 3;
    return r;
}, {});

result = <number>_.inject([1, 2, 3], function (sum: number, num: number) {
    return sum + num;
});
result = <ABC>_.inject({ 'a': 1, 'b': 2, 'c': 3 }, function (r: ABC, num: number, key: string) {
    r[key] = num * 3;
    return r;
}, {});

result = <number>_([1, 2, 3]).reduce<number>(function (sum: number, num: number) {
    return sum + num;
});
result = <ABC>_({ 'a': 1, 'b': 2, 'c': 3 }).reduce<number, ABC>(function (r: ABC, num: number, key: string) {
    r[key] = num * 3;
    return r;
}, {});

result = <number>_([1, 2, 3]).foldl<number>(function (sum: number, num: number) {
    return sum + num;
});
result = <ABC>_({ 'a': 1, 'b': 2, 'c': 3 }).foldl<number, ABC>(function (r: ABC, num: number, key: string) {
    r[key] = num * 3;
    return r;
}, {});

result = <number>_([1, 2, 3]).inject<number>(function (sum: number, num: number) {
    return sum + num;
});
result = <ABC>_({ 'a': 1, 'b': 2, 'c': 3 }).inject<number, ABC>(function (r: ABC, num: number, key: string) {
    r[key] = num * 3;
    return r;
}, {});

result = <number[]>_.reduceRight([[0, 1], [2, 3], [4, 5]], function (a: number[], b: number[]) { return a.concat(b); }, <number[]>[]);
result = <number[]>_.foldr([[0, 1], [2, 3], [4, 5]], function (a: number[], b: number[]) { return a.concat(b); }, <number[]>[]);

result = <number[]>_.reject([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });
result = <IFoodCombined[]>_.reject(foodsCombined, 'organic');
result = <IFoodCombined[]>_.reject(foodsCombined, { 'type': 'fruit' });

result = <number[]>_([1, 2, 3, 4, 5, 6]).reject(function (num) { return num % 2 == 0; }).value();
result = <IFoodCombined[]>_(foodsCombined).reject('organic').value();
result = <IFoodCombined[]>_(foodsCombined).reject({ 'type': 'fruit' }).value();

result = <number>_.sample([1, 2, 3, 4]);
result = <number[]>_.sample([1, 2, 3, 4], 2);
result = <_.LoDashWrapper<number>>_([1, 2, 3, 4]).sample();
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3, 4]).sample(2);
result = <number>_([1, 2, 3, 4]).sample().value();
result = <number[]>_([1, 2, 3, 4]).sample(2).value();

result = <number[]>_.shuffle([1, 2, 3, 4, 5, 6]);
result = <_.LoDashArrayWrapper<number>>_([1, 2, 3]).shuffle();
result = <_.LoDashArrayWrapper<_.Dictionary<string>>>_(<{ [index: string]: string; }>{ 'key1': 'test1', 'key2': 'test2' }).shuffle();

result = <number>_.size([1, 2]);
result = <number>_([1, 2]).size();
result = <number>_.size({ 'one': 1, 'two': 2, 'three': 3 });
result = <number>_({ 'one': 1, 'two': 2, 'three': 3 }).size();
result = <number>_.size('curly');

result = <boolean>_.some([null, 0, 'yes', false], Boolean);
result = <boolean>_.some(foodsCombined, 'organic');
result = <boolean>_.some(foodsCombined, { 'type': 'meat' });
result = <boolean>_.some(foodsOrganic[0]);

result = <boolean>_.any([null, 0, 'yes', false], Boolean);
result = <boolean>_.any(foodsCombined, 'organic');
result = <boolean>_.any(foodsCombined, { 'type': 'meat' });
result = <boolean>_.any(foodsOrganic[0]);

result = <number[]>_.sortBy([1, 2, 3], function (num) { return Math.sin(num); });
result = <number[]>_.sortBy([1, 2, 3], function (num) { return this.sin(num); }, Math);
result = <string[]>_.sortBy(['banana', 'strawberry', 'apple'], 'length');

result = <IStoogesAge[]>_.sortByAll(stoogesAges, function(stooge) { return Math.sin(stooge.age); }, function(stooge) { return stooge.name.slice(1); });
result = <IStoogesAge[]>_.sortByAll(stoogesAges, ['name', 'age']);
result = <IStoogesAge[]>_.sortByAll(stoogesAges, 'name', function(stooge) { return Math.sin(stooge.age); });

result = <IStoogesAge[]>_.sortByOrder(stoogesAges, [function(stooge) { return Math.sin(stooge.age); }, function(stooge) { return stooge.name.slice(1); }]);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, ['name', 'age']);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, ['name', function(stooge) { return Math.sin(stooge.age); }]);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, [function(stooge) { return Math.sin(stooge.age); }, function(stooge) { return stooge.name.slice(1); }], ['asc', 'desc']);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, ['name', 'age'], ['asc', 'desc']);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, ['name', function(stooge) { return Math.sin(stooge.age); }], ['asc', 'desc']);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, [function(stooge) { return Math.sin(stooge.age); }, function(stooge) { return stooge.name.slice(1); }], [true, false]);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, ['name', 'age'], [true, false]);
result = <IStoogesAge[]>_.sortByOrder(stoogesAges, ['name', function(stooge) { return Math.sin(stooge.age); }], [true, false]);

result = <number[]>_([1, 2, 3]).sortBy(function (num) { return Math.sin(num); }).value();
result = <number[]>_([1, 2, 3]).sortBy(function (num) { return this.sin(num); }, Math).value();
result = <string[]>_(['banana', 'strawberry', 'apple']).sortBy('length').value();

(function (a: number, b: number, c: number, d: number): Array<number> { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
result = <number[]>_.toArray([1, 2, 3, 4]);
(function (a: number, b: number, c: number, d: number): Array<number> { return _(arguments).toArray<number>().slice(1).value(); })(1, 2, 3, 4);
result = <number[]>_([1,2,3,4]).toArray().value();


result = <IStoogesCombined[]>_.where(stoogesCombined, { 'age': 40 });
result = <IStoogesCombined[]>_.where(stoogesCombined, { 'quotes': ['Poifect!'] });

result = <IStoogesCombined[]>_(stoogesCombined).where({ 'age': 40 }).value();
result = <IStoogesCombined[]>_(stoogesCombined).where({ 'quotes': ['Poifect!'] }).value();

/********
 * Date *
 ********/

result = <number>_.now();

/*************
 * Functions *
 *************/
var saves = ['profile', 'settings'];
var asyncSave = (obj: any) => obj.done();
var done: Function;

done = _.after(saves.length, function () {
    console.log('Done saving!');
});

_.forEach(saves, function (type) {
    asyncSave({ 'type': type, 'complete': done });
});

done = _(saves.length).after(function () {
    console.log('Done saving!');
}).value();

_.forEach(saves, function (type) {
    asyncSave({ 'type': type, 'complete': done });
});

// _.ary
result = <number[]>['6', '8', '10'].map(_.ary<(s: string) => number>(parseInt, 1));
result = <number[]>['6', '8', '10'].map(_(parseInt).ary<(s: string) => number>(1).value());

// _.backflow
var testBackflowSquareFn = (n: number) => n * n;
var testBackflowAddFn = (n: number, m: number) => n + m;
result = <number>_.backflow<(n: number, m: number) => number>(testBackflowSquareFn, testBackflowAddFn)(1, 2);
result = <number>_(testBackflowSquareFn).backflow<(n: number, m: number) => number>(testBackflowAddFn).value()(1, 2);

// _.before
var testBeforeFn = ((n: number) => () => ++n)(0);
var testBeforeResultFn = <() => number>_.before<() => number>(3, testBeforeFn);
result = <number>testBeforeResultFn();
// → 1
result = <number>testBeforeResultFn();
// → 2
result = <number>testBeforeResultFn();
// → 2
var testBeforeFn = ((n: number) => () => ++n)(0);
var testBeforeResultFn = <() => number>_(3).before<() => number>(testBeforeFn);
result = <number>testBeforeResultFn();
// → 1
result = <number>testBeforeResultFn();
// → 2
result = <number>testBeforeResultFn();
// → 2

var funcBind = function(greeting: string, punctuation: string) { return greeting + ' ' + this.user + punctuation; };
var funcBound1: (punctuation: string) => any = _.bind(funcBind, { 'name': 'moe' }, 'hi');
funcBound1('!');

var funcBound2: (punctuation: string) => any = _(funcBind).bind({ 'name': 'moe' }, 'hi').value();
funcBound2('!');

var addTwoNumbers = function (x: number, y: number) { return x + y };
var plusTwo = _.bind(addTwoNumbers, null, 2);
plusTwo(100);

var view = {
    'label': 'docs',
    'onClick': function () { console.log('clicked ' + this.label); }
};

view = _.bindAll(view);
jQuery('#docs').on('click', view.onClick);

view = _(view).bindAll().value();
jQuery('#docs').on('click', view.onClick);

var objectBindKey = {
    'name': 'moe',
    'greet': function (greeting: string) {
        return greeting + ' ' + this.name;
    }
};

var funcBindKey: Function = _.bindKey(objectBindKey, 'greet', 'hi');
funcBindKey();

objectBindKey.greet = function (greeting) {
    return greeting + ', ' + this.name + '!';
};

funcBindKey();

funcBindKey = _(objectBindKey).bindKey('greet', 'hi').value();
funcBindKey();

// _.compose
var testComposeSquareFn = (n: number) => n * n;
var testComposeAddFn = (n: number, m: number) => n + m;
result = <number>_.compose<(n: number, m: number) => number>(testComposeSquareFn, testComposeAddFn)(1, 2);
result = <number>_(testComposeSquareFn).compose<(n: number, m: number) => number>(testComposeAddFn).value()(1, 2);

var createCallbackObj: { [index: string]: string; } = { name: 'Joe' };
result = <() => any>_.createCallback('name');
result = <() => boolean>_.createCallback(createCallbackObj);
result = <_.LoDashObjectWrapper<() => any>>_('name').createCallback();
result = <_.LoDashObjectWrapper<() => boolean>>_(createCallbackObj).createCallback();

// _.curry
var testCurryFn = (a: number, b: number, c: number) => [a, b, c];
interface TestCurryResultFn {
    (...args: number[]): number[] | TestCurryResultFn;
}
result = <number[]>_.curry<TestCurryResultFn>(testCurryFn)(1, 2, 3);
result = <TestCurryResultFn>_.curry<TestCurryResultFn>(testCurryFn)(1);
result = <number[]>_(testCurryFn).curry<TestCurryResultFn>().value()(1, 2, 3);
result = <TestCurryResultFn>_(testCurryFn).curry<TestCurryResultFn>().value()(1);

// _.curryRight
var testCurryRightFn = (a: number, b: number, c: number) => [a, b, c];
interface TestCurryRightResultFn {
    (...args: number[]): number[] | TestCurryRightResultFn;
}
result = <number[]>_.curryRight<TestCurryRightResultFn>(testCurryRightFn)(1, 2, 3);
result = <TestCurryRightResultFn>_.curryRight<TestCurryRightResultFn>(testCurryRightFn)(1);
result = <number[]>_(testCurryRightFn).curryRight<TestCurryRightResultFn>().value()(1, 2, 3);
result = <TestCurryRightResultFn>_(testCurryRightFn).curryRight<TestCurryRightResultFn>().value()(1);

declare var source: any;
result = <Function>_.debounce(function () { }, 150);

jQuery('#postbox').on('click', <Function>_.debounce(function () { }, 300, {
    'leading': true,
    'trailing': false
}));

source.addEventListener('message', <Function>_.debounce(function () { }, 250, {
    'maxWait': 1000
}), false);

result = <_.LoDashObjectWrapper<Function>>_(function () { }).debounce(150);

jQuery('#postbox').on('click', <_.LoDashObjectWrapper<Function>>_(function () { }).debounce(300, {
    'leading': true,
    'trailing': false
}));

source.addEventListener('message', <_.LoDashObjectWrapper<Function>>_(function () { }).debounce(250, {
    'maxWait': 1000
}), false);

var returnedDebounce = _.throttle(function (a: any) { return a * 5; }, 5);
returnedThrottled(4);

result = <number>_.defer(function () { console.log('deferred'); });
result = <_.LoDashWrapper<number>>_(function () { console.log('deferred'); }).defer();

var log = _.bind(console.log, console);
result = <number>_.delay(log, 1000, 'logged later');
result = <_.LoDashWrapper<number>>_(log).delay(1000, 'logged later');

// _.flow
var testFlowSquareFn = (n: number) => n * n;
var testFlowAddFn = (n: number, m: number) => n + m;
result = <number>_.flow<(n: number, m: number) => number>(testFlowAddFn, testFlowSquareFn)(1, 2);
result = <number>_(testFlowAddFn).flow<(n: number, m: number) => number>(testFlowSquareFn).value()(1, 2);

// _.flowRight
var testFlowRightSquareFn = (n: number) => n * n;
var testFlowRightAddFn = (n: number, m: number) => n + m;
result = <number>_.flowRight<(n: number, m: number) => number>(testFlowRightSquareFn, testFlowRightAddFn)(1, 2);
result = <number>_(testFlowRightSquareFn).flowRight<(n: number, m: number) => number>(testFlowRightAddFn).value()(1, 2);

var fibonacci = <Function>_.memoize(function (n: any): number {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

var data: { [index: string]: { name: string; age: number; } } = {
    'moe': { 'name': 'moe', 'age': 40 },
    'curly': { 'name': 'curly', 'age': 60 }
};

var stooge = _.memoize(function (name: string) { return data[name]; }, _.identity);
stooge('curly');

var returnedMemoize = _.throttle(function (a: any) { return a * 5; }, 5);
returnedMemoize(4);

// _.modArgs
function modArgsFn1(n: number): string {return n.toString()}
function modArgsFn2(n: boolean): string {return n.toString()}
interface ModArgsFunc {
    (x: string, y: string): string[];
}
interface ModArgsResult {
    (x: number, y: boolean): string[]
}
result = <ModArgsResult>_.modArgs<ModArgsFunc, ModArgsResult>((x: string, y: string) => [x, y], modArgsFn1, modArgsFn2);
result = <string[]>result(1, true);

result = <ModArgsResult>_.modArgs<ModArgsFunc, ModArgsResult>((x: string, y: string) => [x, y], [modArgsFn1, modArgsFn2]);
result = <string[]>result(1, true);

result = <ModArgsResult>_<ModArgsFunc>((x: string, y: string) => [x, y]).modArgs<ModArgsResult>(modArgsFn1, modArgsFn2).value();
result = <string[]>result(1, true);

result = <ModArgsResult>_<ModArgsFunc>((x: string, y: string) => [x, y]).modArgs<ModArgsResult>([modArgsFn1, modArgsFn2]).value();
result = <string[]>result(1, true);

// _.negate
interface TestNegatePredicate {
    (a1: number, a2: number): boolean;
}
interface TestNegateResult {
    (a1: number, a2: number): boolean;
}
var testNegatePredicate = (a1: number, a2: number) => a1 > a2;
result = <TestNegateResult>_.negate<TestNegatePredicate>(testNegatePredicate);
result = <TestNegateResult>_.negate<TestNegatePredicate, TestNegateResult>(testNegatePredicate);
result = <TestNegateResult>_(testNegatePredicate).negate().value();
result = <TestNegateResult>_(testNegatePredicate).negate<TestNegateResult>().value();

var initialize = _.once(function () { });
initialize();
initialize();
var returnedOnce = _.throttle(function (a: any) { return a * 5; }, 5);
returnedOnce(4);

var greetPartial = function (greeting: string, name: string) { return greeting + ' ' + name; };
var hi = <Function>_.partial(greetPartial, 'hi');
hi('moe');

var defaultsDeep = <Function>_.partialRight(_.merge, _.defaults);

var optionsPartialRight = {
    'variable': 'data',
    'imports': { 'jq': $ }
};

defaultsDeep(optionsPartialRight, _.templateSettings);

//_.restParam
var testRestParamFn = (a: string, b: string, c: number[]) => a + ' ' + b + ' ' + c.join(' ');
interface testRestParamFunc {
    (a: string, b: string, c: number[]): string;
}
interface testRestParamResult {
    (a: string, b: string, ...c: number[]): string;
}
result = <string>(_.restParam<testRestParamResult, testRestParamFunc>(testRestParamFn, 2))('a', 'b', 1, 2, 3);
result = <string>(_.restParam<testRestParamResult>(testRestParamFn, 2))('a', 'b', 1, 2, 3);
result = <string>(_(testRestParamFn).restParam<testRestParamResult>(2).value())('a', 'b', 1, 2, 3);

var throttled = _.throttle(function () { }, 100);
jQuery(window).on('scroll', throttled);

jQuery('.interactive').on('click', _.throttle(function () { }, 300000, {
    'trailing': false
}));

var returnedThrottled = _.throttle(function (a: any) { return a * 5; }, 5);
returnedThrottled(4);

var helloWrap = function (name: string) { return 'hello ' + name; };
var helloWrap2 = _.wrap(helloWrap, function (func) {
    return 'before, ' + func('moe') + ', after';
});
helloWrap2();

/********
 * Lang *
 ********/

// _.gt
result = <boolean>_.gt(1, 2);
result = <boolean>_(1).gt(2);
result = <boolean>_([]).gt(2);
result = <boolean>_({}).gt(2);

// _.gte
result = <boolean>_.gte(1, 2);
result = <boolean>_(1).gte(2);
result = <boolean>_([]).gte(2);
result = <boolean>_({}).gte(2);

// _.lt
result = <boolean>_.lt(1, 2);
result = <boolean>_(1).lt(2);
result = <boolean>_([]).lt(2);
result = <boolean>_({}).lt(2);

// _.lte
result = <boolean>_.lte(1, 2);
result = <boolean>_(1).lte(2);
result = <boolean>_([]).lte(2);
result = <boolean>_({}).lte(2);

// _.toPlainObject
result = <Object>_.toPlainObject();
result = <Object>_.toPlainObject(true);
result = <Object>_.toPlainObject(1);
result = <Object>_.toPlainObject('a');
result = <Object>_.toPlainObject([]);
result = <Object>_.toPlainObject({});
result = <Object>_(true).toPlainObject();
result = <Object>_(1).toPlainObject();
result = <Object>_('a').toPlainObject();
result = <Object>_([1]).toPlainObject();
result = <Object>_<string>([]).toPlainObject();
result = <Object>_({}).toPlainObject();

/**********
* Objects *
***********/
interface NameAge {
    name: string;
    age: number;
}
result = <NameAge>_.assign({ 'name': 'moe' }, { 'age': 40 });
result = <NameAge>_.assign({ 'name': 'moe' }, { 'age': 40 }, function (a, b) {
    return typeof a == 'undefined' ? b : a;
});

result = <_.LoDashObjectWrapper<NameAge>>_({ 'name': 'moe' }).assign({ 'age': 40 });
result = <_.LoDashObjectWrapper<NameAge>>_({ 'name': 'moe' }).assign({ 'age': 40 }, function (a, b) {
    return typeof a == 'undefined' ? b : a;
});

result = <NameAge>_.extend({ 'name': 'moe' }, { 'age': 40 });
result = <NameAge>_.extend({ 'name': 'moe' }, { 'age': 40 }, function (a, b) {
    return typeof a == 'undefined' ? b : a;
});

result = <_.LoDashObjectWrapper<NameAge>>_({ 'name': 'moe' }).extend({ 'age': 40 });
result = <_.LoDashObjectWrapper<NameAge>>_({ 'name': 'moe' }).extend({ 'age': 40 }, function (a, b) {
    return typeof a == 'undefined' ? b : a;
});

result = <IStoogesAge[]>_.clone(stoogesAges);
result = <IStoogesAge[]>_.clone(stoogesAges, true);
result = <any>_.clone(stoogesAges, true, function (value) {
    return _.isElement(value) ? value.cloneNode(false) : undefined;
});

result = <IStoogesAge[]>_.cloneDeep(stoogesAges);
result = <IStoogesAge[]>_.cloneDeep(stoogesAges, function (value) {
    return _.isElement(value) ? value.cloneNode(false) : undefined;
});

interface Food {
    name: string;
    type: string;
}
var foodDefaults = { 'name': 'apple' };
result = <Food>_.defaults(foodDefaults, { 'name': 'banana', 'type': 'fruit' });
result = <_.LoDashObjectWrapper<Food>>_(foodDefaults).defaults({ 'name': 'banana', 'type': 'fruit' });

//_.defaultsDeep
interface DefaultsDeepResult {
    user: {
        name: string;
        age: number;
    }
}
var TestDefaultsDeepObject = {'user': {'name': 'barney'}};
var TestDefaultsDeepSource = {'user': {'name': 'fred', 'age': 36}};
result = <DefaultsDeepResult>_.defaultsDeep(TestDefaultsDeepObject, TestDefaultsDeepSource);
result = <DefaultsDeepResult>_(TestDefaultsDeepObject).defaultsDeep<DefaultsDeepResult>(TestDefaultsDeepSource).value();

// _.findKey
module TestFindKey {
    let result: string;

    {
        let predicateFn: (value: any, key?: string, object?: {}) => boolean;

        result = _.findKey<{a: string;}>({a: ''});

        result = _.findKey<{a: string;}>({a: ''}, predicateFn);
        result = _.findKey<{a: string;}>({a: ''}, predicateFn, any);


        result = _.findKey<{a: string;}>({a: ''}, '');
        result = _.findKey<{a: string;}>({a: ''}, '', any);

        result = _.findKey<{a: number;}, {a: string;}>({a: ''}, {a: 42});

        result = _<{a: string;}>({a: ''}).findKey();

        result = _<{a: string;}>({a: ''}).findKey(predicateFn);
        result = _<{a: string;}>({a: ''}).findKey(predicateFn, any);


        result = _<{a: string;}>({a: ''}).findKey('');
        result = _<{a: string;}>({a: ''}).findKey('', any);

        result = _<{a: string;}>({a: ''}).findKey<{a: number;}>({a: 42});
    }

    {
        let predicateFn: (value: string, key?: string, collection?: _.Dictionary<string>) => boolean;

        result = _.findKey<string, {a: string;}>({a: ''}, predicateFn);
        result = _.findKey<string, {a: string;}>({a: ''}, predicateFn, any);

        result = _<{a: string;}>({a: ''}).findKey<string>(predicateFn);
        result = _<{a: string;}>({a: ''}).findKey<string>(predicateFn, any);
    }
}

result = <string>_.findLastKey({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, function (num) {
    return num % 2 == 1;
});

result = <Dog>_.forIn(new Dog('Dagny'), function (value, key) {
    console.log(key);
});

result = <_.LoDashObjectWrapper<Dog>>_(new Dog('Dagny')).forIn(function (value, key) {
    console.log(key);
});

result = <Dog>_.forInRight(new Dog('Dagny'), function (value, key) {
    console.log(key);
});

result = <_.LoDashObjectWrapper<Dog>>_(new Dog('Dagny')).forInRight(function (value, key) {
    console.log(key);
});

interface ZeroOne {
    0: string;
    1: string;
    one: string;
}

result = <ZeroOne>_.forOwn(<ZeroOne>{ '0': 'zero', '1': 'one', 'one': '2' }, function (num, key) {
    console.log(key);
});

result = <_.LoDashObjectWrapper<ZeroOne>>_({ '0': 'zero', '1': 'one', 'length': 2 }).forOwn(function (num, key) {
    console.log(key);
});

result = <any>_.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function (num, key) {
    console.log(key);
});

result = <_.LoDashObjectWrapper<ZeroOne>>_({ '0': 'zero', '1': 'one', 'length': 2 }).forOwnRight(function (num, key) {
    console.log(key);
});

result = <string[]>_.functions(_);
result = <string[]>_.methods(_);

result = <_.LoDashArrayWrapper<string>>_(_).functions();
result = <_.LoDashArrayWrapper<string>>_(_).methods();

// _.get
result = <number>_.get<number>({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c');
// → 3
result = <number>_.get<number>({ 'a': [{ 'b': { 'c': 3 } }] }, ['a', '0', 'b', 'c']);
// → 3
result = <string>_.get<string>({ 'a': [{ 'b': { 'c': 3 } }] }, 'a.b.c', 'default');
// → 'default'

result = <number>_({ 'a': [{ 'b': { 'c': 3 } }] }).get<number>('a[0].b.c');
// → 3
result = <number>_({ 'a': [{ 'b': { 'c': 3 } }] }).get<number>(['a', '0', 'b', 'c']);
// → 3
result = <string>_({ 'a': [{ 'b': { 'c': 3 } }] }).get<string>('a.b.c', 'default');
// → 'default'

result = <boolean>_.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');

interface FirstSecond {
    first: string;
    second: string;
}
result = <FirstSecond>_.invert({ 'first': 'moe', 'second': 'larry' });

(function (...args: any[]) { return <boolean>_.isArguments(arguments); })(1, 2, 3);

(function () { return <boolean>_.isArray(arguments); })();
result = <boolean>_.isArray([1, 2, 3]);

result = <boolean>_.isBoolean(null);

result = <boolean>_.isDate(new Date());

result = <boolean>_.isElement(document.body);

result = <boolean>_.isEmpty([1, 2, 3]);
result = <boolean>_.isEmpty({});
result = <boolean>_.isEmpty('');

// _.isEqual (alias: _.eq)
result = <boolean>_.isEqual(1, 1);
result = <boolean>_(1).isEqual(1);
result = <boolean>_.eq(1, 1);
result = <boolean>_(1).eq(1);

var testEqObject = { 'user': 'fred' };
var testEqOtherObject = { 'user': 'fred' };
result = <boolean>_.isEqual(testEqObject, testEqOtherObject);
result = <boolean>_(testEqObject).isEqual(testEqOtherObject);
result = <boolean>_.eq(testEqObject, testEqOtherObject);
result = <boolean>_(testEqObject).eq(testEqOtherObject);

var testEqArray = ['hello', 'goodbye'];
var testEqOtherArray = ['hi', 'goodbye'];
var testEqCustomizerFn = (value: any, other: any): boolean => {
    if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
        return true;
    }
};
result = <boolean>_.isEqual(testEqArray, testEqOtherArray, testEqCustomizerFn);
result = <boolean>_(testEqArray).isEqual(testEqOtherArray, testEqCustomizerFn);
result = <boolean>_.eq(testEqArray, testEqOtherArray, testEqCustomizerFn);
result = <boolean>_(testEqArray).eq(testEqOtherArray, testEqCustomizerFn);

result = <boolean>_.isFinite(-101);
result = <boolean>_.isFinite('10');
result = <boolean>_.isFinite(true);
result = <boolean>_.isFinite('');
result = <boolean>_.isFinite(Infinity);

result = <boolean>_.isFunction(_);

result = <boolean>_.isNaN(NaN);
result = <boolean>_.isNaN(new Number(NaN));
result = <boolean>_.isNaN(undefined);

result = <boolean>_.isNull(null);
result = <boolean>_.isNull(undefined);

result = <boolean>_.isNumber(8.4 * 5);

result = <boolean>_.isObject({});
result = <boolean>_.isObject([1, 2, 3]);
result = <boolean>_.isObject(1);

class Stooge {
    constructor(
        public name: string,
        public age: number
        ) { }
}

result = <boolean>_.isPlainObject(new Stooge('moe', 40));
result = <boolean>_.isPlainObject([1, 2, 3]);
result = <boolean>_.isPlainObject({ 'name': 'moe', 'age': 40 });

result = <boolean>_.isRegExp(/moe/);

result = <boolean>_.isString('moe');

result = <boolean>_.isUndefined(void 0);

result = <string[]>_.keys({ 'one': 1, 'two': 2, 'three': 3 });
result = <string[]>_({ 'one': 1, 'two': 2, 'three': 3 }).keys().value();

result = <string[]>_.keysIn({ 'one': 1, 'two': 2, 'three': 3 });
result = <string[]>_({ 'one': 1, 'two': 2, 'three': 3 }).keysIn().value();

var mergeNames = {
    'stooges': [
        { 'name': 'moe' },
        { 'name': 'larry' }
    ]
};

var mergeAges = {
    'stooges': [
        { 'age': 40 },
        { 'age': 50 }
    ]
};

result = <NameAge>_.merge(mergeNames, mergeAges);

var mergeFood = {
    'fruits': ['apple'],
    'vegetables': ['beet']
};

var mergeOtherFood: { [index: string]: string[] } = {
    'fruits': ['banana'],
    'vegetables': ['carrot']
};

interface FruitVeg {
    [index: string]: string[];
    fruits: string[];
    vegetables: string[]
};

result = <FruitVeg[]>_.merge(<FruitVeg>mergeFood, <FruitVeg>mergeOtherFood, function (a: any, b: any) {
    return _.isArray(a) ? a.concat(b) : undefined;
});

interface HasName {
    name: string;
}
result = <HasName>_.omit({ 'name': 'moe', 'age': 40 }, 'age');
result = <HasName>_.omit({ 'name': 'moe', 'age': 40 }, ['age']);
result = <HasName>_.omit({ 'name': 'moe', 'age': 40 }, function (value) {
    return typeof value == 'number';
});
result = <HasName>_({ 'name': 'moe', 'age': 40 }).omit('age').value();
result = <HasName>_({ 'name': 'moe', 'age': 40 }).omit(['age']).value();
result = <HasName>_({ 'name': 'moe', 'age': 40 }).omit(function (value) {
    return typeof value == 'number';
}).value();

result = <any[][]>_.pairs({ 'moe': 30, 'larry': 40 });
result = <any[][]>_({ 'moe': 30, 'larry': 40 }).pairs().value();

result = <HasName>_.pick({ 'name': 'moe', '_userid': 'moe1' }, 'name');
result = <HasName>_.pick({ 'name': 'moe', '_userid': 'moe1' }, ['name']);
result = <HasName>_.pick({ 'name': 'moe', '_userid': 'moe1' }, function (value, key) {
    return key.charAt(0) != '_';
});

// _.set
result = <{ a: { b: { c: number; }}[]}>_.set({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c', 4);
result = <{ a: { b: { c: number; }}[]}>_({ 'a': [{ 'b': { 'c': 3 } }] }).set('a[0].b.c', 4).value();

result = <number[]>_.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function (r: number[], num: number) {
    num *= num;
    if (num % 2) {
        return r.push(num) < 3;
    }
});
// → [1, 9, 25]

result = <{ a: number; b: number; c: number; }>_.transform(<{ [index: string]: number; }>{ 'a': 1, 'b': 2, 'c': 3 }, function (r: any, num: number, key: string) {
    r[key] = num * 3;
});

// _.values
class TestValues {
    public a = 1;
    public b = 2;
    public c: string;
}
TestValues.prototype.c = 'a';
result = <number[]>_.values<number>(new TestValues());
// → [1, 2] (iteration order is not guaranteed)
result = <number[]>_(new TestValues()).values<number>().value();
// → [1, 2] (iteration order is not guaranteed)

// _.valueIn
class TestValueIn {
    public a = 1;
    public b = 2;
    public c: number;
}
TestValueIn.prototype.c = 3;
result = <number[]>_.valuesIn<number>(new TestValueIn());
// → [1, 2, 3]
result = <number[]>_(new TestValueIn()).valuesIn<number>().value();
// → [1, 2, 3]

/**********
* Utilities *
***********/

result = <string>_.escape('Moe, Larry & Curly');

result = <{ name: string }>_.identity({ 'name': 'moe' });

_.mixin({
    'capitalize': function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
});

var lodash = <typeof _>_.noConflict();

result = <number>_.parseInt('08');

result = <number>_.random(0, 5);
result = <number>_.random(5);
result = <number>_.random(5, true);
result = <number>_.random(1.2, 5.2);
result = <number>_.random(0, 5, true);

var object = {
    'cheese': 'crumpets',
    'stuff': function () {
        return 'nonsense';
    }
};

result = <string>_.result(object, 'cheese');
result = <string>_.result(object, 'stuff');

var tempObject = {};
result = <typeof _>_.runInContext(tempObject);

result = <_.TemplateExecutor>_.template('hello <%= name %>');
result = <string>_.template('<b><%- value %></b>', { 'value': '<script>' });

var listTemplate = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
result = <string>_.template(listTemplate, { 'people': ['moe', 'larry'] });
result = <string>_.template('hello ${ name }', { 'name': 'curly' });
result = <string>_.template('<% print("hello " + name); %>!', { 'name': 'larry' });

var listTemplate = '<% $.each(people, function(name) { %><li><%- name %></li><% }); %>';
result = <string>_.template(listTemplate, { 'people': ['moe', 'larry'] }, { 'imports': { '$': jQuery } });
result = <_.TemplateExecutor>_.template('hello <%= name %>', null, /*sourceURL:*/ '/basic/greeting.jst');

result = <_.TemplateExecutor>_.template('hi <%= data.name %>!', null, { 'variable': 'data' });
result = <string>(<_.TemplateExecutor>result).source;

class Mage {
    public castSpell(n: number) {
        return n;
    }

    public cast(n: number) {
        return n;
    }
}

var mage = new Mage();
result = _.times(3, <() => number>_.partial(_.random, 1, 6));
result = _.times(3, function (n: number) { mage.castSpell(n); });
result = _.times(3, function (n: number) { this.cast(n); }, mage);

result = <string>_.unescape('Moe, Larry &amp; Curly');

result = <string>_.uniqueId('contact_');
result = <string>_.uniqueId();

/*********
* String
*********/

result = <string>_.camelCase('Foo Bar');
result = <string>_.capitalize('fred');
result = <string>_.deburr('déjà vu');
result = <boolean>_.endsWith('abc', 'c');
result = <string>_.escape('fred, barney, & pebbles');
result = <string>_.escapeRegExp('[lodash](https://lodash.com/)');
result = <string>_.kebabCase('Foo Bar');
result = <string>_.pad('abc', 8);
result = <string>_.pad('abc', 8, '_-');
result = <string>_.padLeft('abc', 6);
result = <string>_.padLeft('abc', 6, '_-');
result = <string>_.padRight('abc', 6);
result = <string>_.padRight('abc', 6, '_-');
result = <string>_.repeat('*', 3);
result = <string>_.snakeCase('Foo Bar');
result = <string>_.startCase('--foo-bar');
result = <boolean>_.startsWith('abc', 'a');
result = <string>_.trim('  abc  ');
result = <string>_.trim('-_-abc-_-', '_-');
result = <string>_.trimLeft('  abc  ');
result = <string>_.trimLeft('-_-abc-_-', '_-');
result = <string>_.trimRight('  abc  ');
result = <string>_.trimRight('-_-abc-_-', '_-');
result = <string>_.trunc('hi-diddly-ho there, neighborino');
result = <string>_.trunc('hi-diddly-ho there, neighborino', 24);
result = <string>_.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': ' ' });
result = <string>_.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': /,? +/ });
result = <string>_.trunc('hi-diddly-ho there, neighborino', { 'omission': ' […]' });
result = <string[]>_.words('fred, barney, & pebbles');
result = <string[]>_.words('fred, barney, & pebbles', /[^, ]+/g);

/**********
* Utilities *
***********/

// _.constant
result = <() => number>_.constant<number>(1);
result = <() => string>_.constant<string>('a');
result = <() => boolean>_.constant<boolean>(true);
result = <() => any[]>_.constant<any[]>([]);
result = <() => {}>_.constant<{}>({});
result = <() => number>_(1).constant<number>();
result = <() => string>_('a').constant<string>();
result = <() => boolean>_(true).constant<boolean>();
result = <() => any[]>_(['a']).constant<any[]>();
result = <() => {}>_({}).constant<{}>();

// _.identity
{
    let testIdentityValue: TResult;
    let result: TResult;
    result = _.identity<TResult>(testIdentityValue);
    result = _(testIdentityValue).identity();
}
{
    let result: number;
    result = _(42).identity();
}
{
    let result: boolean[];
    result = _<boolean>([]).identity();
}

// _.iteratee
{
    let result: (...args: any[]) => TResult;
    result = _.iteratee<TResult>(Function);
    result = _.iteratee<TResult>(Function, any);
    result = _(Function).iteratee<TResult>().value();
    result = _(Function).iteratee<TResult>(any).value();
}
{
    let result: (object: any) => TResult;
    result = _.iteratee<TResult>('');
    result = _.iteratee<TResult>('', any);
    result = _('').iteratee<TResult>().value();
    result = _('').iteratee<TResult>(any).value();
}
{
    let result: (object: any) => boolean;
    result = _.iteratee({});
    result = _.iteratee({}, any);
    result = _({}).iteratee().value();
    result = _({}).iteratee(any).value();
}

// _.matches
module TestMatches {
    let source: TResult;

    {
        let result: (value: any) => boolean;
        result = _.matches<TResult>(source);
        result = _(source).matches().value();
    }

    {
        let result: (value: TResult) => boolean;
        result = _.matches<TResult, TResult>(source);
        result = _(source).matches<TResult>().value();
    }
}

// _.matchesProperty
module TestMatches {
    let path: {toString(): string;}|{toString(): string;}[];
    let source: TResult;

    {
        let result: (value: any) => boolean;
        result = _.matchesProperty<TResult>(path, source);
        result = _(path).matchesProperty<TResult>(source).value();
    }

    {
        let result: (value: TResult) => boolean;
        result = _.matchesProperty<TResult, TResult>(path, source);
        result = _(path).matchesProperty<TResult, TResult>(source).value();
    }
}

// _.method
class TestMethod {
    a = {
        b: (a1: number, a2: number) => a1 + a2
    }
}
var TestMethodObject = new TestMethod();
result = <number>(_.method<number>('a.b', 1, 2))(TestMethodObject);
result = <number>(_.method<number>(['a', 'b'], 1, 2))(TestMethodObject);
result = <number>(_('a.b').method<number>(1, 2).value())(TestMethodObject);
result = <number>(_(['a', 'b']).method<number>(1, 2).value())(TestMethodObject);

// _.methodOf
class TestMethodOf {
    a = [
        (a1: number, a2: number) => a1 + a2
    ];
}
var TestMethodOfObject = new TestMethodOf();
result = <number>(_.methodOf<number>(TestMethodOfObject, 1, 2))('a[0]');
result = <number>(_.methodOf<number>(TestMethodOfObject, 1, 2))(['a', '0']);
result = <number>(_(TestMethodOfObject).methodOf<number>(1, 2).value())('a[0]');
result = <number>(_(TestMethodOfObject).methodOf<number>(1, 2).value())(['a', '0']);

result = <string>_.VERSION;
result = <_.Support>_.support;
result = <_.TemplateSettings>_.templateSettings;
