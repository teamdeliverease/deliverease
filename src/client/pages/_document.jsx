/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import FacebookPixel from '../components/FacebookPixel';
import MetaTags from '../components/MetaTags';
import { MAPS_API_KEY } from '../constants';

class CustomDocument extends Document {
  render() {
    // Store initial props from request data that we need to use again on
    // the client. See:
    // https://github.com/zeit/next.js/issues/3043#issuecomment-334521241
    // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
    // Alternatively, you could use a store, like Redux.
    const { AuthUserInfo } = this.props;
    return (
      <Html>
        <Head>
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2),
            }}
          />
          {/* bootstrap CSS import */}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <script
            async
            defer
            src={`https://maps.google.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`}
          />
          <MetaTags />
          <FacebookPixel />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  // Get the AuthUserInfo object. This is set if the server-rendered page
  // is wrapped in the `withAuthUser` higher-order component.
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);

  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, AuthUserInfo };
};

CustomDocument.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }).isRequired,
};

export default CustomDocument;
