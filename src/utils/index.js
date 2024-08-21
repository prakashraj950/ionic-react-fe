export const scrollIntoViewError = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView()
    }
}

export const getLastKey = (obj) => {
    const keys = Object.keys(obj);
    return keys[keys.length - 1];
};