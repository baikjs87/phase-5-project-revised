class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user, :review
  belongs_to :user
  belongs_to :review
end
