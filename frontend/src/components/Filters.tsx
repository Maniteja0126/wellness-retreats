import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { DatePicker } from "./ui/datePicker";
import { FilterIcon } from "lucide-react";
import { Retreat } from "@/types";

interface FiltersProps {
  handleSearch: (searchTerm: string) => void;
  handleFilterLocation: (type: string) => void;
  retreats: Retreat[];
  handleDateChange: (date: Date | null) => void; 
}


const Filters: React.FC<FiltersProps> = ({
  handleSearch,
  handleFilterLocation,
  retreats,
  handleDateChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = (type  :string) => {
    handleFilterLocation(type);
    setDropdownOpen(false);
  };


  const uniqueRetreatLocations = [
    ...new Set(retreats.map((retreat) => retreat.location)),
  ];
  
  return (
    <div className="top-1 w-full z-50 bg-secondary-background-color border border-r shadow sha">
      <div className="h-20 flex items-center justify-between px-8">
        <div>
          <DatePicker onSelect={handleDateChange} />
        </div>
        <div>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="relative flex items-center gap-4 mr-10">
          <button onClick={toggleDropdown} className="flex items-center">
            <FilterIcon />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              <div className="p-2">
                <div className="font-bold mb-1">Select Types</div>
                <div className="border-b mb-2"></div>
                {uniqueRetreatLocations.map((type, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDropdownItemClick(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
