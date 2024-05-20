START TRANSACTION;

-- Inserting dummy data into `countries`
INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'United States'),
(2, 'Canada'),
(3, 'Mexico');

-- Inserting dummy data into `administrators`
INSERT INTO `administrators` (`first_name`, `last_name`, `user_name`, `password`) VALUES
('John', 'Doe', 'admin_john', 'password123'),
('Jane', 'Smith', 'admin_jane', 'password456');

-- Inserting dummy data into `airline_companies`
INSERT INTO `airline_companies` (`name`, `country_id`, `user_name`, `password`) VALUES
('American Airlines', 1, 'aa_user', 'aa_pass'),
('Air Canada', 2, 'ac_user', 'ac_pass'),
('Aeromexico', 3, 'am_user', 'am_pass');

-- Inserting dummy data into `customers`
INSERT INTO `customers` (`first_name`, `last_name`, `address`, `phone_no`, `credit_card_no`, `user_name`, `password`) VALUES
('Alice', 'Johnson', '123 Maple St', '123-456-7890', '4111111111111111', 'alice_j', 'alice_pass'),
('Bob', 'Williams', '456 Oak St', '987-654-3210', '4222222222222222', 'bob_w', 'bob_pass');

-- Inserting dummy data into `flights`
INSERT INTO `flights` (`airline_company_id`, `origin_country_id`, `destination_country_id`, `departure_time`, `landing_time`, `remaining_tickets`) VALUES
(1, 1, 2, '2024-06-01 08:00:00', '2024-06-01 12:00:00', 100),
(2, 2, 1, '2024-06-02 09:00:00', '2024-06-02 13:00:00', 150),
(3, 3, 1, '2024-06-03 10:00:00', '2024-06-03 14:00:00', 200);

-- Inserting dummy data into `tickets`
INSERT INTO `tickets` (`flight_id`, `customer_id`) VALUES
(1, 1),
(2, 2),
(3, 1);

COMMIT;
