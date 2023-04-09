import { errorToast } from "./components/Toast"


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
export function hasFormValidDetails(userDetails){
    if(containsEmptyValues(userDetails)){
        errorToast(`All Fields are required`)
        return false
    }
    if(isPasswordStrong(userDetails.password)){
        errorToast("Password Length should be atleast 8 character")
        return false;
    }
    else if(!isEmailValid(userDetails.email)){
        errorToast("Not a valid Email")
        return false;
    }
    return true;
}
export function isEmailValid(email){
    return email.includes('@')
}
export function isPasswordStrong(password){
    return password.length<8
}
export function containsEmptyValues(items){
    if(!Array.isArray(items)){
        const keys = Object.keys(items)
        for(let i in keys)
            if(items[keys[i]].length === 0 || items[keys[i]] === null)
                return true
        return false  
    }
    else{
        for(let i in items)
            if(items[i].length === 0 || items[i] === null)
                return true
        return false  
    }
      
}