import {
  GetFeature,
  GetFeatureRequest,
  GetFeatureResponse,
  GetFeaturePayload,
  GetFeatureDescriptionRequest,
  GetFeatureDescription,
  GetFeatureDescriptionPayload,
  GetFeatureDescriptionResponse,
  UpdateFeatureDescriptionRequest,
  UpdateFeatureDescriptionPayload,
  UpdateFeatureDescriptionResponse,
  UpdateFeatureDescription,
} from 'ducks/feature/types';
import { FeatureMetadata } from 'interfaces/Feature';

/* Actions */

export function getFeature(
  key: string,
  index?: string,
  source?: string
): GetFeatureRequest {
  return {
    payload: {
      key,
      index,
      source,
    },
    type: GetFeature.REQUEST,
  };
}

export function getFeatureSuccess(payload: GetFeaturePayload) {
  return {
    payload,
    type: GetFeature.SUCCESS,
  };
}

export function getFeatureFailure(
  payload: GetFeaturePayload
): GetFeatureResponse {
  return {
    payload,
    type: GetFeature.FAILURE,
  };
}

export function getFeatureDescription(
  onSuccess?: () => any,
  onFailure?: () => any
): GetFeatureDescriptionRequest {
  return {
    payload: {
      onSuccess,
      onFailure,
    },
    type: GetFeatureDescription.REQUEST,
  };
}

export function getFeatureDescriptionSuccess(
  payload: GetFeatureDescriptionPayload
) {
  return {
    payload,
    type: GetFeatureDescription.SUCCESS,
  };
}

export function getFeatureDescriptionFailure(
  payload: GetFeatureDescriptionPayload
): GetFeatureDescriptionResponse {
  return {
    payload,
    type: GetFeatureDescription.FAILURE,
  };
}

export function updateFeatureDescription(
  newValue: string,
  onSuccess?: () => any,
  onFailure?: () => any
): UpdateFeatureDescriptionRequest {
  return {
    payload: {
      newValue,
      onSuccess,
      onFailure,
    },
    type: UpdateFeatureDescription.REQUEST,
  };
}

export function updateFeatureDescriptionSuccess(
  payload: UpdateFeatureDescriptionPayload
) {
  return {
    payload,
    type: UpdateFeatureDescription.SUCCESS,
  };
}

export function updateFeatureDescriptionFailure(
  payload: UpdateFeatureDescriptionPayload
): UpdateFeatureDescriptionResponse {
  return {
    payload,
    type: UpdateFeatureDescription.FAILURE,
  };
}

/* Reducer */

export interface FeatureReducerState {
  isLoading: boolean;
  statusCode: number | null;
  feature: FeatureMetadata;
}

export const initialFeatureState: FeatureMetadata = {
  key: '',
  name: '',
  version: '',
  status: '',
  feature_group: '',
  entity: '',
  data_type: '',
  availability: [],
  description: '',
  owners: [],
  badges: [],
  owner_tags: [],
  tags: [],
  programmatic_descriptions: [],
  watermarks: [],
  stats: [],
  last_updated_timestamp: 0,
  created_timestamp: 0,
};

export const initialState: FeatureReducerState = {
  isLoading: true,
  statusCode: null,
  feature: initialFeatureState,
};

export default function reducer(
  state: FeatureReducerState = initialState,
  action
): FeatureReducerState {
  switch (action.type) {
    case GetFeature.REQUEST:
      return {
        ...state,
        statusCode: null,
        isLoading: true,
      };
    case GetFeature.FAILURE:
      return {
        ...state,
        isLoading: false,
        statusCode: action.payload.statusCode,
        feature: initialFeatureState,
      };
    case GetFeature.SUCCESS:
      return {
        ...state,
        isLoading: false,
        statusCode: action.payload.statusCode,
        feature: action.payload.feature,
      };
    case GetFeatureDescription.FAILURE:
    case GetFeatureDescription.SUCCESS:
      return {
        ...state,
        feature: {
          ...state.feature,
          description: action.payload.description,
        },
      };
    case UpdateFeatureDescription.FAILURE:
    case UpdateFeatureDescription.SUCCESS:
      return {
        ...state,
        feature: {
          ...state.feature,
          description: action.payload.description,
        },
      };
    default:
      return state;
  }
}
