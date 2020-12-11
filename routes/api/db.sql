CREATE DATABASE Twitter;


CREATE TABLE tweet( USER_id,
                    NOT NULL message,
                             NOT NULL);


CREATE TABLE USER( user_id serial NOT NULL,
                                  user_name VARCHAR NOT NULL,
                                                    user_handler VARCHAR NOT NULL,
                                                                         user_password VARCHAR NOT NULL)