const Profile = ({ users }) => {
  return (
    <div className="flex flex-col self-center items-center">
      <h2 className="h-60 w-60 m-20 text-2xl">
        Hello, welcome to your profile {users.name}
      </h2>
    </div>
  );
};

export default Profile;
