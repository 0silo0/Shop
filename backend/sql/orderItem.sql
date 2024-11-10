CREATE TABLE "orderItems" (
    "orderItem_id" serial PRIMARY KEY,     -- ID позиции заказа
    "order_id" INT NOT NULL,                           -- ID заказа, к которому принадлежит товар
    "product_id" INT NOT NULL,                         -- ID товара
    "quantity" INT NOT NULL,                           -- Количество товара
    "price" FLOAT NOT NULL,                            -- Цена товара
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Время создания
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Время последнего обновления
    FOREIGN KEY (order_id) REFERENCES orders(order_id), -- Внешний ключ для связи с заказом
    FOREIGN KEY (product_id) REFERENCES product(product_id) -- Внешний ключ для связи с продуктом
);
