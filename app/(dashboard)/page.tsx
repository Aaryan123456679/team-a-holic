"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";

const DashBoard = ({

} ) => {

  const searchParams = useSearchParams();
  const favorites = searchParams.get('favorites') || undefined;
  const search = searchParams.get('search') || undefined;
  const query = {
    search,
    favorites
  };

  const {organization} = useOrganization();

  return ( 
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization?(<EmptyOrg />) : (
        <BoardList 
        orgId = {organization.id}
        query = {query}
        />
      )}
    </div>
   );
}

export default DashBoard;