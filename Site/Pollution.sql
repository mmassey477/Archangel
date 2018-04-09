create table Pollution(
countryID int(1) not null auto_increment,
Country varchar(40) not null,
Coal varchar(4) not null,
Oil varchar(4) not null,
Gas varchar(4) not null,
primary key (countryID)
)  ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=5;
insert into Pollution (countryID, Country, Coal, Oil, Gas) values
(1,'China', '49%', '12%', '13%'),
(2,'Russia', '33%', '28%', '14%'),
(3,'United States', '25%', '26%', '27%'),
(4,'United Kingdoms', '7%', '26%', '22%'),
(5,'France', '12%', '23%', '16%');