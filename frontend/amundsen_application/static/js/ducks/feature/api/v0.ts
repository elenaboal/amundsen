import axios, { AxiosResponse } from 'axios';
import * as qs from 'simple-query-string';

import { FeatureCode, FeatureMetadata } from 'interfaces/Feature';

const FEATURE_BASE = '/api/metadata/v0';

export type GetFeatureAPI = {
  msg: string;
  featureData: FeatureMetadata;
};
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

export type GetFeatureCodeAPI = {
  msg: string;
  featureCode: FeatureCode;
};
export function getFeatureCode(key: string) {
  const queryParams = qs.stringify({ key });
  return axios
    .get(`${FEATURE_BASE}/get_feature_generation_code?${queryParams}`)
    .then((response: AxiosResponse<GetFeatureCodeAPI>) => {
      const { data, status } = response;
      return {
        featureCode: data,
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
