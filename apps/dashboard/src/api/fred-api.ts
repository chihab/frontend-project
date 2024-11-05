import { DateRange } from "@/components/date-range-picker";

const API_KEY = import.meta.env.VITE_FRED_API_KEY;
const BASE_URL = import.meta.env.VITE_FRED_API_URL;

export interface FREDData {
  date: string;
  value: number;
}

interface FREDDataResponse {
  observations: { date: string; value: string }[];
}

export const fetchFREDSeriesData = async (
  seriesId: string,
  frequency: string,
  dateRange?: DateRange,
): Promise<FREDData[]> => {
  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: API_KEY,
    frequency: frequency,
    file_type: "json",
  });

  if (dateRange?.from && dateRange?.to) {
    params.set("observation_start", dateRange.from.split("T")[0]);
    params.set("observation_end", dateRange.to.split("T")[0]);
  }

  const response = await fetch(`${BASE_URL}/observations?${params.toString()}`);
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error_message);
  }
  const data = (await response.json()) as FREDDataResponse;
  return data.observations
    .filter((obs) => obs.value !== ".")
    .map((obs) => {
      const parsedValue = parseFloat(obs.value);
      return {
        date: obs.date,
        value: isNaN(parsedValue) ? 0 : parsedValue,
      };
    });
};

export interface FREDSeries {
  id: string;
  title: string;
}
export const fetchFREDSeries = async (query: string, limit = 10) => {
  const response = await fetch(
    `${BASE_URL}/search?search_text=${encodeURIComponent(
      query,
    )}&api_key=${API_KEY}&file_type=json&limit=${limit}`,
  );
  if (!response.ok) throw new Error("Failed to fetch FRED series");
  return (await response.json()).seriess;
};
