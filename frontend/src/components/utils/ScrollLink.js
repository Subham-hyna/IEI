import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollLink = ({ to, targetId, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash && location.hash.substring(1) === targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location, targetId]);

  const handleClick = (e) => {
    e.preventDefault();

    if (location.pathname === to) {
      // Same page, scroll directly
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to target page
      navigate(to + `#${targetId}`);
    }
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ScrollLink;
