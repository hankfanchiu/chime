json.extract! user,
  :id,
  :username,
  :email,
  :description,
  :avatar_hero,
  :avatar_thumb,
  :avatar_square

json.playlists user.playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end

json.tracks user.tracks do |track|
  json.partial! "api/tracks/track", track: track
end
