const displayDate = (data) => {
    const date = new Date(data)
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

export default displayDate