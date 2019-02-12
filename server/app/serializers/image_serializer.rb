class ImageSerializer < ActiveModel::Serializer
  attributes :id, :url, :name, :like_count
  has_many :comments
  class CommentSerializer < ActiveModel::Serializer
    attributes :id, :image_id, :content
  end

end
