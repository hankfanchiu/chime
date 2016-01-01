# Schema Information

## users
column name     | data type  | details
----------------|------------|-----------------------
id              | integer    | not null, primary key
username        | string     | not null, indexed, unique
slug            | string     | not null, indexed
email           | string     | not null
description     | text       |
avatar          | attachment |
password_digest | string     | not null
session_token   | string     | not null, indexed, unique

## tracks
column name | data type  | details
------------|------------|-----------------------
id          | integer    | not null, primary key
user_id     | integer    | not null, foregin key (references users), indexed
title       | string     | not null
slug        | string     | not null, indexed
track_url   | string     | not null
description | string     |
img         | attachment |

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), index
title       | string    | not null, indexed
slug        | string    | not null, indexed
description | string    |

## playlistings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks), index
playlist_id | integer   | not null, foreign key (references playlists), index
