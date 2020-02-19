# Chime

Chime is a web application for users to stream and share music. Inspired by SoundCloud, Chime allows users to upload their own audio tracks, create playlists, and discover music by other artists.

Chime is a personal project by Hank Fanchiu.

![Chime home page][home page]

## Features

- User accounts with secure authentication
- Music streaming with controls and no interruption
- Audio uploading and management
- Image attachments for users and audio tracks
- Adding tracks to a temporary queue for playback
- Playlists of music tracks to playback tunes in sequence
- Searching for users and tracks

![demo_user's tracks][tracks]

## Project Design

Chime was designed and built in three weeks.

A [proposal][proposal] was drafted to help provide an implementation timeline during the development process.

A [database schema][schema] was prepared alongside the design proposal.

## Technology

Chime is a single-page application built on Rails and React.js, with many dependencies in both the backend and the frontend.

- [Backend technology][backend]
- [Frontend technology][frontend]
- [File storage][file storage] via Amazon Simple Storage Services (S3)

## Future Implementations

Chime is only a few degrees above being considered an MVP.

The features that will be added are listed in the [future implementations][future] outline.

[home page]: ./docs/images/home_page.png "Chime home page"
[tracks]: ./docs/images/tracks.png "A user's tracks"
[proposal]: ./docs/proposal.md
[schema]: ./docs/schema.md
[backend]: ./docs/backend.md
[frontend]: ./docs/frontend.md
[file storage]: ./docs/file_storage.md
[future]: ./docs/future.md
