"use client";

import { api } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Marque {
  id: number;
  nom: string;
}

interface Modele {
  id: number;
  nom: string;
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
  const [selectedMarqueId, setSelectedMarqueId] = useState<number | undefined>();
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
    nombre_de_portes: 4,
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
    api.get("/marques")
      .then((res) => {
        setMarques(res.data)
      })
      .catch((error) => console.error("Error fetching marques:", error));
  }, []);

  useEffect(() => {
    if (selectedMarqueId) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("title")}</h1> */}
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Marque Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.marque")}</label>
                  <div className="relative">
                    <select
                      name="marque"
                      value={formData.marque}
                      onChange={(e) => {
                        const id = parseInt(e.target.value);
                        setSelectedMarqueId(id);
                        handleInputChange(e);
                      }}
                      className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all bg-white appearance-none"
                      required
                    >
                      <option value="">{t("fields.marque")}</option>
                      {marques.map((marque) => (
                        <option key={marque.id} value={marque.id}>
                          {marque.nom}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Modele Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.modele")}</label>
                  <div className="relative">
                    <select
                      name="modele"
                      value={formData.modele}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all disabled:bg-gray-50 disabled:border-gray-200 appearance-none"
                      required
                      disabled={!selectedMarqueId}
                    >
                      <option value="">{t("fields.modele")}</option>
                      {modeles.map((modele) => (
                        <option key={modele.id} value={modele.nom}>
                          {modele.nom}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Year Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.annee_modele")}</label>
                  <div className="relative">
                    <select
                      name="annee_modele"
                      value={formData.annee_modele}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all appearance-none"
                      required
                    >
                      {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.origine")}</label>
                  <input
                    type="text"
                    name="origine"
                    value={formData.origine}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.etat")}</label>
                  <div className="relative">
                    <select
                      name="etat"
                      value={formData.etat}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all appearance-none"
                      required
                    >
                      <option value="Très bon">{t("conditions.tresBon")}</option>
                      <option value="Bon">{t("conditions.bon")}</option>
                      <option value="Moyen">{t("conditions.moyen")}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.boite_de_vitesses")}</label>
                  <div className="relative">
                    <select
                      name="boite_de_vitesses"
                      value={formData.boite_de_vitesses}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all appearance-none"
                      required
                    >
                      <option value="Manuelle">{t("transmission.manuelle")}</option>
                      <option value="Automatique">{t("transmission.automatique")}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.type_de_carburant")}</label>
                  <div className="relative">
                    <select
                      name="type_de_carburant"
                      value={formData.type_de_carburant}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all appearance-none"
                      required
                    >
                      <option value="Essence">{t("fuelTypes.essence")}</option>
                      <option value="Diesel">{t("fuelTypes.diesel")}</option>
                      <option value="Hybride">{t("fuelTypes.hybride")}</option>
                      <option value="Électrique">{t("fuelTypes.electrique")}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.puissance_fiscale")}</label>
                  <input
                    type="number"
                    name="puissance_fiscale"
                    value={formData.puissance_fiscale}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.nombre_de_portes")}</label>
                  <div className="relative">
                    <select
                      name="nombre_de_portes"
                      value={formData.nombre_de_portes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all appearance-none"
                      required
                    >
                      <option value="4" selected>4</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("fields.kilometrage")}</label>
                  <input
                    type="number"
                    name="kilometrage"
                    value={formData.kilometrage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Checkboxes Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-5">{t("equipmentTitle")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                  {Object.entries(formData)
                    .filter(([key, value]) => typeof value === 'boolean')
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-3  px-0 py-3 rounded-md hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          id={key}
                          name={key}
                          checked={value}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors"
                        />
                        <label htmlFor={key} className="text-sm text-gray-700 select-none">
                          {t(`equipment.${key}`)}
                        </label>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-6 rounded-md text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? t("calculating") : t("calculateButton")}
                </button>
              </div>
            </form>
          </div>

          {/* Price Prediction Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-xl p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t("estimatedPrice")}</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                {prediction && prediction.prix.toLocaleString()} MAD
              </p>
              <div className="text-sm text-gray-500">
                <p>{t("priceNote")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 