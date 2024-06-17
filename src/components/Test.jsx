import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  // Состояние для хранения полученных данных
  const [data, setData] = useState(null);
  // Состояние для отслеживания состояния загрузки
  const [loading, setLoading] = useState(true);
  // Состояние для отслеживания ошибки
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для выполнения запроса
    const fetchData = async () => {
      try {
        // URL, куда отправляем запрос
        const apiUrl = 'http://192.168.230.90:8182/api/get/control_points';
        // Выполняем GET-запрос с использованием Fetch API
        const response = await fetch(apiUrl);

        // Обрабатываем ответ сервера
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        // Распаковываем JSON из ответа
        const result = await response.json();

        // Обновляем состояние с полученными данными
        setData(result);
      } catch (error) {
        // Обрабатываем ошибку
        setError(error.message);
      } finally {
        // Устанавливаем состояние загрузки в false, т.к. запрос завершен
        setLoading(false);
      }
    };

    // Вызываем функцию для выполнения запроса
    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект будет выполнен только один раз при монтировании компонента

  // Отображаем состояние загрузки
  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  // Отображаем ошибку, если она есть
  if (error) {
    return <p>Произошла ошибка: {error}</p>;
  }

  // Отображаем данные
  return (
    <div>
      <h1>Данные:</h1>
      <pre>{JSON.stringify(data.data[0].X_coordinate, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
