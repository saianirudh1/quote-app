import { useEffect } from 'react';

import QuoteList from '../quotes/QuoteList';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '../quotes/NoQuotesFound';

import useHttp from '../../hooks/use-http';
import { getAllQuotes } from '../../lib/api';

function AllQuotes() {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focues">{error}</p>;
  }

  if (status === 'success' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
}

export default AllQuotes;
