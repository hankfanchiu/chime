json.extract! playlist, :id, :title, :description, :slug, :time_ago

json.tracks playlist.tracks_ordered do |track|
  json.partial! "api/tracks/track", track: track
end

json.user do
  json.extract! playlist.user, :id, :username

  json.avatar_hero      playlist.user.avatar_hero
  json.avatar_thumb     playlist.user.avatar_thumb
  json.avatar_square    playlist.user.avatar_square
end
