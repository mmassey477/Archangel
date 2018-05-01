create table user(
id int(10) unsigned not null auto_increment,
username varchar(255) not null,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
salt varchar(255) not null,
encrypted_password varchar(255) not null,
primary key (id)
)  ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
