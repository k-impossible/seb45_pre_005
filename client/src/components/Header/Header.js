import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import {
  HeaderContainer,
  HeaderWrap,
  Btn,
  NavContainer,
  LogoLink,
  InputForm
} from './Header.styled';
import headerLogoImg from '../../common/image/header-logo.png';
<<<<<<< HEAD

import Search from  '../../common/image/Search.png'
import profile from '../../common/image/profile.png'
=======
import Search from '../../common/image/Search.png'
>>>>>>> 412f19c (메인 페이지, 마이 페이지)
import { logout, setLoginStatus } from '../../redux/actions/loginInfo'


export default function Header() {
  const dispatch = useDispatch()
<<<<<<< HEAD

  const loginStatus = useSelector((state) => state.loginReducer);

=======
  const isLoggedIn = useSelector((state) => state.login) || false
  // const isLoggedIn = false;
>>>>>>> 412f19c (메인 페이지, 마이 페이지)
  const handleLogout = () => {
    // console.log('로그아웃');
    dispatch(logout());

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId');
    console.log(loginStatus)
    // window.location.reload();
  }


  useEffect(() => {
    console.log(loginStatus);
    const storedAccessToken = localStorage.getItem('accessToken')
<<<<<<< HEAD
    if(storedAccessToken) {
      dispatch(setLoginStatus(true))
      console.log(loginStatus)
=======
    if (!storedAccessToken) {
      dispatch(setLoginStatus({ isLoggedIn: true }))
      console.log(isLoggedIn)
      console.log('토큰 있음')
      console.log(setLoginStatus())
>>>>>>> 412f19c (메인 페이지, 마이 페이지)
    } else {
      dispatch(setLoginStatus(false))
      console.log(loginStatus)
    }
<<<<<<< HEAD
  }, []);
=======
  }, [])

>>>>>>> 412f19c (메인 페이지, 마이 페이지)

  return (
    <HeaderContainer>
      <HeaderWrap>
        <LogoLink to="/">
          <img src={headerLogoImg} alt='logo' />
        </LogoLink>
        <InputForm>
          <img src={Search} alt="Search"></img>
          <input type="text" placeholder="Search..." />
        </InputForm>
        <NavContainer>
          {loginStatus.isLoggedIn === false ? (
            <ul>
              <li>
                <Btn className="loginBtn" to="/login">
                  Log in
                </Btn>
              </li>
              <li>
                <Btn className="sigupBtn" to="/sign-up">
                  Sign up
                </Btn>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Btn className='myPageBtn' to="/my-page">
                  <img src={profile} alt='profile'></img>
                  </Btn>
              </li>
              <li>
                <Btn className='logouBtn' onClick={handleLogout}>Log out</Btn>
              </li>
            </ul>
          )}
        </NavContainer>
      </HeaderWrap>
    </HeaderContainer>
  );
}
