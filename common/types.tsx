export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  author?: string;
}

export interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

export type Quote = {
  id: number;
  text: string;
  person: string;
};
