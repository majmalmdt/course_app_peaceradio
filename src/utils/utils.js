export function zipArrays(arr1, arr2) {
    return typeof arr1 === "object" ? [] : arr1.map((element, index) => [element, arr2[index]]);
}

export const currentDateFormat = () => {
    function padNumber(num) {
        return num.toString().padStart(2, '0');
    }
    const now = new Date()
    return `${now.getFullYear()}-${padNumber(now.getMonth() + 1)}-${padNumber(now.getDate())}T${padNumber(now.getHours())}:${padNumber(now.getMinutes())}`;
}
