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
      <header className="bg-primary mx-auto flex max-w-screen-2xl flex-row items-center justify-between py-1 px-12 bg-primary">
         <Link lang={locale} href="/">
            <div className="flex flex-row items-center">
               <div className="mb-2 h-14 w-14">
                  <Image
                     src="/mcp.png"
                     alt="Logo"
                     width={80}
                     height={80}
                     className="h-full object-contain"
                     priority
                  />
               </div>
               <strong className="mx-2 select-none">Morrocan Price Predictor</strong>
            </div>
         </Link>
         <div className="flex flex-row items-center gap-3">
            <nav className="mr-10 inline-flex gap-5">
               <Link lang={locale} href={`/about`}>
                  {t("About")}
               </Link>
            </nav>
            <LangSwitcher />
            
         </div>
      </header>
   );
};
