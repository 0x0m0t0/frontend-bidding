import { useEffect, useState } from "react";
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
// this is a testing playground
const Archive = () => {
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
    // console.log(dummyArchive[36]);
    let dummyArchiveTruc = [...dummyArchive];
    console.log(dummyArchive);
  }, []);

  useEffect(() => {
    console.log(dummyArchive[36]?.["id_seller"]);
  }, [dummyArchive]);

  return (
    <>
      <h1>Hello</h1>
      <h2>{dummyArchive[36]?.id_seller}</h2>
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
        {dummyArchive
          .filter((obj) => obj.id_seller === 129)
          .map((item) => (
            <div key={item.id}>
              <img width={200} height={200} src={item?.cover_lobby} />
              <h2 className="w-60 p-2 bg-yellow-400 m-2 rounded-sm">
                {item.name}
              </h2>
            </div>
          ))}
      </div>
    </>
  );
};

export default Archive;
{
  /* <div className="flex flex-col items-center">
        {dummyArchive?.length > 0 ? (
          dummyArchive
            .filter((obj) => obj.id_seller === 129)
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
      </div> */
}
