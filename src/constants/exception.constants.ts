export enum ErrorCode {
  // Email code verification
  EMAIL_CODE_OR_EMAIL_NULL = 'EMAIL_CODE_OR_EMAIL_NULL', // email or verification code is NULL
  //EMAIL_CODE_INVALID = 'EMAIL_CODE_INVALID', // verification code is invalid
  EMAIL_CODE_MISSING = 'EMAIL_CODE_MISSING', // user doesn't have such verirification code (or user is missing)
  EMAIL_CODE_EXPIRED = 'EMAIL_CODE_EXPIRED',
}
