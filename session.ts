import * as base64 from "js-base64"

/** A session authenticated for a user with LayerG server. */
export interface ISession {
  /** Claims */
  /** The authorization token used to construct this session. */
  token: string;
  /** If the user account for this session was just created. */
  created: boolean
  /** The UNIX timestamp when this session was created. */
  readonly created_at: number;
  /** The UNIX timestamp when this session will expire. */
  expires_at?: number;
  /** The UNIX timestamp when the refresh token will expire. */
  refresh_expires_at?: number;
  /** Refresh token that can be used for session token renewal. */
  refresh_token: string;
  /** The username of the user who owns this session. */
  username?: string;
  /** The ID of the user who owns this session. */
  user_id?: string;
  /** Any custom properties associated with this session. */
  vars?: object;

  /** Validate token */
  /** If the session has expired. */
  isexpired(currenttime: number): boolean;
  /** If the refresh token has expired. */
  isrefreshexpired(currenttime: number): boolean;
}

export class Session implements ISession {

  token : string;
  readonly created_at: number;
  expires_at?: number;
  refresh_expires_at?: number;
  refresh_token: string;
  username?: string;
  user_id?: string;
  vars?: object;

  constructor(
    token: string,
    refresh_token: string,
    readonly created: boolean) {
    this.token = token;
    this.refresh_token = refresh_token;
    this.created_at = Math.floor(new Date().getTime() / 1000);
    this.update(token, refresh_token);
  }

  isexpired(currenttime: number): boolean {
    return (this.expires_at! - currenttime) < 0;
  }

  isrefreshexpired(currenttime: number): boolean {
      return (this.refresh_expires_at! - currenttime) < 0;
  }

  update(token: string, refreshToken: string) {

    const tokenParts = token.split('.');
    if (tokenParts.length != 3) {
      throw 'jwt is not valid.';
    }

    const tokenDecoded = JSON.parse(base64.atob(tokenParts[1]));
    const tokenExpiresAt = Math.floor(parseInt(tokenDecoded['exp']));

    /** clients that have just updated to the refresh tokens */
    /** client release will not have a cached refresh token */
    if (refreshToken) {

        const refreshTokenParts = refreshToken.split('.');

        if (refreshTokenParts.length != 3) {
            throw 'refresh jwt is not valid.';
        }

        const refreshTokenDecoded = JSON.parse(base64.atob(refreshTokenParts[1]))
        const refreshTokenExpiresAt = Math.floor(parseInt(refreshTokenDecoded['exp']));
        this.refresh_expires_at = refreshTokenExpiresAt;
        this.refresh_token = refreshToken;
    }

    this.token = token;
    this.expires_at = tokenExpiresAt;
    this.username = tokenDecoded['usn'];
    this.user_id = tokenDecoded['uid'];
    this.vars = tokenDecoded['vrs'];
  }

  static restore(token: string, refreshToken: string): Session {
    return new Session(token, refreshToken, false);
  }
}
