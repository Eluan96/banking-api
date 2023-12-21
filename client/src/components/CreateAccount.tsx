/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";
// import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupComponent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const CreateAccount = () => {
  const [formData, setFormData] = useState<SignupComponent>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [cPassword, setCPassword] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);

  //   const dispatch = useDispatch() as unknown as any;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== cPassword) {
      toast.error("Invalid Password");
    } else {
      //   dispatch(registerUser(formData));
    }
  };

  return (
    <div className="m-5 p-5 rounded-lg shadow-lg flex justify-center align-middle">
      <div className="right_side">
        <div className="logo">
          <h3 className="logo_one"></h3>
          <p className="text-3xl font-bold mb-5">Online Banking </p>
        </div>

        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col shadow-lg p-5"
        >
          <div className="heading">
            <h2 className="text-3xl font-bold mb-5">Create Account</h2>
            <p>Sign up and enjoy the services</p>
          </div>
          <input
            type="text"
            name={"firstName"}
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder=" FirstName"
          />
          <input
            type="text"
            name={"lastName"}
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder=" LastName"
          />
          <input
            type="email"
            name={"email"}
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name={"password"}
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name={"cPassword"}
            required
            placeholder="Confirm Password"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />

          <button type="submit" className="btnn bg-black">
            Register
          </button>

          <div className="register">
            <p className="already">Already have an account?</p>
            <Link to="/login" className="alreadyLogin">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
