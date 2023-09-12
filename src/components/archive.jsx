import { useEffect, useState } from "react";
import { Pagination } from "./pagination";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Archive = () => {
  // FIX NAMING: DUMMY ARCHIVE
  const [dummyArchive, setDummyArchive] = useState([]);

  const fetchDummyData = async () => {
    try {
      const response = await fetch(endpoint + "/historic/1");
      const data = await response.json();
      setDummyArchive(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

  return (
    <>
      <Pagination />
      <div className="flex flex-col items-center">
        {dummyArchive?.length > 0 ? (
          dummyArchive.map((item) => (
            <div key={item.id}>
              <img width={200} height={200} src={item?.cover_lobby} />
              <h2 className="w-60 p-2 bg-yellow-400 m-2 rounded-sm">
                {item.name}
              </h2>
            </div>
          ))
        ) : (
          <h2 className="empty">Nothing to be found here</h2>
        )}
      </div>
    </>
  );
};

export default Archive;
