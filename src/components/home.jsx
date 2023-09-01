import beehiveLogo from "./../assets/img/beehive.png";

const Hello = () => {
  return alert("Hello Welcome to Bidhive");
};

const Home = () => {
  return (
    
    <div className="flex flex-col self-center items-center"><img className="h-60 w-60 m-20" src={beehiveLogo} onClick={Hello} /> 
      {/* */}
      <h2 className="flex justify-center h-60 w-60 m-20 text-3xl">Welcome to Bidhive</h2>
    </div>
  );
};

export default Home;
