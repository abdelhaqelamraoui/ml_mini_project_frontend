"use client";
import { FC } from "react";

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-gray-600">
            © {currentYear} Moroccan Car Price Predictor. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with ❤️ by{" "}
            <a
              href="https://www.ostordev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ostordev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
