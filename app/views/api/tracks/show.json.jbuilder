json.extract! @track do
  json.id           @track.id
  json.username     @track.user.username
  json.title        @track.title
  json.track_url    @track.track_url
  json.img_url      @track.img_url
  json.description  @track.description
end
