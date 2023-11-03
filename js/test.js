function cleanWateredPhone(phone) {
    const phoneArr = phone.split('');
    const repairedPhone = phoneArr.filter(element => {
        return element !== 'water';
    })
    return repairedPhone;
}