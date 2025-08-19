export interface GoogleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface GoogleAuthError {
  error: string;
  error_description?: string;
  error_uri?: string;
}

export interface GoogleAuthConfig {
  clientId: string;
  scope: string;
  flow: 'implicit' | 'auth-code';
  redirectUri?: string;
}
