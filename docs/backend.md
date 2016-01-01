# Backend

Chime is built on Ruby on Rails and hosted by Heroku. The backend is purely responsible for serving JSON.

PostgreSQL is a must for Heroku.

Other notable dependencies include:

- Paperclip and ImageMagick (image attachment)
- Amazon Web Services SDK (file storage on Amazon Simple Storage Service (S3))
- BCrypt (password-hashing for a secure authentication system)
- FriendlyId (slugging usernames, track titles, playlist titles)
