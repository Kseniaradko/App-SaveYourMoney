const operations = {
    INCOME: {
        label: 'Доход',
        action: {
            ADD: 'Добавление',
            EDIT: 'Редактирование',
            DELETE: 'Удаление'
        },
        ADD: 'Доход на сумму'
    },
    EXPENSE: {
        label: 'Расход',
        action: {
            ADD: 'Добавление',
            EDIT: 'Редактирование',
            DELETE: 'Удаление'
        },
        ADD: 'Расход на сумму'
    },
    ACCOUNT: {
        label: 'Счет',
        action: {
            ADD: 'Добавление',
            EDIT: 'Редактирование',
            DELETE: 'Удаление'
        },
        ADD: 'Добавлен счет '
    }
}

export const displayType = (data) => {
    return `${operations[data.type].label}`
}

export const displayAction = (data) => {
    return `${operations[data.type].action[data.action]}`
}

export const displayDataForOperations = (data) => {
    if (data.type === 'ACCOUNT' && data.action === 'ADD') return `${operations[data.type][data.action]} - ${data.accountName}`
    if (data.type === 'EXPENSE' && data.action === 'ADD') return `${operations[data.type][data.action]} ${data.sum}р. (${data.category}) списан со счета ${data.accountName}`
    if (data.type === 'INCOME' && data.action === 'ADD') return `${operations[data.type][data.action]} ${data.sum}р. (${data.category}) добавлен на счет ${data.accountName}`
}