import logo from "../assets/logo.png";

export const Header: React.FC = () => {
  return (
    <div className="header__wrapper">
      <div className="header__content">
        <div className="header__content__left">
          <div className="header__logo">
            <img src={logo} width={40} />
          </div>
          <span>My CVs</span>
          <span>Responses</span>
          <span>Services</span>
          <span>Help</span>
        </div>
        <div className="header__content__right">
          <span>Search</span>
          <span>New-York</span>
        </div>
      </div>
    </div>
  );
};
