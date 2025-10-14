// ../JS/location_autocomplete.js
window.initPlaceAutocomplete = function initPlaceAutocomplete () {
  const input = document.getElementById('location');
  const form  = document.getElementById('location-form');
  if (!input) return;

  // Asegura editable siempre
  input.readOnly = false;
  input.disabled = false;

  // Evita submit accidental (Enter) y pérdidas de foco
  if (form) form.addEventListener('submit', (e) => e.preventDefault());
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });

  // Si Google no cargó, no hacemos nada más: el usuario puede escribir normal
  if (!window.google || !google.maps?.places) return;

  const ac = new google.maps.places.Autocomplete(input, {
    fields: ['place_id','name','formatted_address','geometry','types'],
    // componentRestrictions: { country: ['es'] },
  });

  ac.addListener('place_changed', () => {
    const place = ac.getPlace();
    if (!place || !place.place_id || !place.geometry) { clearHidden(); return; }
    writeHidden(place);
  });

  input.addEventListener('input', () => setHiddenValue('place_id',''));
  input.addEventListener('blur', () => {
    if (typeof updateFormData === 'function') updateFormData({ location: input.value || '' });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const currencyForm = document.getElementById('currency-form');
    if (currencyForm) {
      currencyForm.addEventListener('submit', (e) => {
        const pid = document.getElementById('place_id')?.value;
        if (!pid) { e.preventDefault(); input.focus(); alert('Selecciona una opción de la lista para que la ubicación sea inequívoca (Google).'); }
      });
    }
  });
};

/* helpers */
function setHiddenValue(id, v){ const el=document.getElementById(id); if (el) el.value = v ?? ''; }
function clearHidden(){
  ['place_id','lat','lng','formatted_address','display_name','types'].forEach(k=>setHiddenValue(k,''));
  if (typeof updateFormData==='function') updateFormData({
    location_place_id:'',location_lat:'',location_lng:'',location_formatted:'',
    location_display_name:'',location_types:[]
  });
}
function writeHidden(place){
  const pid=place?.place_id||'';
  const lat=place?.geometry?.location?.lat ? place.geometry.location.lat() : '';
  const lng=place?.geometry?.location?.lng ? place.geometry.location.lng() : '';
  const formatted=place?.formatted_address||'';
  const name=place?.name||'';
  const types=Array.isArray(place?.types)?place.types:[];
  setHiddenValue('place_id',pid);
  setHiddenValue('lat',lat);
  setHiddenValue('lng',lng);
  setHiddenValue('formatted_address',formatted);
  setHiddenValue('display_name',name);
  setHiddenValue('types',types.join(','));
  if (typeof updateFormData==='function') updateFormData({
    location: document.getElementById('location')?.value || '',
    location_place_id:pid, location_lat:lat, location_lng:lng,
    location_formatted:formatted, location_display_name:name, location_types:types
  });
}
