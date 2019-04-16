class AnswersController < ApplicationController
  before_action :authenticate_user!

  def index
    @answers = Answer.all
    render component: 'Answer', props: { answers: @answers }
  end

  def new
    render component: 'NewAnswer'
  end

  def create
    @answer = Answer.new(answer_params)

    if @answer.save
      render json: @answer, status: :created
    else
      render json: { errors: @answer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def answer_params
    params.permit(:parameter_match, :intent, :response)
  end

end