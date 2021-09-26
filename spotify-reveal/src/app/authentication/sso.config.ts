import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  
  loginUrl: 'https://accounts.spotify.com/authorize',

  clientId: 'c26be72b65a8452bbbdbe646e4e00396',

  responseType: 'code',

  scope: 'user-top-read user-read-recently-played playlist-read-private',

  redirectUri: 'http://localhost:3000/',

  tokenEndpoint: 'https://accounts.spotify.com/api/token',

  oidc: false,

  showDebugInformation: true,

  strictDiscoveryDocumentValidation: false,
};