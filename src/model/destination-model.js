export default class DestinationModel {
  #commonApiService = null;

  constructor(commonApiService) {
    this.#commonApiService = commonApiService;
  }

  async getDestinationName(nameDestination) {
    try{
      const response = await this.#commonApiService.getDestination(nameDestination);
      return response;
    }catch{
      throw new Error('Can\'t get destination');
    }
  }
}
