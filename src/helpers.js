export function findAndUpdate(key,keyToBeFound,updateToBePerformed,items){
    const new_list = []
    for(let i in items)
        if(items[i][key] === keyToBeFound)
            new_list.push(updateToBePerformed)
        else
            new_list.push(items[i])
    return new_list
}
export function findAndRemove(key,keyToBeFound,items){
    const new_list = []
    for(let i in items)
        if(items[i][key] !== keyToBeFound)
            new_list.push(items[i])
    return new_list
}
export function findAndReplace(key,keyToBeFound,replaceWith,items){
    const new_list = []
    for(let i in items)
        if(items[i][key] !== keyToBeFound)
            new_list.push(items[i])
        else
            new_list.push({...items[i],...replaceWith})
    return new_list
}