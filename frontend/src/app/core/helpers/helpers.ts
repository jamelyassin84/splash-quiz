export function empty(value: any): boolean {
    if (
        !value ||
        value === '' ||
        value === null ||
        value === 'undefined' ||
        value === 'null'
    ) {
        return true
    }

    return false
}
