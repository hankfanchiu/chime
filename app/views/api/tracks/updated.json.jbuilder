json.track do
  json.partial! "api/tracks/track", track: @track
end

json.old_slug @old_slug

json.success ["Track updated"]
