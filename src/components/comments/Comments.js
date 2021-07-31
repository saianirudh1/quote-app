import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();
  const { quoteId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  let comments;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    console.log(loadedComments.length);
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === 'completed' &&
    !loadedComments &&
    loadedComments.length === 0
  ) {
    comments = <p className="centered">No Comment</p>;
  }

  const addedCommentHandler = useCallback(
    function () {
      sendRequest(quoteId);
    },
    [sendRequest, quoteId]
  );

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
