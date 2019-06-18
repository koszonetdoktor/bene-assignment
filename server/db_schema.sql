CREATE TABLE users(id int, name character varying(50), password character varying(50));
INSERT INTO users(id, name, password) VALUES (1, 'admin', 'password');
create table geoname (
         geonameid       int,
         name            varchar(200),
         asciiname        varchar(200),
         alternatenames  varchar(6000),
         latitude        float,
         longitude       float,
         fclass  char(1),
         fcode   varchar(10),
         country varchar(2),
         cc2 varchar(60),
         admin1  varchar(20),
         admin2  varchar(80),
         admin3  varchar(20),
         admin4  varchar(20),
         population      bigint,
         elevation       int,
         gtopo30         int,
         timezone varchar(40),
         moddate         date
);
copy geoname (geonameid,name,asciiname,alternatenames,latitude,longitude,fclass,fcode,country,cc2, admin1,admin2,admin3,admin4,population,elevation,gtopo30,timezone,moddate) from 'cities15000.txt' null as '';
CREATE TABLE users_cities(user_name character varying(50), city_id int);
