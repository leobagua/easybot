class Answer < ApplicationRecord

  validates :parameter_match, :intent, :response, presence: true

end