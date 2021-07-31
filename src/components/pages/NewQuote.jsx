import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../quotes/QuoteForm';

import useHttp from '../../hooks/use-http';
import { addQuote } from '../../lib/api';

function NewQuote() {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    console.log(status);
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [history, status]);

  const addQuoteHandler = function (quoteData) {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
}

export default NewQuote;
