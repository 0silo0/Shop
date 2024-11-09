
create table product (
    product_id serial primary key,
    product_name varchar(255),
    description varchar,
    category_name varchar(100),
    image_url varchar,
    new_price varchar,
    old_price varchar,
    available bool
)

ALTER TABLE product
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;