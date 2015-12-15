# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## followings
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
follower_id  | integer   | not null, foreign key (references users), indexed
followee_id  | integer   | not null, foreign key (references users), indexed, unique [follower_id]

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
artist_id   | integer   | not null, foregin key (references users), indexed
title       | string    | not null
track_url   | string    | not null
img_url     | string    | not null
description | string    | 

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | string    |
artist_id   | integer   | not null, foreign key (references users), index

## playlistings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks), index
playlist_id | integer   | not null, foreign key (references playlists), index

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
text        | text      | not null
track_id    | integer   | not null, foreign key (references tracks), index
artist_id   | integer   | not null, foreign key (references users), index
submitted_at| date/time |

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
track_id    | integer   | not null, foreign key (references tracks), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## likes
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
user_id      | integer   | not null, foreign key (references users)
track_id     | integer   | not null, foreign key (references tracks)
