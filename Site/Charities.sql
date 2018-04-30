create table Charities(
charityID int(1) not null auto_increment,
Charityname varchar(225) not null,
Website varchar(225) not null,
primary key (charityID)
)  ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=5;
insert into Charities (charityID, Charityname, Website) values
(1, '1% for the planet', 'https://www.guidestar.org/profile/91-2151932'),
(2, '2Know the Earth', 'https://www.guidestar.org/profile/51-0444138'),
(3, '1 Green Planet', 'https://www.guidestar.org/profile/27-1030377'),
(4, '4 R Environment', 'https://www.guidestar.org/profile/68-0371579'),
(5, '3R Education', 'https://www.guidestar.org/profile/35-2313870');