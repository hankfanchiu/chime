class Track < ActiveRecord::Base
  validates_presence_of :artist_id, :title

  validates :track_url,
    presence: true,
    uniqueness: true

  belongs_to :user,
    foreign_key: :artist_id,
    class_name: "User"
end
