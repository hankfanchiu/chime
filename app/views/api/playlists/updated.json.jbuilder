json.playlist do
  json.partial! "api/playlists/playlist", playlist: @playlist
end

json.old_slug @old_slug

json.success ["Your playlist has been updated"]
