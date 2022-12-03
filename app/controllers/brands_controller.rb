class BrandsController < ApplicationController

    def create
        render json: Brand.find_or_create_by(name: brand_params[:brand])
    end

    def index
        render json: Brand.all
    end

    private

    def brand_params
        params.permit(:name, :brand)
    end
end
  