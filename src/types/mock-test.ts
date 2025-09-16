export interface MockTest {
  id: string;
  name: string;
  institute: "TIME" | "IMS" | "CatKing" | "CL";
  dateTaken: string;
  overallScore: number;
  overallPercentile: number;
  varcScore: number;
  varcPercentile: number;
  dilrScore: number;
  dilrPercentile: number;
  qaScore: number;
  qaPercentile: number;
}

export interface SectionalTest {
  id: string;
  type: "sectional";
  name: string;
  section: string; // restrict sections if you want
  score: number;
  percentile: number;
  dateTaken: string;
}
