import { centeredHeader, marketingFooter } from "./layout.js";
import { getFormData, updateFormData } from "../state.js";
import { initCurrencyDropdown } from "../utils/currency-dropdown.js";
import { initPlacesAutocomplete } from "../utils/google-places.js";
import { getStepNumber, renderProgressBar, syncProgressBar } from "./form-utils.js";

const formLocationView = {
  id: "form-location",
  path: "/forms/location",
  title: "Location and Currency",
  layout: "forms",
  template() {
    const step = getStepNumber("form-location");
    return `
      ${centeredHeader()}
      ${renderProgressBar(step)}

      <main class="main-content" data-form-step="${step}">
        <a href="javascript:history.back()" class="back-arrow" aria-label="Volver atrás">&#8592;</a>

        <section class="section location-section">
          <div class="container_location">
            <span class="container-top-right">Required</span>
            <h1 for="nombre">Location</h1>
            <p>Select the location you are planning to sell, it can be a country, city, street.</p>

            <form class="text-form-location" id="location-form" autocomplete="off">
              <input type="text" id="location" name="location" required placeholder="Write here" autocomplete="off" />

              <input type="hidden" id="place_id" name="place_id" />
              <input type="hidden" id="lat" name="lat" />
              <input type="hidden" id="lng" name="lng" />
              <input type="hidden" id="formatted_address" name="formatted_address" />
              <input type="hidden" id="display_name" name="display_name" />
              <input type="hidden" id="types" name="types" />
            </form>
          </div>
        </section>

        <section class="section description-section">
          <div class="container">
            <span class="container-top-right">Required</span>
            <h1 class="h1-description">Currency</h1>
            <p>Select the currency you are planning to sell.</p>

            <form class="text-form" id="currency-form" data-next="/forms/selling">
              <div class="custom-dropdown" id="currency-dropdown">
                <input type="text" id="currency-helper" style="opacity:0; position:absolute; pointer-events:none; width:0; height:0; margin:0; padding:0;" required />
                <input type="hidden" name="currency" id="currency-value" value="" />

                <div class="dropdown-selected" tabindex="0">
                  <span id="dropdown-value">Select one</span>
                  <span class="dropdown-arrow">&#9662;</span>
                </div>

                <div class="dropdown-list" id="dropdown-list">
                  <input type="text" class="dropdown-search" placeholder="Search" />
                  <div class="dropdown-options"></div>
                </div>
              </div>

              <button type="submit" class="btn">Next</button>
            </form>
          </div>
        </section>
      </main>

      ${marketingFooter()}
    `;
  },
  mount({ navigate }) {
    const step = getStepNumber("form-location");
    syncProgressBar(step);

    const data = getFormData();
    const locationInput = document.getElementById("location");
    const locationForm = document.getElementById("location-form");
    const currencyForm = document.getElementById("currency-form");
    const dropdown = document.getElementById("currency-dropdown");
    const currencyValue = document.getElementById("currency-value");
    const currencyHelper = document.getElementById("currency-helper");

    const hidden = {
      place_id: document.getElementById("place_id"),
      lat: document.getElementById("lat"),
      lng: document.getElementById("lng"),
      formatted: document.getElementById("formatted_address"),
      display: document.getElementById("display_name"),
      types: document.getElementById("types")
    };

    const clearHidden = () => {
      Object.values(hidden).forEach((el) => el && (el.value = ""));
      updateFormData({
        locationPlaceId: "",
        locationLat: "",
        locationLng: "",
        locationFormatted: "",
        locationDisplayName: "",
        locationTypes: []
      });
    };

    if (locationInput) {
      locationInput.value = data.location || "";
      locationInput.addEventListener("input", () => {
        updateFormData({ location: locationInput.value });
        clearHidden();
      });
      locationInput.addEventListener("blur", () => {
        updateFormData({ location: locationInput.value });
      });
    }

    const dropdownController = initCurrencyDropdown(dropdown, {
      value: data.currency || "",
      onChange(code) {
        updateFormData({ currency: code });
      }
    });

    if (currencyHelper && data.currency) {
      currencyHelper.value = data.currency;
    }

    locationForm?.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    currencyForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!locationInput.value.trim()) {
        locationInput.reportValidity();
        locationInput.focus();
        return;
      }
      if (!currencyValue.value.trim()) {
        if (currencyHelper) {
          currencyHelper.value = "";
          currencyHelper.focus();
        }
        return;
      }
      if (!hidden.place_id.value) {
        alert("Selecciona una opción de la lista para que la ubicación sea inequívoca (Google).");
        locationInput.focus();
        return;
      }
      updateFormData({
        location: locationInput.value.trim(),
        currency: currencyValue.value.trim()
      });
      navigate("/forms/selling");
    });

    if (locationInput) {
      initPlacesAutocomplete(locationInput, {
        onSelect(place) {
          if (!place || !place.place_id) {
            clearHidden();
            return;
          }
          const lat = place.geometry?.location?.lat?.() ?? "";
          const lng = place.geometry?.location?.lng?.() ?? "";
          if (hidden.place_id) hidden.place_id.value = place.place_id || "";
          if (hidden.lat) hidden.lat.value = lat;
          if (hidden.lng) hidden.lng.value = lng;
          if (hidden.formatted) hidden.formatted.value = place.formatted_address || "";
          if (hidden.display) hidden.display.value = place.name || "";
          if (hidden.types) hidden.types.value = (place.types || []).join(",");
          updateFormData({
            location: locationInput.value || "",
            locationPlaceId: place.place_id || "",
            locationLat: lat,
            locationLng: lng,
            locationFormatted: place.formatted_address || "",
            locationDisplayName: place.name || "",
            locationTypes: place.types || []
          });
        }
      }).catch((error) => {
        console.error("Google Places initialization failed:", error);
      });
    }
  }
};

export default formLocationView;
