json.track do
  json.slug     @track.slug
  json.username @track.user.username
end

json.success ["Track deleted"]
