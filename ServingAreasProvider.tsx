// ServingAreasProvider.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

type ServingArea = {
  id: string;
  name: string;
  slots: number;
};

type ServingAreasContextType = {
  servingAreas: ServingArea[];
  loading: boolean;
};

export const ServingAreasContext = createContext<ServingAreasContextType>({
  servingAreas: [],
  loading: true,
});

export const ServingAreasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [servingAreas, setServingAreas] = useState<ServingArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const servingAreasRef = ref(db, "servingAreas");
    const unsubscribe = onValue(servingAreasRef, (snapshot) => {
      const data = snapshot.val();
      const areas: ServingArea[] = data
        ? Object.entries(data).map(([id, values]: [string, any]) => ({
            id,
            name: values.name,
            slots: values.slots,
          }))
        : [];
      setServingAreas(areas);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ServingAreasContext.Provider value={{ servingAreas, loading }}>
      {children}
    </ServingAreasContext.Provider>
  );
};