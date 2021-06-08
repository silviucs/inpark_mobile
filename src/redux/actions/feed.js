import {
    SAVE_ENTITIES,
    UPDATE_ENTITY_LIKES,
    UPDATE_ENTITIES_LIST,
    UPDATE_ENTITY_LIKES_SOCKETS,
    GET_ENTITY, SAVE_FEED_PROPERTY,
} from './types';

export const saveFeedState = ({prop, value}) => {
    return {
        type: SAVE_FEED_PROPERTY,
        payload: {prop, value}
    }
}

export const saveEntities = ({prop, value}) => {
    return {
        type: SAVE_ENTITIES,
        payload: {prop, value},
    };
};

export const updateEntitiesList = ({prop, value}) => {
    return {
        type: UPDATE_ENTITIES_LIST,
        payload: {prop, value}
    }
}

export const updateEntityLikes = ({entityId, value}) => {
    return {
        type: UPDATE_ENTITY_LIKES,
        payload: {entityId, value},
    };
};

export const updateEntityLikesSockets = ({entityId, value}) => {
    return {
        type: UPDATE_ENTITY_LIKES_SOCKETS,
        payload: {entityId, value},
    };
};

export const getEntity = ({prop, value}) => {
    return {
        type: GET_ENTITY,
        payload: {prop, value}
    }
};
