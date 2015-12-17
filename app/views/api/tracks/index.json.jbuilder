json.array! @tracks do |track|
  json.partial! "api/tracks/track", track: track, user: track.user
end
