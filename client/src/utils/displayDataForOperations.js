const operations = {
    INCOME: {
        label: 'Доход',
        action: {
            ADD: 'Добавление',
            EDIT: 'Редактирование',
            DELETE: 'Удаление'
        }
    },
    EXPENSE: {
        label: 'Расход',
        action: {
            ADD: 'Добавление',
            EDIT: 'Редактирование',
            DELETE: 'Удаление'
        }
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

export const displayDetailsForOperations = (data) => {
    if (data.type === 'ACCOUNT') {
        if (data.action === 'ADD') return `${operations[data.type][data.action]} - ${data.accountName}. Начальная сумма на счету: ${data.sum}р.`
        if (data.action === 'EDIT') return `Счет был изменен. Текущие данные: название счета - ${data.accountName}, сумма - ${data.sum}`
        if (data.action === 'DELETE') return `Счет ${data.accountName} удален`
    }
    if (data.type === 'INCOME') {
        if (data.action === 'ADD') return `${operations[data.type].label} на сумму ${data.sum}р. (${data.category || 'категория была удалена'}) добавлен на счет ${data.accountName}`
        if (data.action === 'EDIT') return `Доход был изменен. Текущие данные: категория - ${data.category || 'категория была удалена'}, счет - ${data.accountName}, сумма - ${data.sum}`
        if (data.action === 'DELETE') {
            if (data.accountName) return `${operations[data.type].label} на сумму ${data.sum}р. (${data.category || 'категория была удалена'}) удален со счета ${data.accountName}`
            return `${operations[data.type].label} ${data.sum}р. (${data.category || 'категория была удалена'}) удален с ранее удаленного счета`
        }
    }
    if (data.type === 'EXPENSE') {
        if (data.action === 'ADD') return `${operations[data.type].label} на сумму ${data.sum}р. (${data.category || 'категория была удалена'}) списан со счета ${data.accountName}`
        if (data.action === 'EDIT') return `Расход был изменен. Текущие данные: категория - ${data.category || 'категория была удалена'}, счет - ${data.accountName}, сумма - ${data.sum}`
        if (data.action === 'DELETE') {
            if (data.accountName) return `${operations[data.type].label} на сумму ${data.sum}р (${data.category || 'категория была удалена'}). удален со счета ${data.accountName}`
            return `${operations[data.type].label} ${data.sum}р. (${data.category || 'категория была удалена'}) удален с ранее удаленного счета`
        }
    }
}