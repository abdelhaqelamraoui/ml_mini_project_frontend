"use client";
import { useTranslations } from "next-intl";

export default function AboutPage() {
   const t = useTranslations("AboutPage");
   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
               <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {t("title")}
               </h1>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {t("subtitle")}
               </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t("whatWeDo.title")}
               </h2>
               <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="mb-6">{t("whatWeDo.description")}</p>
                  <ul className="list-disc pl-6 space-y-3">
                     <li>{t("whatWeDo.features.1")}</li>
                     <li>{t("whatWeDo.features.2")}</li>
                     <li>{t("whatWeDo.features.3")}</li>
                  </ul>
               </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
               <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t("howItWorks.title")}
               </h2>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                     <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 text-xl font-bold">1</span>
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {t("howItWorks.steps.1.title")}
                     </h3>
                     <p className="text-gray-600">
                        {t("howItWorks.steps.1.description")}
                     </p>
                  </div>
                  <div className="text-center">
                     <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 text-xl font-bold">2</span>
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {t("howItWorks.steps.2.title")}
                     </h3>
                     <p className="text-gray-600">
                        {t("howItWorks.steps.2.description")}
                     </p>
                  </div>
                  <div className="text-center">
                     <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 text-xl font-bold">3</span>
                     </div>
                     <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {t("howItWorks.steps.3.title")}
                     </h3>
                     <p className="text-gray-600">
                        {t("howItWorks.steps.3.description")}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
