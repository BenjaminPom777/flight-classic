select flights.*, origin_countries.name as origin_country_name,  destination_countries.name as destination_country_name  from flights
join airline_companies
on flights.airline_company_id = airline_companies.id
join countries as origin_countries
on flights.destination_country_id = origin_countries.id
join countries as destination_countries
on flights.origin_country_id = destination_countries.id