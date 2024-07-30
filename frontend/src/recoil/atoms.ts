import { ApiError, BookingResponse, Retreat } from '@/types';
import { atom } from 'recoil';


export const retreatsState = atom<Retreat[]>({
  key: 'retreatsState',
  default: [],
});

export const retreatsLoadingState = atom<boolean>({
  key: 'retreatsLoadingState',
  default: false,
});

export const retreatsErrorState = atom<null>({
  key: 'retreatsErrorState',
  default: null,
});

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});

export const filterState = atom<string>({
  key: 'filterState',
  default: '',
});

export const locationState = atom<string>({
  key: 'locationState',
  default: '',
});

export const pageState = atom<number | null>({
  key: 'pageState',
  default: 1,
});

export const limitState = atom<null | number>({
  key: 'limitState',
  default: 6,
});


export const bookingState = atom<BookingResponse | null>({
  key: 'bookingState',
  default: null,
});

export const bookingLoadingState = atom<boolean>({
  key: 'bookingLoadingState',
  default: false,
});

export const bookingErrorState = atom<ApiError | null>({
  key: 'bookingErrorState',
  default: null,
});


export const bookingRequestState = atom<number | null>({
    key: 'bookingRequestState',
    default: null,
  });