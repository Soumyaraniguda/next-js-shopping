/**
 * 200 Ok
 * The server has fulfilled the browser's request and returned requested data
 * The server has fulfilled the browser's request, and as a result, has created and return the object.
 */
export const CREATE_AND_RETURN_OK_STATUS = 200;

/**
 * 201 Created
 * The server has fulfilled the browser's request, and as a result, has created a new resource.
 * This code is used when created and a reference is returned
 */
export const CREATE_AND_RETURN_REFERENCE_STATUS = 201;

/**
 * 401 Unauthorized
 * The client request has not been completed because it lacks valid authentication credentials for the requested resource.
 */
export const UNAUTHORIZED_STATUS = 401;

/**
 * 403 Forbidden
 * If you need to support a "Request Access" feature to resources you don't have permissions for,
 * return 403, so your client-side could tell the difference.
 */
export const ACCESS_DENIED_STATUS = 403;

/**
 * 404 Not Found
 * Status code indicates that the server cannot find the requested resource
 */
export const NOT_FOUND = 404;

/**
 * 409 Conflict
 * The request could not be completed due to a conflict with the current state of the resource.
 * This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request.
 * For example adding already existing entity.
 */
export const CONFLICT_STATUS = 409;

/**
 * 500 Internal Server Error
 * The server encountered an unexpected condition that prevented it from fulfilling the request.
 */
export const INTERNAL_SERVER_ERROR_STATUS = 500;
