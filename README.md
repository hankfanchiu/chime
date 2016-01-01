# Chime

[Chime.audio][chime] is a web application for users to stream and share music. Inspired by SoundCloud, Chime allows users to upload their own tracks, create playlists, and discover music by other artists.

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

## Project Design

Chime was designed and created in three weeks. A [Proposal][proposal] was drafted to help provide an implementation timeline during the development process. A [Database Schema][schema] was prepared alongside the design proposal.

## Technology

Chime is a single-page application built on Rails and React.js, with many dependencies in both the backend and the frontend.

- [Backend Technology][backend]
- [Frontend Technology][frontend]
- [File Storage][file storage] via Amazon Simple Storage Services (S3)

## Future Implementations

Chime is only a few degrees above being considered an MVP. The features that will be added in the future are listed in the [Future Implementations][future] outline.

[chime]: http://chime.audio
[proposal]: ./docs/proposal.md
[schema]: ./docs/schema.md
[backend]: ./docs/backend.md
[frontend]: ./docs/frontend.md
[file storage]: ./docs/file_storage.md
[future]: ./docs/future.md
