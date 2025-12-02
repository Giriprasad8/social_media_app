export interface Post {
  id: string;
  body: string;
  type: "offering" | "request";
  lat: number;
  lng: number;
  author: {
    id: string;
    name: string;
  };
}
