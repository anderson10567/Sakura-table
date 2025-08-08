import { renderHook } from '@testing-library/react';
import { useEmployeeFilter } from '../hooks/useEmployeeFilter'; 
import { mockEmployees } from '../data/mockEmployees';
import { expect, test } from 'vitest';

test('фильтрация по имени и должности', () => {
  const { result } = renderHook(() => useEmployeeFilter(mockEmployees, 'Иван', ''));

  expect(result.current).toHaveLength(1);
  expect(result.current[0].name).toBe('Иван Иванов');
});

test('фильтрация по департаменту', () => {
  const { result } = renderHook(() => useEmployeeFilter(mockEmployees, '', 'Маркетинг'));

  expect(result.current).toHaveLength(2);
  expect(result.current[0].department).toBe('Маркетинг');
  expect(result.current[1].department).toBe('Маркетинг');
});

test('комбинированная фильтрация', () => {
  const { result } = renderHook(() => useEmployeeFilter(mockEmployees, 'Иван', 'ИТ'));

  expect(result.current).toHaveLength(1);
  expect(result.current[0].name).toBe('Иван Иванов');
  expect(result.current[0].department).toBe('ИТ');
});

test('без фильтрации', () => {
  const { result } = renderHook(() => useEmployeeFilter(mockEmployees, '', ''));

  expect(result.current).toHaveLength(mockEmployees.length);
});
