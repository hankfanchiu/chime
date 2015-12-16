# == Schema Information
#
# Table name: tracks
#
#  id          :integer          not null, primary key
#  artist_id   :integer          not null
#  title       :string           not null
#  track_url   :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Track < ActiveRecord::Base
  validates_presence_of :artist_id, :title

  validates :track_url,
    presence: true,
    uniqueness: true

  belongs_to :user,
    foreign_key: :artist_id,
    class_name: "User"
end
