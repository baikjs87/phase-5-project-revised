class ReviewsController < ApplicationController

    def index
        render json: Review.all, status: :ok
    end

    def create
        review = Review.create(review_params)
        render json: review, status: :created
    end

    def show
        reviews = Review.find(params[:id])
        if reviews
            render json: reviews
        end
    end

    def update
        review = Review.find(params[:id])
        review.update(review_params)
        render json: review
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private
    
    def review_params
        params.permit(:id, :title, :brand_id, :category_id, :price, :rating, :recommend, :description, :user_id, :review, :image_url)
    end

end