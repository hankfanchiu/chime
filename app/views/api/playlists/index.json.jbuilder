json.array! @playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end
