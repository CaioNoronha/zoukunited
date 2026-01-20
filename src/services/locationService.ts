export type PlaceSuggestion = {
  id: string;
  description: string;
};

export async function fetchPlaceSuggestions(
  query: string,
  languageCode: "en" | "pt" | "es" = "pt"
): Promise<PlaceSuggestion[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return [];

  const url = "https://places.googleapis.com/v1/places:autocomplete";
  const body = {
    input: query,
    languageCode,
    includedPrimaryTypes: ["locality", "country"],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data?.suggestions)) return [];

    return data.suggestions
      .map((suggestion: any) => {
        const prediction = suggestion.placePrediction;
        if (!prediction) return null;
        const id = prediction.placeId as string | undefined;
        const rawText = prediction.text?.text as string | undefined;
        if (!id || !rawText) return null;

        const parts = rawText
          .split(",")
          .map((part: string) => part.trim())
          .filter(Boolean);
        const city = parts[0] ?? rawText;
        const country = parts.length > 1 ? parts[parts.length - 1] : "";
        const description = country ? `${city}, ${country}` : city;

        return { id, description };
      })
      .filter(Boolean) as PlaceSuggestion[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
