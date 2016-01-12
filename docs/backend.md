# Backend

Chime runs on Ruby on Rails and is hosted on Heroku. The sole purpose of the backend is to provide RESTful APIs and respond with JSON data.

PostgreSQL RDBMS is a must for Heroku.

Other notable dependencies include:

- Paperclip and ImageMagick for image attachment and processing
- Amazon Web Services SDK for file storage on Amazon Simple Storage Service (S3)
- BCrypt for password-salting and hashing for a secure authentication system
- FriendlyId for slugging usernames, track titles, and playlist titles
