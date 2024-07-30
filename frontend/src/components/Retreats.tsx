import { useState, useEffect } from 'react';
import RetreatCard from './RetreatCard';
import Pagination from './PaginationComp';
import { Retreat } from '@/types';

interface RetreatsListProps {
  retreats: Retreat[];
}

const Retreats: React.FC<RetreatsListProps> = ({ retreats } : RetreatsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const retreatsPerPage = 6;

  useEffect(() => {
    setTotalPages(Math.ceil(retreats.length / retreatsPerPage));
  }, [retreats]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedRetreats = () => {
    const startIndex = (currentPage - 1) * retreatsPerPage;
    const endIndex = startIndex + retreatsPerPage;
    return retreats.slice(startIndex, endIndex);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getPaginatedRetreats().map((retreat) => (
          <RetreatCard key={retreat.id} retreat={retreat} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Retreats;
