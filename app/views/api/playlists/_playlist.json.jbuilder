json.extract! playlist, :id, :title, :description

json.tracks playlist.tracks do |track|
  json.partial! "api/tracks/track", track: track, user: playlist.user
end
