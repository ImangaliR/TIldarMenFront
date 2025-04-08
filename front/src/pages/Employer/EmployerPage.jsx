import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext";
const EmployerPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return <main className=""></main>;
};

export default EmployerPage;
