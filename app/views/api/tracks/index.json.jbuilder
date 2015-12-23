json.array! @tracks do |track|
  json.partial! "api/tracks/track", track: track
end
