# Chime

[Chime.audio](http://chime.audio) is a web application for users to stream and share music. Inspired by SoundCloud, Chime allows users to upload their own tracks, create playlists, and discover music by other artists.

Chime is a personal project by Hank Fanchiu.

## Features

The core features of Chime are:

- User accounts with secure authentication

- Music streaming with controls and no interruption

- Audio uploading and management

- Image attachments for users and audio tracks

- Adding tracks to a temporary queue for playback

- Playlists of music tracks to playback tunes in sequence

- Searching for users and tracks

## Project Proposal

Chime was designed and created in three weeks. A [design proposal][proposal] was drafted to help provide an implementation timeline during the development process.

[proposal]: ./docs/proposal.md

## Technology

Chime is a single-page application built on Rails and React.js.

Audio and image files are stored on Amazon Simple Storage Services (S3). The two file types follow a separate implementations, which are detailed in the [File Storage][file storage] documentation.

[file storage]: ./docs/file_storage.md

### Backend

Chime is built on Ruby on Rails and hosted by Heroku. The backend is purely responsible for serving JSON.

PostgreSQL is a must for Heroku.

Other notable dependencies include:

- Paperclip and ImageMagick (image attachment)

- Amazon Web Services SDK (file storage on Amazon Simple Storage Service (S3))

- BCrypt (password-hashing for a secure authentication system)

- FriendlyId (slugging usernames, track titles, playlist titles)

### Frontend

Because it is a single-page application, Chime utilizes React.js and follows the Flux architecture to deliver the frontend application.

Webpack conveniently bundles all of the frontend components and Flux parts.

jQuery is only used to make API calls with the Rails server.

Site layout and styling are done with Bootstrap and Sass. React Bootstrap expedited the building out of the React components that utilized Bootstrap.

Other frontend dependencies are:

- React DOM
- React Router
- React History
- React Linked State Mixin
- Keymirror
- Babel (for JSX)

## Future Implementations

Chime is only a few degrees above being considered an MVP. There are still many more features that will be added.

### Commenting

Users will be able to comment on both tracks and playlists.

### Liking

Users will be able to "like" tracks, and keep a collection of all "liked" tracks.

### Play Count

Each playback of a track will increment the track's play count. The most played tracks will be listed as the "popular hits".

### Track Category

Artists will be able to categorize their uploaded tracks by tags and genre. This will allow users to search track by categories.

### Following Users

Similar to "liking" tracks, users will be able to follow artists and see a feed of recently uploaded tracks by their followees.

### Other Features

- Account activation via email
- Client session on multiple browsers (multiple session)
- Authentication integration with Facebook and Google+
