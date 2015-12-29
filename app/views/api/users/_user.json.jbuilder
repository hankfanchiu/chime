json.extract! user, :id, :username, :email, :description

json.avatar_hero      user.avatar_hero
json.avatar_thumb     user.avatar_thumb
json.avatar_square    user.avatar_square

json.playlists user.playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end

json.tracks user.tracks do |track|
  json.partial! "api/tracks/track", track: track
end
