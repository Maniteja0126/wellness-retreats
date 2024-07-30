import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComp = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-md shadow-md p-4">
          <Skeleton className="w-full h-48 mb-4 rounded-md" />
          <Skeleton className="w-3/4 h-6 mb-2" />
          <Skeleton className="w-1/2 h-6" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonComp;
