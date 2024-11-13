export const calculateAge = (dob) => {
    const dobDate = new Date(dob)
    const currentDate =  new Date()
    const timeDifference = currentDate.getTime() - dobDate.getTime()

    return Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
}

export const formatDate = (date) => {
    const time = new Date(date)
    return time.getFullYear() + '-' +
    ('0' + (time.getMonth() + 1)).slice(-2) + '-' +
    ('0' + time.getDate()).slice(-2) + ' ' +
    ('0' + time.getHours()).slice(-2) + ':' +
    ('0' + time.getMinutes()).slice(-2) + ':' +
    ('0' + time.getSeconds()).slice(-2);
}