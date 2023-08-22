import { useEffect, useState } from "react";

const Archive = () => {
  const [dummyArchive, setDummyArchive] = useState([]);

  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setDummyArchive(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDummyData();
  }, []);

  console.log(dummyArchive);

  return (
    <>
      <h1>Hello</h1>
      <div className="flex flex-col items-center">
        {dummyArchive.map((item) => (
          <h2
            className="w-60 p-2 bg-yellow-400 m-2 rounded-sm"
            key={item.title}
          >
            {item.title}
          </h2>
        ))}
      </div>
    </>
  );
};

export default Archive;
