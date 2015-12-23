json.extract! @user, :id, :username, :email

json.avatar_hero      @user.avatar_hero
json.avatar_thumb     @user.avatar_thumb
json.avatar_square    @user.avatar_square

json.playlists @user.playlists do |playlist|
  json.extract! playlist, :id, :title, :description

  json.tracks playlist.tracks do |track|
    json.extract! track, :id, :title, :slug, :track_url, :description
  end
end

json.tracks @user.tracks do |track|
  json.extract! track, :id, :title, :slug, :track_url, :description
end
