CREATE TABLE orders (
    "order_id" serial PRIMARY KEY,        -- ID заказа
    "user_id" INT NOT NULL,                            -- ID пользователя, который создал заказ
    "lastName" VARCHAR(255) NOT NULL,                  -- Фамилия заказчика
    "firstName" VARCHAR(255) NOT NULL,                 -- Имя заказчика
    "middleName" VARCHAR(255),                         -- Отчество заказчика
    "email" VARCHAR(255) NOT NULL,                     -- Электронная почта
    "phone" VARCHAR(50) NOT NULL,                      -- Телефон
    "address" VARCHAR(255) NOT NULL,                   -- Адрес
    "city" VARCHAR(255) NOT NULL,                      -- Город
    "postalCode" VARCHAR(20) NOT NULL,                 -- Почтовый индекс
    "country" VARCHAR(255) NOT NULL,                   -- Страна
    "deliveryMethod" VARCHAR(255) NOT NULL,            -- Метод доставки
    "paymentMethod" VARCHAR(255) NOT NULL,             -- Метод оплаты
    "notes" TEXT,                                      -- Дополнительные заметки
    "status" VARCHAR(50) DEFAULT 'в обработке',       -- Статус заказа (по умолчанию 'в обработке')
    "total" FLOAT NOT NULL,                            -- Общая сумма заказа
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Время создания
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Время последнего обновления
);
