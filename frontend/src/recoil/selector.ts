import { DefaultValue, selector} from 'recoil';
import axios from 'axios';
import {
  retreatsState,
  retreatsLoadingState,
  retreatsErrorState,
  searchQueryState,
  filterState,
  locationState,
  // pageState,
  // limitState,
  bookingState,
  bookingLoadingState,
  bookingErrorState,
  bookingRequestState,
} from './atoms';
import { Retreat, BookingResponse, ApiError } from '../types'; 

const BACKEND_API = import.meta.env.VITE_BACKEND_API || '';

const createApiUrl = (base: string, params: Record<string, string | number>): string => {
  const url = new URL(base);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));
  return url.toString();
};

export const fetchRetreatsSelector = selector<Retreat[]>({
  key: 'fetchRetreatsSelector',
  get: async ({ get }) => {
    const searchQuery = get(searchQueryState);
    const filter = get(filterState);
    const location = get(locationState);
    // const page = get(pageState);
    // const limit = get(limitState);

    const params: Record<string, string | number> = {};

    if (searchQuery) params.search = searchQuery;
    if (filter) params.filter = filter;
    if (location) params.location = location;
    // if (page) params.page = page;
    // if (limit) params.limit = limit;

    const url = createApiUrl(`${BACKEND_API}`, params);

    get(retreatsLoadingState);

    try {
      const response = await axios.get<Retreat[]>(url);
      return response.data;
    } catch (error) {
      get(retreatsErrorState);
      throw error; 
    }
  },

  set: ({ set }, newValue: Retreat[] | DefaultValue) => {
    if(newValue instanceof DefaultValue){
        set(retreatsState , newValue);
        set(retreatsLoadingState , false);
    }else{
        set(retreatsState , newValue);
        set(retreatsLoadingState , false);

    }
  }
});

const BOOKING_URL = import.meta.env.BOOKING_API || '';

export const bookRetreatSelector = selector({
    key: 'bookRetreatSelector',
    get: ({ get }) => {

      const bookingRequest = get(bookingRequestState);
      return bookingRequest;
    },
    set: ({ set, get }) => {
      const bookingRequest = get(bookingRequestState);
  
      if (bookingRequest === null) {
        return;
      }
  
      const url = `${BOOKING_URL}`;
      set(bookingLoadingState, true);
  
      axios.post<BookingResponse>(url, { retreatId: bookingRequest })
        .then(response => {
          set(bookingState, response.data);
          set(bookingErrorState, null);
        })
        .catch(error => {
          set(bookingErrorState, error as ApiError);
          set(bookingState, null);
        })
        .finally(() => {
          set(bookingLoadingState, false);
        });

      set(bookingRequestState, null);
    }
  });
