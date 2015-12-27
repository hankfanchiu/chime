demo_user = User.create!(
  username: "demo_user",
  email: "demo_user@chime.audio",
  password: "password"
)

saviours = User.create!(
  username: "SavioursOfTheUniverse",
  email: "spaceinvader@chime.audio",
  password: "password"
)
# 
# hank = User.create!(
#   username: "hankfanchiu",
#   email: "fanchiu.hank@gmail.com",
#   password: "password"
# )
#
# track1 = saviours.tracks.create!(
#   title: "Marvin Gaye - Ain't No Mountain High Enough",
#   track_url: "https://s3-us-west-1.amazonaws.com/chime-audio-assets-dev/tracks/audio/a5f50646-375b-4a23-8902-4c942cd5a6bc.mp3",
#   description: "R&B/soul song written by Nickolas Ashford & Valerie Simpson in 1966 for the Tamla Motown label."
# )
#
# track2 = saviours.tracks.create!(
#   title: "Redbone - Come and Get Your Love",
#   track_url: "",
#   description: "Come and get your love\n
#                 Come and get your love\n
#                 Come and get your love\n
#                 Come and get your love\n"
# )
#
# track3 = saviours.tracks.create!(
#   title: "David Bowie - Moonage Daydream",
#   track_url: "",
#   description: "I'm a spacer invader!"
# )
#
# track4 = saviours.tracks.create!(
#   title: "Rupert Holmes - Escape The Piña Colada",
#   track_url: "",
#   description: "'Cause I like piña colada!"
# )
#
# track5 = saviours.tracks.create!(
#   title: "Elvin Bishop - Fooled Around and Fell in Love",
#   track_url: "",
#   description: "Bishop does not sing lead vocals on the track; feeling that his gravelly voice wouldn't do the song justice, he invited vocalist Mickey Thomas, who was a background singer in his band at the time, to sing it."
# )
#
# track6 = saviours.tracks.create!(
#   title: "The Raspberries - Go All The Way",
#   track_url: "",
#   description: "Because of its sexually suggestive lyrics, considered risqué for the day, the song was banned by the BBC."
# )
#
# track7 = saviours.tracks.create!(
#   title: "Blue Swede - Hooked on a Feeling",
#   track_url: "",
#   description: "B. J. Thomas released his recording of \"Hooked on a Feeling\" in 1968."
# )
#
# track8 = saviours.tracks.create!(
#   title: "Norman Greenbaum - Spirit in the Sky",
#   track_url: "",
#   description: "When I die and lay it to rest.."
# )
#
# track9 = saviours.tracks.create!(
#   title: "The Five Stairsteps - Ooh Child",
#   track_url: "",
#   description: "O-O-O-H CHILD"
# )
#
# track10 = saviours.tracks.create!(
#   title: "Jackson 5 - I Want You Back",
#   track_url: "",
#   description: "\"I Want You Back\" is a 1969 song by the Jackson 5 which became a number-one hit for the band and the Motown label in early 1970."
# )
#
# track11 = saviours.tracks.create!(
#   title: "10CC - I'm Not In Love",
#   track_url: "",
#   description: "So don't forget it"
# )
#
# saviours.playlists.create!(
#   title: "Guardians of the Galaxy",
#   tracks: [track1]
# )
