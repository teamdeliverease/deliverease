import {
  submitForm,
  getLocationPayload,
  getNamePayload,
  getFulfillmentStatusPayload,
  listen,
  update,
} from '../utils/api';
import firebase from '../utils/firebase/client';

const REQUESTERS_REF = 'requesters';

const postRequest = (data) => {
  return submitForm(REQUESTERS_REF, data, (geocodeResult) => {
    const preparedData = {
      ...data,
      ...getFulfillmentStatusPayload(),
      ...getNamePayload(data),
    };

    if (geocodeResult) {
      return { ...preparedData, ...getLocationPayload(geocodeResult) };
    }
    return preparedData;
  });
};

const listenForRequests = (callback) => {
  listen(REQUESTERS_REF, callback);
};

const updateRequestStatus = (requestId, status) => {
  update(`${REQUESTERS_REF}/${requestId}`, {
    fulfillment_status: status,
    fulfillment_status_timestamp: firebase.database.ServerValue.TIMESTAMP,
  });
};

const updateResolution = (requestId, resolution) => {
  update(`${REQUESTERS_REF}/${requestId}`, {
    resolution,
  });
};

export { postRequest, listenForRequests, updateRequestStatus, updateResolution };
