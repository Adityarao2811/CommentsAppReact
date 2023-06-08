import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem/index'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

const initialcommentsList = []

class Comments extends Component {
  state = {
    commentsList: initialcommentsList,
    name: '',
    comment: '',
    noOfComments: 0,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isFavorite: !eachComment.isFavorite}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredComments = commentsList.filter(each => each.id !== id)
    this.setState(prevState => ({
      commentsList: filteredComments,
      noOfComments: prevState.noOfComments - 1,
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isFavorite: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      noOfComments: prevState.noOfComments + 1,
    }))
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  render() {
    const {name, comment, commentsList, noOfComments} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <p className="form-description">
            Say something about 4.0 technologies
          </p>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <input
                value={name}
                onChange={this.onChangeName}
                className="name-input"
                placeholder="Your Name"
              />
              <textarea
                className="comment-input"
                value={comment}
                onChange={this.onChangeComment}
                placeholder="Your Comment"
                rows="5"
                cols="33"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{noOfComments} </span>Comments
          </p>

          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsFavorite={this.toggleIsFavorite}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
