import { useEffect, useState } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
console.log("hey archive page");

const LiveBid = () => {
  const [dummyArchive, setDummyArchive] = useState([]);

  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response = await fetch(endpoint + "/historic/1");
        const data = await response.json();
        setDummyArchive(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDummyData();
  }, []);
  console.log(dummyArchive[36]);

  return (
    <>
      <h1>Hello</h1>
      <h2>{}</h2>
      <div className="flex flex-col items-center">
        {dummyArchive?.length > 0 ? (
          dummyArchive.map((item) => (
            <h2
              className="w-60 p-2 bg-yellow-400 m-2 rounded-sm"
              key={dummyArchive[36].id}
            >
              {item.name}
            </h2>
          ))
        ) : (
          <h2 className="empty">Nothing to be found here</h2>
        )}
      </div>
    </>
  );
};

export default LiveBid;
