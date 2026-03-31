import apiClient from './api';

export enum HallType {
  AMPHITHEATRE = 'AMPHITHEATRE',
  CLASSROOM = 'CLASSROOM',
  COMPUTER_LAB = 'COMPUTER_LAB',
  OFFICE = 'OFFICE',
  READING_ROOM = 'READING_ROOM',
  LIBRARY = 'LIBRARY',
  OTHER = 'OTHER',
}

export interface HallDto {
  id: number;
  name: string;
  capacity: number;
  location: string;
  type: HallType;
  equipment: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const getHalls = async (page = 0, size = 10): Promise<Page<HallDto>> => {
  const response = await apiClient.get(`/halls?page=${page}&size=${size}`);
  return response.data;
};

export const searchHalls = async (name: string, page = 0, size = 10): Promise<Page<HallDto>> => {
  const response = await apiClient.get(`/halls/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`);
  return response.data;
};

export const getHallsByType = async (type: HallType, page = 0, size = 10): Promise<Page<HallDto>> => {
  const response = await apiClient.get(`/halls/type?type=${encodeURIComponent(type)}&page=${page}&size=${size}`);
  return response.data;
};

export const getHallsByMinCapacity = async (minCapacity: number, page = 0, size = 10): Promise<Page<HallDto>> => {
  const response = await apiClient.get(`/halls/capacity?minCapacity=${minCapacity}&page=${page}&size=${size}`);
  return response.data;
};

export const getHallById = async (id: number): Promise<HallDto> => {
  const response = await apiClient.get(`/halls/${id}`);
  return response.data;
};

export const createHall = async (data: Omit<HallDto, 'id'>) => {
  const response = await apiClient.post('/halls', data);
  return response.data as HallDto;
};

export const updateHall = async (id: number, data: Partial<HallDto>) => {
  const response = await apiClient.put(`/halls/${id}`, data);
  return response.data as HallDto;
};

export const deleteHall = async (id: number) => {
  await apiClient.delete(`/halls/${id}`);
};