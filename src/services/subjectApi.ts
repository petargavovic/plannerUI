import apiClient from './api';

export interface SubjectDto {
  id: number;
  code: string;
  name: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const getSubjects = async (page = 0, size = 10): Promise<Page<SubjectDto>> => {
  const response = await apiClient.get(`/subjects?page=${page}&size=${size}`);
  return response.data;
};

export const searchSubjects = async (name: string, page = 0, size = 10): Promise<Page<SubjectDto>> => {
  const response = await apiClient.get(`/subjects/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`);
  return response.data;
};

export const getSubjectById = async (id: number): Promise<SubjectDto> => {
  const response = await apiClient.get(`/subjects/${id}`);
  return response.data;
};

export const createSubject = async (data: Omit<SubjectDto, 'id'>) => {
  const response = await apiClient.post('/subjects', data);
  return response.data as SubjectDto;
};

export const updateSubject = async (id: number, data: Partial<SubjectDto>) => {
  const response = await apiClient.put(`/subjects/${id}`, data);
  return response.data as SubjectDto;
};

export const deleteSubject = async (id: number) => {
  await apiClient.delete(`/subjects/${id}`);
};