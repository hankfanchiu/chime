# == Schema Information
#
# Table name: tracks
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  title            :string           not null
#  track_url        :string           not null
#  description      :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  slug             :string
#  img_file_name    :string
#  img_content_type :string
#  img_file_size    :integer
#  img_updated_at   :datetime
#

class Track < ActiveRecord::Base
  extend FriendlyId

  after_initialize :ensure_track_data

  before_save :parameterize_slug

  INVALID_TRACK_TITLES = %w(tracks playlists)

  friendly_id :title, use: :slugged

  validates :title,
    exclusion: { in: INVALID_TRACK_TITLES },
    uniqueness: { scope: :user_id }

  validates :slug, uniqueness: { scope: :user_id }

  validates :track_url,
    presence: true,
    uniqueness: true

  validates_presence_of :user_id

  belongs_to :user
  has_many :playlistings, dependent: :destroy
  has_many :playlists, through: :playlistings

  def self.find_by_username_and_slug(username, slug)
    user = User.friendly.find(username)

    user ? user.tracks.friendly.find(slug) : nil
  end

  def self.search(query)
    self.where("title LIKE ?", "%#{query}%")
  end

  private

  def ensure_track_data
    self.title = "Untitled" if self.title.nil?
    self.img_url = "/assets/corgi.jpg" if self.img_url.nil?
    self.description = "No description" if self.description.nil?
  end

  def parameterize_slug
    self.slug = self.title.parameterize
  end
end
