import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const isSortAscending = params.get('sort') === 'asc';

  const sortedList = sortQuotes(props.quotes, isSortAscending);

  const sortClickHandler = function () {
    history.push(`/quotes/?sort=${isSortAscending ? 'des' : 'asc'}`);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortClickHandler}>{`Sort By Date ${
          isSortAscending ? '\u2191' : '\u2193'
        }`}</button>
      </div>
      <ul className={classes.list}>
        {sortedList.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
