export interface IErrorFirebaseResponse {
  code:       string;
  customData: CustomData;
  name:       string;
}

export interface CustomData {
  appName:        string;
  _tokenResponse: TokenResponse;
}

export interface TokenResponse {
  error: TokenResponseError;
}

export interface TokenResponseError {
  code:    number;
  message: string;
  errors:  ErrorElement[];
}

export interface ErrorElement {
  message: string;
  domain:  string;
  reason:  string;
}
