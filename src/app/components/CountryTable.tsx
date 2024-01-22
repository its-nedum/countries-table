"use client"
import React, { useState, useEffect } from 'react';
import {
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { IoFunnelOutline } from "react-icons/io5";
import { AiOutlineSortAscending } from "react-icons/ai";
import { CountryData, CountryTableProps } from "../interfaces"

function createData(
    id: string,
    code: string,
    name: string,
    nameUn: string,
    continent: string,
    hasStates: boolean,
  ) {
    return { id, code, name, nameUn, continent, hasStates };
  }


const CountryTable = ({ countries }: CountryTableProps) => { 
    const [sortedCountries, setSortedCountries] = useState<CountryData[]>(countries)
    const [sortOrder, setSortOrder] = useState('ASC');
    const [uniqueContinent, setUniqueContinent] = useState<string[]>([]);
    const [selectedContinent, setSelectedContinent] = useState<string>("");
    const [hasStates, setHasStates] = useState<string>("")
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [stateAnchorEl, setStateAnchorEl] = useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const hasStatesClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setStateAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleStateClose = () => {
      setStateAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const openHasStates = Boolean(stateAnchorEl);

    const id = open ? 'simple-popover' : undefined;
    const idx = openHasStates ? 'simple-popover' : undefined;

    // Prepare rows data for the table
    const rows: CountryData[] = sortedCountries.map((country) => {
        const { id, code, name, nameUn, continent, hasStates } = country;
        return createData(
          id,
          code,
          name,
          nameUn,
          continent,
          hasStates,
        );
    });

    /**
     * Select out unique continent on page load
     */
    useEffect(() => { 
      const uniqueContinents = Array.from(new Set(countries.map(country => country.continent)));
      setUniqueContinent(uniqueContinents)
     }, [countries])

    
  /**
   * This method sorts the country list data in ascending and
   * descending order by converting each consecutive countries 
   * to lower case to ensure case-insensitive then compares
   * them and update the sorted countries state.
   */ 
  const handleSortingOperations = () => {
    const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';

    const sorted = [...sortedCountries].sort((a, b) => {
      const first_name = a.nameUn.toLocaleLowerCase();
      const second_name = b.nameUn.toLocaleLowerCase();

      if (newOrder === 'ASC') {
        return first_name > second_name ? 1 : -1;
      } else {
        return second_name > first_name ? 1 : -1;
      }
    });

    setSortedCountries(sorted);
    setSortOrder(newOrder);
  };

  /**
   * This method filters the countries data based on the selected
   * continent characters
   */
  const handlesContinentFilter = (value: string) => {
    const filtered = [...countries].filter((country) => country.continent === value);
    setSelectedContinent(value);
    setSortedCountries(filtered);
  }

  /**
   * This method filters the countries data based on the selected
   * hasStates value either true or false
   */
  const handlesHasStatesFilter = (value: string) => {
    const filtered = [...countries].filter((country) => country.hasStates === JSON.parse(value));
    setHasStates(value);
    setSortedCountries(filtered);
  }

  return (
    <div className="container mx-auto">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold" align="left">ID</TableCell>
              <TableCell className="font-semibold" align="left">Code</TableCell>
              <TableCell className="font-semibold" align="left">Name</TableCell>
              <TableCell className="font-semibold" align="left">
                <div className="flex items-center">
                  <span className="mr-2">NameUn</span>
                  <AiOutlineSortAscending 
                    className="cursor-pointer" 
                    onClick={() => handleSortingOperations()}
                  />
                </div>
              </TableCell>
              <TableCell className="font-semibold" align="left">
                <div className="flex items-center">
                  <span className="mr-2">Continent</span>
                  <div aria-describedby={id} onClick={(e) => handleClick(e)}>
                    <IoFunnelOutline className="cursor-pointer"/>
                  </div>
                  <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                <FormControl fullWidth className="min-w-28">
                  <InputLabel id="select-id">Filter By</InputLabel>
                  <Select
                  value={selectedContinent}
                  label="continent"
                  onChange={(e) => handlesContinentFilter(e.target.value)}
                  className='min-w-28'
                  >
                  {
                    uniqueContinent && uniqueContinent.map((continent, index) => (
                      <MenuItem key={index} value={continent}>{continent}</MenuItem>
                    ))
                  }
                  </Select>
                </FormControl>
                </Popover>
                </div>
              </TableCell>
              <TableCell className="font-semibold" align="left">
                <div className="flex items-center">
                  <span className="mr-2">hasStates</span>
                  <div aria-describedby={idx} onClick={(e) => hasStatesClick(e)}>
                    <IoFunnelOutline className="cursor-pointer" />
                  </div>
                  <Popover
                  id={idx}
                  open={openHasStates}
                  anchorEl={stateAnchorEl}
                  onClose={handleStateClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                <FormControl fullWidth className="min-w-28">
                  <InputLabel id="select-label">Filter By</InputLabel>
                  <Select
                  value={hasStates}
                  label="hasStates"
                  onChange={(e) => handlesHasStatesFilter(e.target.value)}
                  >
                    <MenuItem value={"true"}>{"true"}</MenuItem>
                    <MenuItem value={"false"}>{"false"}</MenuItem>
                  </Select>
                </FormControl>
                </Popover>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.code}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.nameUn}</TableCell>
                <TableCell align="left">{row.continent}</TableCell>
                <TableCell align="left">{row.hasStates ? "true" : "false"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CountryTable