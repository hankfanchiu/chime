# Documentation

[http://chime.audio](http://chime.audio)

## Minimum Viable Product

Chime is a web application inspired by SoundCloud, built on Rails and React.js.

Chime allows users to:

- [x] Create and update a user account
- [x] Sign In / Sign Out
- [x] Search other users
- [x] Upload and delete audio files
- [x] Stream tracks without interruption
- [x] Add tracks to the audio playback queue
- [x] Search for tracks by title
- [x] Create, edit, or delete playlists
- [x] Add tracks to or remove tracks from playlists

## Design
* [Database schema](./schema.md)

## Implementation Timeline

### Phase 1: User Authentication (0.5 days)

I will begin by implementing user signup and authentication (via
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component.

### Phase 2: Flux Architecture (0.5 days)
I will set up Flux, the React Router, and the React view structure for the main application. The music tracks will live in a Tracks Store.

### Phase 3: Tracks & Playlists (1 day)
Using an API for track uploads, I will add API routes to serve track URLs as JSON. I will add Playlist and Playlisting to allow users to create playlists and add tracks to playlists.

### Phase 4: Audio Playback & Stream Bar (1 day)
I will use the native HTML5 audio to stream the tracks. To test the audio stream, I will create a stream bar in the UI, which persists at the bottom of the page.

### Phase 5: Track Likes and Comments (1 day)
I will add new Comment and Like models for tracks. Corresponding routes, controllers, and views will be set up.

### Phase 6: Main Feed, Nav, Sidebar Views (2 days)
I will add the main page that the user will see after logging in. This feed
will contain followed users' tracks. The nav and sidebar views will be created.

### Phase 7: Cleanup (2 days)

Devote time to perfecting the UI.

### Bonus

- Popular tracks in feed
- User account email activation
- Playlist likes (polymorphic Like model)
- Equalizer UI
- Fancy animations
