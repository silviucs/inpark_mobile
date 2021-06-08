import {SERVER_API_URL} from '../constants';
import {executeServerGetRequest} from './system';

export const getCoreMeetupTypes = async () => {
    let url = SERVER_API_URL + 'core/types'

    const response = await executeServerGetRequest(url)
    return await response.json();
}
