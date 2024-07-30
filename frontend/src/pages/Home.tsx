/* eslint-disable @typescript-eslint/no-unused-vars */

import Filters from "@/components/Filters";
import RetreatsList from "@/components/Retreats";
import ScrollingText from "@/components/ScrollingText";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { isSameDay } from "date-fns";
import { Retreat } from "@/types";
import {
  retreatsState,
  retreatsLoadingState,
  retreatsErrorState,
  fetchRetreatsSelector,
  searchQueryState,
  locationState,
} from "../recoil";
import SkeletonComp from "@/components/SkeletonComp";



const Home = () => {

  const [retreats , setRetreats] = useRecoilState<Retreat[]>(retreatsState);
  const [search , setSearch] = useRecoilState(searchQueryState);
  // const [filter , setFilter] = useRecoilState(filterState);
  const [location , setLocation] = useRecoilState(locationState);
  const [date , setDate] = useState<Date | null>(null);
  const loadable = useRecoilValueLoadable(fetchRetreatsSelector);
  const [loading , setLoading] = useRecoilState(retreatsLoadingState);
  const [error, setError] = useRecoilState(retreatsErrorState);


  useEffect(()=>{
    switch(loadable.state){
      case "loading":
        setLoading(true);
        break;
      case 'hasValue':
        setRetreats(loadable.contents);
        setLoading(false);
        break;
      case 'hasError':
        setError(loadable.contents);
        setLoading(false);
        break;
    }
  } , [loadable , setRetreats , setLoading , setError]);



  if(error){
    return <div>Error...</div>
  }

  const handleSearch = (searchTerm : string) => {
    setSearch(searchTerm);
  };

  const handleFilterLocation = (filterType : string) => {
    setLocation(filterType);
  };

  // const handleFilterByType = (filterType : string) =>{
  //   setFilter(filterType);
  // }
  const handleDateChange = (selectedDate : Date | null) => {
    setDate(selectedDate);
  };

  const getFilteredAndSearchedRetreats = () => {
    console.log('Retreats:', retreats);
    console.log('Type of retreats:', typeof retreats);
    console.log('Is retreats an array?', Array.isArray(retreats));
    console.log('Search term:', search);
    console.log('Location filter:', location);
    console.log('Date filter:', date);
    
    return retreats.filter(retreat => {
      const retreatDate = new Date(retreat.date * 1000);
      const matchesSearch =  retreat.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = location ? retreat.location.toLowerCase() === location.toLowerCase() : true;
      // const matchesFilterType = filter ? retreat.type.toLowerCase() === filter.toLowerCase() : true;
      const matchesDate = date ? isSameDay(retreatDate, date) : true;
      return matchesSearch && matchesFilter && matchesDate;
    });
  };

  if(loading){
    return(
      <div>
        <ScrollingText />
        <Filters
          handleSearch={handleSearch}
          retreats={retreats}
          handleFilterLocation={handleFilterLocation}
          handleDateChange={handleDateChange}
        />
        <SkeletonComp />
      </div>
    )
  }

  return (
    <div>
      <ScrollingText />
      <Filters handleSearch={handleSearch} retreats={retreats} handleFilterLocation={handleFilterLocation} handleDateChange={handleDateChange}/>
      <RetreatsList retreats={getFilteredAndSearchedRetreats()} />
    </div>
  );
};

export default Home;
