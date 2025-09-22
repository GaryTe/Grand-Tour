export default class RouteModel {
  #commonApiService = null;

  constructor(commonApiService) {
    this.#commonApiService = commonApiService;
  }

  async getRouteName(nameRoute) {
    try{
      const response = await this.#commonApiService.getOffers(nameRoute);
      return response;
    }catch{
      throw new Error('Can\'t get offers');
    }
  }
}
