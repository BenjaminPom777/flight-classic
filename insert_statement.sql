START TRANSACTION;

-- Inserting dummy data into `countries`
INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'United States'),
(2, 'Canada'),
(3, 'Mexico'),
(4, 'Brazil'),
(5, 'United Kingdom'),
(6, 'Germany'),
(7, 'France'),
(8, 'Italy'),
(9, 'Spain'),
(10, 'Australia');

-- Inserting dummy data into `administrators`
INSERT INTO `administrators` (`first_name`, `last_name`, `user_name`, `password`) VALUES
('John', 'Doe', 'admin_john', 'password123'),
('Jane', 'Smith', 'admin_jane', 'password456'),
('Sam', 'Brown', 'admin_sam', 'password789'),
('Lisa', 'Taylor', 'admin_lisa', 'password321'),
('Mark', 'Wilson', 'admin_mark', 'password654'),
('Sara', 'Davis', 'admin_sara', 'password987'),
('Paul', 'Clark', 'admin_paul', 'password000'),
('Nina', 'Lewis', 'admin_nina', 'password111'),
('Luke', 'Walker', 'admin_luke', 'password222'),
('Emma', 'Harris', 'admin_emma', 'password333');

-- Inserting dummy data into `airline_companies`
INSERT INTO `airline_companies` (`name`, `country_id`, `user_name`, `password`) VALUES
('American Airlines', 1, 'aa_user', 'aa_pass'),
('Air Canada', 2, 'ac_user', 'ac_pass'),
('Aeromexico', 3, 'am_user', 'am_pass'),
('LATAM Airlines', 4, 'latam_user', 'latam_pass'),
('British Airways', 5, 'ba_user', 'ba_pass'),
('Lufthansa', 6, 'lh_user', 'lh_pass'),
('Air France', 7, 'af_user', 'af_pass'),
('Alitalia', 8, 'al_user', 'al_pass'),
('Iberia', 9, 'ib_user', 'ib_pass'),
('Qantas', 10, 'qf_user', 'qf_pass');

-- Inserting dummy data into `customers`
INSERT INTO `customers` (`first_name`, `last_name`, `address`, `phone_no`, `credit_card_no`, `user_name`, `password`) VALUES
('Alice', 'Johnson', '123 Maple St', '123-456-7890', '4111111111111111', 'alice_j', 'alice_pass'),
('Bob', 'Williams', '456 Oak St', '987-654-3210', '4222222222222222', 'bob_w', 'bob_pass'),
('Charlie', 'Brown', '789 Pine St', '321-654-9870', '4333333333333333', 'charlie_b', 'charlie_pass'),
('Diana', 'Ross', '101 Birch St', '654-321-0987', '4444444444444444', 'diana_r', 'diana_pass'),
('Evan', 'Stone', '202 Cedar St', '987-123-4567', '4555555555555555', 'evan_s', 'evan_pass'),
('Fiona', 'White', '303 Elm St', '789-456-1230', '4666666666666666', 'fiona_w', 'fiona_pass'),
('George', 'Black', '404 Fir St', '456-789-0123', '4777777777777777', 'george_b', 'george_pass'),
('Holly', 'Green', '505 Oak St', '123-789-4560', '4888888888888888', 'holly_g', 'holly_pass'),
('Ian', 'Blue', '606 Pine St', '111-222-3333', '4999999999999999', 'ian_b', 'ian_pass'),
('Jack', 'Grey', '707 Maple St', '321-987-6540', '4000000000000000', 'jack_g', 'jack_pass');

-- Inserting dummy data into `flights`
INSERT INTO `flights` (`airline_company_id`, `origin_country_id`, `destination_country_id`, `departure_time`, `landing_time`, `remaining_tickets`) VALUES
(1, 1, 2, '2024-06-01 08:00:00', '2024-06-01 12:00:00', 100),
(2, 2, 1, '2024-06-02 09:00:00', '2024-06-02 13:00:00', 150),
(3, 3, 1, '2024-06-03 10:00:00', '2024-06-03 14:00:00', 200),
(4, 4, 5, '2024-06-04 11:00:00', '2024-06-04 15:00:00', 80),
(5, 5, 6, '2024-06-05 12:00:00', '2024-06-05 16:00:00', 120),
(6, 6, 7, '2024-06-06 13:00:00', '2024-06-06 17:00:00', 140),
(7, 7, 8, '2024-06-07 14:00:00', '2024-06-07 18:00:00', 160),
(8, 8, 9, '2024-06-08 15:00:00', '2024-06-08 19:00:00', 180),
(9, 9, 10, '2024-06-09 16:00:00', '2024-06-09 20:00:00', 200),
(10, 10, 1, '2024-06-10 17:00:00', '2024-06-10 21:00:00', 220);

-- Inserting dummy data into `tickets`
INSERT INTO `tickets` (`flight_id`, `customer_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

COMMIT;
