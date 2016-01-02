json.playlist do
  json.slug     @playlist.slug
  json.username @playlist.user.username
end

json.success ["Your playlist has been deleted"]
