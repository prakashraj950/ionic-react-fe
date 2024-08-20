export const scrollIntoViewError = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView()
    }
}