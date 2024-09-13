export interface IMapSearchedData {
  result: {
    place_id: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    plus_code: {
      compound_code: string;
      global_code: string;
    };
    compound: {
      district: string;
      commune: string;
      province: string;
    };
    name: string;
    url: string;
    types: string[];
    status: string;
  };
  status: string;
}
