import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext";
const TranslatorPage = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div>
      <main></main>
    </div>
  );
};

export default TranslatorPage;
