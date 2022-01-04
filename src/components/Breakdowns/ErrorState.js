import React from 'react';
import { Link } from 'react-router-dom';

const ErrorState = () => (
  <div>
    <h1 className="error-title">Something went wrong</h1>
    <p className="error-details">
      Unfortunately, we can't display this data at the moment.
    </p>
    <p className="error-details">
      If this problem persists, please{' '}
      <Link style={{ textDecoration: 'underline' }} to="/contact">
        contact us
      </Link>
      .
    </p>
  </div>
);

export default ErrorState;
