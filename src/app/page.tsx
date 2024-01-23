"use client"
import React from "react";
import { data } from "./data/countryData";
import CountryTable from "./components/CountryTable";

export default function Home() {
  return (
    <div className="my-16">
      <CountryTable countries={data.countries} />
    </div>
  )
}
