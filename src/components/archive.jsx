import { useEffect, useState } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Archive = () => {
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

  // if (dummyArchive.length > 0) {
  //   console.log(dummyArchive[36].id_seller);
  // }
  return (
    <>
      <h1>Hello</h1>
      {/* <div className="flex flex-col items-center">
        {dummyArchive?.length > 0 ? (
          dummyArchive.map((item) => (
            <>
              <img src={item?.cover_lobby} />
              <h2
                className="w-60 p-2 bg-yellow-400 m-2 rounded-sm"
                key={item.id}
              >
                {item.name}
              </h2>
            </>
          ))
        ) : (
          <h2 className="empty">Nothing to be found here</h2>
        )}
      </div> */}
      <div className="flex flex-col items-center">
        {dummyArchive?.length > 0 ? (
          dummyArchive
            .filter((obj) => obj.id_seller === 109)
            .map((item) => (
              <div key={item.id}>
                <img src={item?.cover_lobby} />
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
