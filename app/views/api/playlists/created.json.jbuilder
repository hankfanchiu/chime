json.playlist do
  json.partial! "api/playlists/playlist", playlist: @playlist
end

json.success ["New playlist saved!"]
