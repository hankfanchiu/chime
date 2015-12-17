# == Schema Information
#
# Table name: playlists
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Playlist < ActiveRecord::Base
  after_initialize :ensure_playlist_title

  validates :user_id, :title, presence: true

  belongs_to :user
  has_many :playlistings
  has_many :tracks, through: :playlistings

  private

  def ensure_playlist_title
    self.title = "Untitled" if self.title.nil?
  end
end
