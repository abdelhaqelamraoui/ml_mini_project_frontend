"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import LangSwitcher from "./lang-switcher";

interface Props {
   locale: string;
}

export const Header: FC<Props> = ({ locale }) => {
   const t = useTranslations("");
   return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               {/* Logo and Brand */}
               <Link lang={locale} href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="relative h-18 w-18">
                     <Image
                        src="/mcp.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                     />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xl font-bold text-gray-400">Moroccan Car Price-Predictor</span>
                  </div>
               </Link>

               {/* Navigation and Language Switcher */}
               <div className="flex items-center space-x-8">
                  <nav className="hidden md:flex items-center space-x-6">
                     <Link 
                        lang={locale} 
                        href="/"
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                     >
                        {t("Header.home")}
                     </Link>
                     <Link 
                        lang={locale} 
                        href="/predict"
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                     >
                        {t("Header.predict")}
                     </Link>
                     <Link 
                        lang={locale} 
                        href="/about"
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                     >
                        {t("Header.about")}
                     </Link>
                  </nav>
                  <div className="flex items-center space-x-4">
                     <LangSwitcher />
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};
