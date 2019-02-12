class ImagesController < ApplicationController

  def index
    @images = Image.all
    render json: @images
  end

  def show
    @image = Image.find(params[:id])
    render json: @image
  end

  def increase_likes
    @image = Image.find_by(id: params[:id])
    if @image
      @image.like_count += 1
      @image.save
      render json: @image
    else
      render json: {error: "Image not found"}, status: 404
    end
  end

end
