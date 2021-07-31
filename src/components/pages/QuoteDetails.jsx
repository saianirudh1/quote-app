import { Fragment, useEffect } from 'react';
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../comments/Comments';
import HighlightedQuote from '../quotes/HighlightedQuote';
import NoQuotesFound from '../quotes/NoQuotesFound';
import LoadingSpinner from '../UI/LoadingSpinner';

import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';

function QuoteDetails() {
  const params = useParams();
  const { quoteId } = params;

  const match = useRouteMatch();

  const {
    sendRequest,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focus">{error}</p>;
  }

  if (status === 'success' && !loadedQuote.text) {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
}

export default QuoteDetails;
