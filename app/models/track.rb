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

  INVALID_TRACK_TITLES = %w(tracks playlists)

  after_initialize :ensure_track_title
  after_initialize :ensure_track_description

  before_save :parameterize_slug

  friendly_id :title, use: :slugged

  validates :title,
    uniqueness: { scope: :user, case_sensitive: false },
    exclusion: { in: INVALID_TRACK_TITLES }

  validates_uniqueness_of :slug, scope: :user

  validates :track_url, presence: true, uniqueness: true

  validates_presence_of :user

  has_attached_file :img,
    default_url: "/assets/corgi.jpg",
    styles: {
      thumb: '100x100>',
      square: '200x200#',
      medium: '300x300>'
    }

  validates_attachment_content_type :img, :content_type => /\Aimage\/.*\Z/

  belongs_to :user
  has_many :playlistings, dependent: :destroy
  has_many :playlists, through: :playlistings


  def self.find_by_username_and_slug(username, slug)
    user = User.find_by(username: username)

    return nil unless user

    user.tracks.find_by(slug: slug)
  end

  def self.search(query)
    self.where("title ILIKE ?", "%#{query}%")
  end

  private

  def ensure_track_title
    self.title = "Untitled" if self.title.nil?
  end

  def ensure_track_description
    self.description = "No description" if self.description.nil?
  end

  def parameterize_slug
    self.slug = self.title.parameterize
  end
end
