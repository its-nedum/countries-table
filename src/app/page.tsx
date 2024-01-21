"use client"
import React from "react"
import { data } from "./data/countryData";
import CountryTable from "./components/CountryTable"

export default function Home() {
  return (
    <CountryTable countries={data.countries} />
  )
}
