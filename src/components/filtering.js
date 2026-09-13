
export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            // Получаем родительский элемент кнопки
            const parent = action.parentElement;

            // Находим input в родительском элементе
            const input = parent.querySelector('input');

            if (input) {
                // Сбрасываем значение input
                input.value = '';

                // Получаем имя поля из data-атрибута кнопки
                const field = action.dataset.field;

                // Сбрасываем соответствующее поле в state
                state[field] = '';
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        //return data.filter(row => compare(row, state));
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
} 
    
