json.user do
  json.partial! "api/users/user", user: @user
end

json.playlists @user.playlists do |playlist|
  json.partial! "api/playlists/playlist", playlist: playlist
end

json.success ["Welcome back, #{@user.username}"]
