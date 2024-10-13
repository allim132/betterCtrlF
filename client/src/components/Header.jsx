import logo from "../files/ctrlflogo.png";

export default function Header() {
  return (
    <header className="bg-[#3c799a] text-white p-4">
      <div className="container mx-auto flex items-center">
        <img src={logo} alt="Logo" className="h-10 mr-2" />{" "}
        <h1 className="text-2xl font-bold">Better Ctrl+F</h1>
      </div>
    </header>
  );
}
