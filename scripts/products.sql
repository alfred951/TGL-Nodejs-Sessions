DROP TABLE IF EXISTS "PRODUCTS";

CREATE TABLE "PRODUCTS"(
    id serial primary key NOT NULL,
    name character varying(20) unique,
    price integer,
    currency character varying(3),
    description character varying(200)
);

CREATE TABLE "USERS"(
    id serial primary key NOT NULL,
    username character varying(20) unique,
    password character varying(20)
);

INSERT INTO "PRODUCTS"(NAME, PRICE, CURRENCY, DESCRIPTION)
VALUES
    ('Producto 1', 50000, 'COP', 'Es el producto 1'),
    ('Producto 2', 84000, 'COP', 'Es el producto 2'),
    ('Producto 3', 98000, 'COP', 'Es el producto 3'),
    ('Producto 4', 20000, 'COP', 'Es el producto 4'),
    ('Producto 5', 56000, 'COP', 'Es el producto 5'),
    ('Producto 6', 48000, 'COP', 'Es el producto 6');

INSERT INTO "USERS"(USERNAME, PASSWORD)
VALUES
    ('User1', 'Password1' ),
    ('User2', 'Password2' );

SELECT * FROM "PRODUCTS"