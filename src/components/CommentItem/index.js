// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleIsFavorite, deleteComment} = props
  const {name, comment, isFavorite, id, initialClassName} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = toggleIsFavorite ? 'button active' : 'button'

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  const onClickDeleteIcon = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{formatDistanceToNow(new Date())} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={starImgUrl} alt="like" className="like-image" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickFavoriteIcon}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onClickDeleteIcon}
          data-testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
