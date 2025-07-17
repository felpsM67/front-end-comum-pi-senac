import { useState } from 'react';

const useTable = <T extends Record<string, unknown>>(data: T[]) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(term.toLowerCase()),
        ),
      ),
    );
  };

  return { filteredData, searchTerm, handleSearch };
};

export default useTable;
