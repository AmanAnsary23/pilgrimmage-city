import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const center = { lat: 27.579, lng: 77.699 }; // Mathura center

export default function ItineraryPage() {
  const [pandits, setPandits] = useState([]);
  const [temples, setTemples] = useState([]);
  const [lunchSpots, setLunchSpots] = useState([]);

  const [selectedPandit, setSelectedPandit] = useState("");
  const [selectedTemples, setSelectedTemples] = useState([]);
  const [selectedLunch, setSelectedLunch] = useState("");

  const [mapPandit, setMapPandit] = useState(null);
  const [mapTemples, setMapTemples] = useState([]);
  const [mapLunch, setMapLunch] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: ["marker"],
  });

  const [aiSummary, setAiSummary] = useState("");
  const [mapRef, setMapRef] = useState(null);

  const markerRefs = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/pandits/")
      .then((res) => setPandits(res.data));
    axios
      .get("http://localhost:8080/api/temples/")
      .then((res) => setTemples(res.data));
    axios
      .get("http://localhost:8080/api/lunchspots/")
      .then((res) => setLunchSpots(res.data));
  }, []);

  const handleTempleSelect = (id) => {
    if (selectedTemples.includes(id)) {
      setSelectedTemples(selectedTemples.filter((t) => t !== id));
    } else {
      setSelectedTemples([...selectedTemples, id]);
    }
  };

  const handleGenerate = async () => {
    const panditObj = pandits.find((p) => p.id == selectedPandit);
    const templeObjs = temples.filter((t) => selectedTemples.includes(t.id));
    const lunchObj = lunchSpots.find((l) => l.id == selectedLunch);

    setMapPandit(panditObj);
    setMapTemples(templeObjs);
    setMapLunch(lunchObj);

    if (!panditObj || templeObjs.length === 0 || !lunchObj) {
      console.log("Missing fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/ai/summary", {
        pandit: panditObj.name,
        temples: templeObjs.map((t) => t.name),
        lunchSpot: lunchObj.name,
      });
      setAiSummary(res.data.summary);
    } catch (err) {
      console.log("AI Summary Error:", err);
    }
  };

  
  useEffect(() => {
    if (!mapRef) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    
    markerRefs.current.forEach((m) => (m.map = null));
    markerRefs.current = [];

    
    if (mapPandit) {
      const m = new AdvancedMarkerElement({
        map: mapRef,
        position: { lat: mapPandit.latitude, lng: mapPandit.longitude },
        title: mapPandit.name,
      });
      markerRefs.current.push(m);
    }

    
    mapTemples.forEach((t) => {
      const m = new AdvancedMarkerElement({
        map: mapRef,
        position: { lat: t.latitude, lng: t.longitude },
        title: t.name,
      });
      markerRefs.current.push(m);
    });

   
    if (mapLunch) {
      const m = new AdvancedMarkerElement({
        map: mapRef,
        position: { lat: mapLunch.latitude, lng: mapLunch.longitude },
        title: mapLunch.name,
      });
      markerRefs.current.push(m);
    }
  }, [mapRef, mapPandit, mapTemples, mapLunch]);

  if (!isLoaded) return <p>Loading map…</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Pilgrimage City Itinerary Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
          <div>
            <label className="block font-semibold mb-2">Pandit</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={selectedPandit}
              onChange={(e) => setSelectedPandit(e.target.value)}
            >
              <option value="">Select Pandit</option>
              {pandits.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Temples</label>
            <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
              {temples.map((t) => (
                <label key={t.id} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedTemples.includes(t.id)}
                    onChange={() => handleTempleSelect(t.id)}
                  />
                  <span>{t.name}</span>
                </label>
              ))}
            </div>
          </div>

          
          <div>
            <label className="block font-semibold mb-2">Lunch Spot</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={selectedLunch}
              onChange={(e) => setSelectedLunch(e.target.value)}
            >
              <option value="">Select Lunch Spot</option>
              {lunchSpots.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Generate Itinerary
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <GoogleMap
            zoom={13}
            center={center}
            mapContainerStyle={{ height: "500px", width: "100%" }}
            onLoad={(map) => setMapRef(map)}
          ></GoogleMap>
        </div>
      </div>

      {aiSummary && (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-3">Itinerary</h2>
          <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
        </div>
      )}
    </div>
  );
}
