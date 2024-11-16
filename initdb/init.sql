CREATE TABLE userinformation ( id serial PRIMARY KEY, password VARCHAR(20) NOT NULL, company VARCHAR(20), professionalrole VARCHAR(20), firstname VARCHAR(20) NOT NULL, lastname VARCHAR(20) NOT NULL, phonenumber VARCHAR(20), email VARCHAR(50) UNIQUE NOT NULL, webbaddress VARCHAR(50), area VARCHAR(20));

INSERT INTO userinformation (password, company, professionalrole, firstname, lastname, phonenumber, email, webbaddress, area)
VALUES ('password', 'Snickarn AB', 'Snickare', 'Emma', 'Dahl', '0702889389389', 'emma@mail.com', 'https://vecka.nu/', 'Lerum');

INSERT INTO userinformation (password, company, professionalrole, firstname, lastname, phonenumber, email, webbaddress, area)
VALUES ('password', 'Snickers AB', 'Snickare', 'Tomas', 'Sten', '07028893837', 'Tomas@mail.com', 'https://vecka.nu/', 'Stockholm');

INSERT INTO userinformation (password, company, professionalrole, firstname, lastname, phonenumber, email, webbaddress, area)
VALUES ('password', 'Snickeriet AB', 'Snickare', 'Sten', 'Stark', '07024959504', 'Sten@mail.com', 'https://vecka.nu/', 'Stockholm');

INSERT INTO userinformation (password, company, professionalrole, firstname, lastname, phonenumber, email, webbaddress, area)
VALUES ('password', 'Bygg AB', 'Snickare', 'Hilda', 'Hurtig', '0703908532879504', 'Hilda@mail.com', 'https://vecka.nu/', 'Stockholm');

INSERT INTO userinformation (password, company, professionalrole, firstname, lastname, phonenumber, email, webbaddress, area)
VALUES ('password', 'Bygget AB', 'Snickare', 'Docker', 'Name', '070390804', 'Docker@mail.com', 'https://vecka.nu/', 'Stockholm');