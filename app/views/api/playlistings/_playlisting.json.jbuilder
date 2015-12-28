json.track do
  json.partial! "api/tracks/track", track: playlisting.track
end

json.playlist do
  json.partial! "api/playlists/playlist", playlist: playlisting.playlist
end
