// ServingAreasList.tsx
import React, { useContext } from "react";
import { ServingAreasContext } from "./ServingAreasProvider";

export const ServingAreasList: React.FC = () => {
  const { servingAreas, loading } = useContext(ServingAreasContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {servingAreas.map((area) => (
        <li key={area.id}>
          <strong>{area.name}</strong> - Slots left: {area.slots}
        </li>
      ))}
    </ul>
  );
};
