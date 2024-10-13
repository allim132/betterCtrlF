import logo from "../files/ctrlflogo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-[#3c799a] text-white p-4">
      <div
        onClick={handleClick}
        className="container mx-auto flex items-center cursor-pointer"
      >
        <img src={logo} alt="Logo" className="h-10 mr-2" />{" "}
        <h1 className="text-2xl font-bold">Better Ctrl+F</h1>
      </div>
    </header>
  );
}
