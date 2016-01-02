json.extract! playlist, :id, :title, :description, :slug, :time_ago

json.tracks playlist.tracks_ordered do |track|
  json.partial! "api/tracks/track", track: track
end

json.user do
  json.extract! playlist.user, :username
end
