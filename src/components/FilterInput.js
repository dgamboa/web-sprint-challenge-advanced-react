import React, { useState } from "react";

export default function FilterInput({ plants, filterPlants, getPlants }) {
  const [search, setSearch] = useState("");
  
  const handleChanges = (e) => {
    setSearch(e.target.value)
    const searchTerm = search.toLowerCase();
    const filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(searchTerm) || plant.description.toLowerCase().includes(searchTerm));
    
    e.target.value !== "" ? filterPlants(filteredPlants) : getPlants();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="search"
        value={search}
        placeholder="Search for a plant"
        onChange={handleChanges}
      />
    </form>
  )
}