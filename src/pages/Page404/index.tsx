import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/* This example requires Tailwind CSS v2.0+ */
export default function Page404() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
                <p className="mt-1 text-base text-gray-500">{t("please_check_url")}</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <div
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {t("go_back")}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
