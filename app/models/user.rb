# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_session_token

  before_save { self.email = email.downcase }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :username,
    presence: true,
    uniqueness: { case_sensitive: false }

  validates :email,
    presence: true,
    format: { with: VALID_EMAIL_REGEX }

  validates :password,
    confirmation: true,
    length: { minimum: 8, maximum: 20, allow_nil: true }

  validates :password_confirmation,
    presence: true,
    allow_nil: true

  validates :session_token,
    presence: true,
    uniqueness: true

  validates_presence_of :password_digest

  has_many :tracks

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, maybe_password)
    user = self.find_by(username: username)

    return nil unless user

    user.is_password?(maybe_password) ? user : nil
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

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
