create table users(
userID int(1) not null auto_increment,
username varchar(40) not null,
password varchar(30) not null,
primary key (userID)
)  ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=5;
insert into users (userID, username, password) values
(1,'nergigante@gmailcom','Omae'),
(2,'thelegend27@hotmail.com', 'Wa'),
(3,'nanitf@gmail.com', 'Mo'),
(4,'iliveformemes123@gmail.com', 'Shinderu'),
(5,'omaewamoshinderu@gmail.com', 'NANI??');