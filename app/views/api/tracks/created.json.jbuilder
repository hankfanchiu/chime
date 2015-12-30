json.track do
  json.partial! "api/tracks/track", track: @track
end

json.success ["Track saved"]
