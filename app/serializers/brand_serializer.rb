class BrandSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :reviews
  end
  