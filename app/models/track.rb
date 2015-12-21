# == Schema Information
#
# Table name: tracks
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  track_url   :string           not null
#  img_url     :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Track < ActiveRecord::Base
  after_initialize :ensure_track_title
  after_initialize :ensure_track_img_url
  after_initialize :ensure_track_description

  validates_presence_of :user_id, :title

  validates :track_url,
    presence: true,
    uniqueness: true

  belongs_to :user
  has_many :playlistings, dependent: :destroy
  has_many :playlists, through: :playlistings

  private

  def ensure_track_title
    self.title = "Untitled" if self.title.nil?
  end

  def ensure_track_img_url
    self.img_url = "/assets/corgi.jpg" if self.img_url.nil?
  end

  def ensure_track_description
    self.description = "No description" if self.description.nil?
  end
end
