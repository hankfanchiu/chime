# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  email               :string           not null
#  session_token       :string           not null
#  password_digest     :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  slug                :string
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  description         :text
#

class User < ActiveRecord::Base
  extend FriendlyId

  attr_reader :password

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  INVALID_USERNAMES =
    %w(discover collect about contact new edit index session login logout signup settings tracks playlists users admin stylesheets assets javascripts images)

  has_many :tracks, dependent: :destroy
  has_many :playlists, dependent: :destroy
  has_many :playlistings, through: :playlists

  after_initialize :ensure_session_token

  before_save :downcase_user_data

  friendly_id :username, use: :slugged

  validates :username,
    presence: true,
    uniqueness: { case_sensitive: false },
    exclusion: { in: INVALID_USERNAMES },
    length: { in: 4..20 },
    format: { without: /\s/ }

  validates :password,
    length: {
      minimum: 6,
      allow_nil: true,
      message: "must be at least 6 characters"
    }

  validates_presence_of :password_digest

  validates :email,
    presence: true,
    format: {
      with: VALID_EMAIL_REGEX,
      message: "address is invalid"
    }

  validates :session_token,
    presence: true,
    uniqueness: true

  has_attached_file :avatar,
    default_url: "https://s3-us-west-1.amazonaws.com/chime-audio-assets/chimp.jpg",
    url: ":s3_domain_url",
    path: "/users/images/:hash.:extension",
    hash_secret: "chime-audio-hash",
    styles: {
      hero: '30x30#',
      square: '300x300#'
    }

  validates_attachment_size :avatar, { less_than: 5.megabytes }
  validates_attachment_content_type :avatar,
    content_type: ["image/jpeg", "image/gif", "image/png"]

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, maybe_password)
    user = self.find_by(username: username.downcase)

    return nil unless user

    user.is_password?(maybe_password) ? user : nil
  end

  def self.search(query)
    self.where("username ILIKE ?", "%#{query}%")
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    saved_password = BCrypt::Password.new(self.password_digest)

    saved_password.is_password?(password)
  end

  def avatar_hero
    self.avatar.url(:hero)
  end

  def avatar_thumb
    self.avatar.url(:thumb)
  end

  def avatar_square
    self.avatar.url(:square)
  end

  private

  def downcase_user_data
    self.username = self.username.downcase
    self.email = self.email.downcase
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
