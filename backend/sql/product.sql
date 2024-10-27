
create table product (
    product_id serial primary key,
    product_name varchar(255),
    description varchar,
    category_name varchar(100),
    image_url varchar,
    new_price varchar,
    old_price varchar
)