import axios, { AxiosResponse } from 'axios';
import * as qs from 'simple-query-string';

import { FeatureMetadata } from 'interfaces/Feature';

export type GetFeatureAPI = {
  msg: string;
  featureData: FeatureMetadata;
};

const FEATURE_BASE = '/api/metadata/v0';

export function getFeature(key: string, index?: string, source?: string) {
  const queryParams = qs.stringify({ key, index, source });
  return axios
    .get(`${FEATURE_BASE}/feature?${queryParams}`)
    .then((response: AxiosResponse<GetFeatureAPI>) => {
      const { data, status } = response;
      return {
        feature: data.featureData,
        statusCode: status,
      };
    })
    .catch((e) => {
      const { response } = e;
      const statusMessage = response.data?.msg;
      const statusCode = response?.status || 500;
      return Promise.reject({
        statusCode,
        statusMessage,
      });
    });
}

export type GetFeatureDescriptionAPI = {
  msg: string;
  description: string;
};

export function getFeatureDescription(key: string) {
  const queryParams = qs.stringify({ key });
  return axios
    .get(`${FEATURE_BASE}/get_feature_description?${queryParams}`)
    .then((response: AxiosResponse<GetFeatureDescriptionAPI>) => {
      const { data, status } = response;
      return {
        description: data.description,
        statusCode: status,
      };
    })
    .catch((e) => {
      const { response } = e;
      const statusMessage = response.data?.msg;
      const statusCode = response?.status || 500;
      return Promise.reject({
        statusCode,
        statusMessage,
      });
    });
}

export function updateFeatureDescription(key: string, description: string) {
  return axios
    .put(`${FEATURE_BASE}/put_feature_description`, {
      key,
      description,
    })
    .then((response: AxiosResponse<GetFeatureAPI>) => {
      const { data, status } = response;
      return {
        feature: data.featureData,
        statusCode: status,
      };
    })
    .catch((e) => {
      const { response } = e;
      const statusMessage = response.data?.msg;
      const statusCode = response?.status || 500;
      return Promise.reject({
        statusCode,
        statusMessage,
      });
    });
}
