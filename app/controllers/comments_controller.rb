# -*- coding: utf-8 -*-
class CommentsController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    tune = Tune.find(params[:tune_id])

    @comment = @user.comments.build(params[:comment])
    @comment.tune = tune
    if @comment.save == false
      render :nothing => true
      return
    end

    if request.smart_phone?
      render :json => {
        id:         tune.id,
        comment_id: @comment.id,
        date:       @comment.created_at.strftime("%Y/%m/%d %H:%M"),
        comment:    @comment.text
      },:callback => 'addComment'
    else
      render :json => {
        id: @comment.id,
        html: render_to_string(:partial => "comments/comment_body", :locals => { :c => @comment })
      }
    end
  end

  def destroy
    @comment_id = params[:id] # destroy.js.erb で使う
    Comment.find(@comment_id).destroy
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def load_comment_list
    @albums = Album.scoped.order("id ASC")
    @comments = Comment.scoped.order("updated_at DESC").limit(30)

    lists = render_to_string :partial => 'comment_list_smart_phone'
    render :json => { lists: lists },
           :callback => 'showCommentList'
  end
end
