export const DOCUMENT_TYPE_ENDPOINTS = {
    GET_ALL_WITH_RESOURCE_TYPES: '/document-types/with-resource-types',
} as const;

export const REQUEST_ENDPOINTS = {
    GET_REQUEST_PEOPLE: '/requests/people',
    GET_REQUEST_PEOPLE_BY_ENTITY_ID: (entityId: number) => `/requests/entity/${entityId}/people`,
    UPDATE_DOCUMENTS: '/documents/bulk-update'
} as const;