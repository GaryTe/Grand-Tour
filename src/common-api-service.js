import ApiService from './framework/api-service.js';

import { Method } from './utils/const/api-service.js';

export default class CommonApiService extends ApiService {
  async getPoints() {
    const response = await this._load({url: 'points'});

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async updatePoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(id) {
    const response = await this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async getOffers(typePoint) {
    const response = await this._load({url: `offers?typePoint=${typePoint}`});

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async getDestination(nameDestination) {
    const response = await this._load({url: `destinations?nameDestination=${nameDestination}`});

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
