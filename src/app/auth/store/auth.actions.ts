import { createAction, props } from '@ngrx/store';

import { AuthUser } from './auth.models';
export const loginRequest = createAction(
    '[Auth] Login Request',
    props<{ username: string; password: string }>()
);
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: Error }>()
);
export const logout = createAction('[Auth] Logout');
export const getAuthUserRequest = createAction('[Auth] Auth User Request');
export const getAuthUserSuccess = createAction(
    '[Auth] Auth User Success',
    props<{ user: AuthUser }>()
);
export const getAuthUserFailure = createAction('[Auth] Auth User Failure');
export const refreshTokenRequest = createAction('[Auth] Refresh Token Request');
export const refreshTokenSuccess = createAction('[Auth] Refresh Token Success');
export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure');
