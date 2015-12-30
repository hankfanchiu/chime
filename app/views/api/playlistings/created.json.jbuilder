json.username       current_user.username
json.playlist_slug  @playlisting.playlist.slug

json.track do
  json.partial! "api/tracks/track", track: @playlisting.track
end

json.success [ "Track added to playlist." ]
