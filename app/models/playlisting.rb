# == Schema Information
#
# Table name: playlistings
#
#  id          :integer          not null, primary key
#  playlist_id :integer          not null
#  track_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Playlisting < ActiveRecord::Base
  validates :track_id, uniqueness: { scope: :playlist_id }

  belongs_to :playlist
  belongs_to :track
end
