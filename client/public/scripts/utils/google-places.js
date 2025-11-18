const GOOGLE_API_KEY = "AIzaSyDyDvXyzfN67dloGVMlU6dI5MnnNascNQc";
const GOOGLE_PLACES_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&v=weekly`;

let loaderPromise = null;

export const loadPlacesLibrary = () => {
  if (loaderPromise) return loaderPromise;
  loaderPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve(window.google);
      return;
    }
    const script = document.createElement("script");
    script.src = GOOGLE_PLACES_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return loaderPromise;
};

export const initPlacesAutocomplete = async (input, { onSelect } = {}) => {
  if (!input) return null;
  const google = await loadPlacesLibrary();
  if (!google?.maps?.places) return null;
  const autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ["place_id", "name", "formatted_address", "geometry", "types"]
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    onSelect?.(place || null);
  });

  return autocomplete;
};
