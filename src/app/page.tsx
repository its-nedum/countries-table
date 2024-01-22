"use client"
import React from "react"
import { data } from "./data/countryData";
import CountryTable from "./components/CountryTable"

export default function Home() {
  return (
    <div className="my-16">
      <p className="text-2xl mb-2 text-center">COUNTRY DATA</p>
      <CountryTable countries={data.countries} />
    </div>
  )
}
