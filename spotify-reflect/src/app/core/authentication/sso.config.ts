import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  loginUrl: 'https://accounts.spotify.com/authorize',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:3000/home',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'c26be72b65a8452bbbdbe646e4e00396',

  // disable OpenID
  oidc: false,

  strictDiscoveryDocumentValidation: false,
  
  // dummyClientSecret: '2f39b679a85b4dde9d736556b3c302b6',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'user-top-read user-read-recently-played',

  showDebugInformation: true,
};