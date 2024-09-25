interface Item {
    id: string | number;
}

const arrayToObject = (array: Item[]): Record<string | number, Item> => array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
}, {} as Record<string | number, Item>);

const objectToArray = (obj: Record<string | number, Item>): Item[] => Object.keys(obj).map((key) => obj[key]);

export default {
    arrayToObject,
    objectToArray
};