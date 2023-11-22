export type CityAPI = {
  AdministrativeArea: { ID: string; LocalizedName: string };
  Country: {
    ID: string;
    LocalizedName: string;
  };
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  Version: number;
};

export type City = {
  country: string;
  key: string;
  city: string;
};
