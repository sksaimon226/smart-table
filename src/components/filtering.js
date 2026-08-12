import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
        .forEach((elementName) => {                        // Перебираем по именам
            elements[elementName].append(                    // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                    .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');
                        option.value = name; // Устанавливаем значение
                        option.textContent = name; // Устанавливаем текст
                        return option;
                    })
            )
        })

    return (data, state, action) => {
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
        return data.filter(row => compare(row, state));
    }
}