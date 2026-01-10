import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  //useNavigate - hook koji nam omogucava programatsko navigiranje, tj. menjanje rute putem koda
  //konkretno ovde ga koristimo za navigaciju unazad kada je to === '-1' kada kliknemo na dugme
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
