import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteUser,
  asyncUpdateUser,
  asynLogoutuser,
} from "../../Store/Actions/userActions";

const UserProfile = () => {
  const {
    userReducers: { users },
  } = useSelector((state) => state);

  console.log(users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: users?.username,
      email: users?.email,
      password: users?.password,
    },
  });

  // useEffect(() => {
  //   if (product) {
  //     reset(product);
  //   }
  // }, [product, reset]);

  const updateUserHandler = (user) => {
    dispatch(asyncUpdateUser(users.id, user));
  };
  const deleteHandeler = () => {
    dispatch(asyncDeleteUser(users.id));
    navigate("/login");
  };
  const LoagoutUserHandler = () => {
    dispatch(asynLogoutuser());
    navigate("/");
  };

  return users ? (
    <div>
      <form
        onSubmit={handleSubmit(updateUserHandler)}
        className="space-y-6 md:w-1/2 md:pl-10 mt-6 md:mt-0"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            type="text"
            placeholder="Enter your UserName"
            {...register("Username")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            type="email"
            // step="0.01"
            placeholder="Enter Your Email"
            {...register("email")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            type="text"
            placeholder="*************"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Update User
        </button>
        <button
          onClick={deleteHandeler}
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors duration-200 font-medium"
        >
          Delete User
        </button>
        <button
          onClick={LoagoutUserHandler}
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors duration-200 font-medium"
        >
          LogOut user
        </button>
      </form>
    </div>
  ) : (
    "Loading....."
  );
};

export default UserProfile;
