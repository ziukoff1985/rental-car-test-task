// Функція для форматування даних форми перед відправкою на сервер
// Використовується для перетворення дати у формат YYYY-MM-DD
export const formatFormData = values => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    // Обробка дати, якщо потрібно
    if (key === 'bookingDate' && value) {
      acc[key] = value.toISOString().split('T')[0];
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};
