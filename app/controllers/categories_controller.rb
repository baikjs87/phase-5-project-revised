class CategoriesController < ApplicationController

    def create
        render json: Category.find_or_create_by(name: category_params[:category])
    end

    def index
        render json: Category.all
    end

    private

    def category_params
        params.permit(:name, :category)
    end
end
