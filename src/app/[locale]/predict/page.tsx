"use client";

import { api } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Marque {
  id: number;
  name: string;
}

interface Modele {
  id: number;
  name: string;
}

interface CarFormData {
  marque: string;
  modele: string;
  annee_modele: number;
  origine: string;
  premiere_main: boolean;
  etat: string;
  boite_de_vitesses: string;
  type_de_carburant: string;
  puissance_fiscale: number;
  nombre_de_portes: number;
  kilometrage: number;
  abs: boolean;
  airbags: boolean;
  cd_mp3_bluetooth: boolean;
  camera_de_recul: boolean;
  climatisation: boolean;
  esp: boolean;
  jantes_aluminium: boolean;
  limiteur_de_vitesse: boolean;
  ordinateur_de_bord: boolean;
  radar_de_recul: boolean;
  regulateur_de_vitesse: boolean;
  sieges_cuir: boolean;
  systeme_de_navigation_gps: boolean;
  toit_ouvrant: boolean;
  verrouillage_centralise_a_distance: boolean;
  vitres_electriques: boolean;
}

export default function PredictPage() {
  const t = useTranslations("PredictPage");
  const [marques, setMarques] = useState<Marque[]>([]);
  const [modeles, setModeles] = useState<Modele[]>([]);
  const [selectedMarqueId, setSelectedMarqueId] = useState<number>();
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CarFormData>({
    marque: "",
    modele: "",
    annee_modele: 2021,
    origine: "Maroc",
    premiere_main: true,
    etat: "Très bon",
    boite_de_vitesses: "Manuelle",
    type_de_carburant: "Essence",
    puissance_fiscale: 6,
    nombre_de_portes: 5,
    kilometrage: 45000,
    abs: true,
    airbags: true,
    cd_mp3_bluetooth: true,
    camera_de_recul: false,
    climatisation: true,
    esp: true,
    jantes_aluminium: false,
    limiteur_de_vitesse: false,
    ordinateur_de_bord: true,
    radar_de_recul: false,
    regulateur_de_vitesse: false,
    sieges_cuir: false,
    systeme_de_navigation_gps: false,
    toit_ouvrant: false,
    verrouillage_centralise_a_distance: true,
    vitres_electriques: true,
  });

  useEffect(() => {
    // Fetch marques
    api.get("/marques")
      .then((res) => {
        // console.log(res.data);        
        setMarques(res.data)
      })
      .catch((error) => console.error("Error fetching marques:", error));
  }, []);

  useEffect(() => {
    if (selectedMarqueId) {
      // Fetch modeles for selected marque
      api.get(`/marques/${selectedMarqueId}/modeles`)
        .then((res) => setModeles(res.data))
        .catch((error) => console.error("Error fetching modeles:", error));
    }
  }, [selectedMarqueId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/predict", formData);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error making prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Car Price Prediction</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Marque Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marque</label>
              <select
                name="marque"
                value={formData.marque}
                onChange={(e) => {
                  setSelectedMarqueId(e.target.value);
                  handleInputChange(e);
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select a marque</option>
                {marques.map((marque) => (
                  <option key={marque.id} value={marque.id}>
                    {marque.marque}
                  </option>
                ))}
              </select>
            </div>

            {/* Modele Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modele</label>
              <select
                name="modele"
                value={formData.modele}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                disabled={!selectedMarqueId}
              >
                <option value="">Select a modele</option>
                {modeles.map((modele, i) => (
                  <option key={i} value={modele}>
                    {modele}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Année Modèle</label>
              <select
                name="annee_modele"
                value={formData.annee_modele}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Origine</label>
              <input
                type="text"
                name="origine"
                value={formData.origine}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">État</label>
              <select
                name="etat"
                value={formData.etat}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="Très bon">Très bon</option>
                <option value="Bon">Bon</option>
                <option value="Moyen">Moyen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boîte de vitesses</label>
              <select
                name="boite_de_vitesses"
                value={formData.boite_de_vitesses}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="Manuelle">Manuelle</option>
                <option value="Automatique">Automatique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de carburant</label>
              <select
                name="type_de_carburant"
                value={formData.type_de_carburant}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="Essence">Essence</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybride">Hybride</option>
                <option value="Électrique">Électrique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Puissance fiscale</label>
              <input
                type="number"
                name="puissance_fiscale"
                value={formData.puissance_fiscale}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de portes</label>
              <input
                type="number"
                name="nombre_de_portes"
                value={formData.nombre_de_portes}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kilométrage</label>
              <input
                type="number"
                name="kilometrage"
                value={formData.kilometrage}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Checkboxes Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Équipements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(formData)
                .filter(([key, value]) => typeof value === 'boolean')
                .map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={key}
                      name={key}
                      checked={value}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={key} className="ml-2 block text-sm text-gray-700">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </label>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Calculating..." : "Predict Price"}
            </button>
          </div>

          {prediction !== null && (
            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <h3 className="text-lg font-medium text-green-800">Estimated Price</h3>
              <p className="text-2xl font-bold text-green-600">{prediction.prix.toLocaleString()} MAD</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 