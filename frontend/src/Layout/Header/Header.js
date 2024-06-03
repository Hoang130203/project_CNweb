import classNames from 'classnames/bind';
import styles from '../Layout.module.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../../Pages/ContextOrder/NotificationContext';
import UserApi from '../../Api/UserApi';
import { FaShoppingCart } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

import { FaBell, FaUser, FaSearch, FaBars } from 'react-icons/fa';

const cx = classNames.bind(styles)

// Điều hướng khi bấm vào icon tài khoản
function DivAcc({ updateRole, handleClickAcc }) {
  const [notifications, setNotifications] = useContext(NotificationContext)
  return (
    <div className={cx('divAcc')} id='div1' onClick={() => handleClickAcc(false)}>
      <div className={cx('frame2')} id='hehe'>
        <div className={cx('group9')}>
          {/* Icon hình người */}
          <div className={cx('group8')} style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to='/user/profile'
              style={{ fontFamily: 'Itim', fontSize: '25.6px', color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="37.6" height="36" viewBox="0 0 47 45" fill="none">
                <path d="M39.1666 39.8162V36.0662C39.1666 34.0771 38.3413 32.1694 36.8723 30.7629C35.4033 29.3564 33.4108 28.5662 31.3333 28.5662H15.6666C13.5891 28.5662 11.5967 29.3564 10.1276 30.7629C8.65861 32.1694 7.83331 34.0771 7.83331 36.0662V39.8162" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M23.5 20.625C27.8262 20.625 31.3333 17.2671 31.3333 13.125C31.3333 8.98286 27.8262 5.625 23.5 5.625C19.1738 5.625 15.6667 8.98286 15.6667 13.125C15.6667 17.2671 19.1738 20.625 23.5 20.625Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span style={{ marginLeft: '8px', fontFamily: 'Itim', fontSize: '25.6px', color: '#000000' }}>
                Tài khoản
              </span>
            </Link>
          </div>
          {/* Icon hình chuông */}
          <div className={cx('group7')} style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to='/user/notification'
              style={{ fontFamily: 'Itim', fontSize: '25.6px', color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center' }}

            >

              <svg xmlns="http://www.w3.org/2000/svg" width="37.6" height="33.6" viewBox="0 0 47 42" fill="none">
                <path d="M35.25 14C35.25 11.2152 34.0121 8.54451 31.8085 6.57538C29.605 4.60625 26.6163 3.5 23.5 3.5C20.3837 3.5 17.395 4.60625 15.1915 6.57538C12.9879 8.54451 11.75 11.2152 11.75 14C11.75 26.25 5.875 29.75 5.875 29.75H41.125C41.125 29.75 35.25 26.25 35.25 14Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M26.8879 36.75C26.5436 37.2804 26.0494 37.7206 25.4549 38.0267C24.8603 38.3327 24.1862 38.4938 23.5 38.4938C22.8138 38.4938 22.1397 38.3327 21.5451 38.0267C20.9506 37.7206 20.4564 37.2804 20.1121 36.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {notifications.length > 0 && <span className={cx('notification')} style={{ right: '10px', top: '-10px' }}>{notifications.length}</span>}
              <span style={{ marginLeft: '8px', fontFamily: 'Itim', fontSize: '25.6px', color: '#000000' }}>Thông báo</span>
            </Link>
          </div>

          <hr style={{ borderTop: '2px solid #B6B6B6', width: '170px', paddingLeft: '10px', margin: '22px 0px 0px 14px' }} />

          {/* Icon đăng xuất */}
          <div className={cx('group6')} style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="29.6" height="29.6" viewBox="0 0 37 37" fill="none">
              <path d="M13.875 32.375H7.70833C6.89058 32.375 6.10632 32.0501 5.52809 31.4719C4.94985 30.8937 4.625 30.1094 4.625 29.2917V7.70833C4.625 6.89058 4.94985 6.10632 5.52809 5.52809C6.10632 4.94985 6.89058 4.625 7.70833 4.625H13.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M24.6667 26.2083L32.375 18.5L24.6667 10.7917" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M32.375 18.5H13.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <Link
              to='/login'
              style={{ marginLeft: '9.6px', fontFamily: 'Itim', fontSize: '25.6px', color: '#000000', textDecoration: 'none' }}
              onClick={() => updateRole('guest')}
            >
              Đăng xuất
            </Link>
          </div>
          {/* <Link to='/login' style={{ color: '#fff', marginRight: '30px' }}>Login</Link>
          <Link to='/register' style={{ color: '#fff' }}>Register</Link> */}
        </div>
      </div>
    </div>)
}



function Header() {

  const [notifications, setNotifications] = useContext(NotificationContext)
  // Hiện, ẩn khi bấm vào accImg
  const [clickAcc, setClickAcc] = useState(true)

  // Hiện, ẩn khi tìm kiếm (ẩn khi bấm vào input, khi trong input có dữ liệu, hiện lại khi trong thẻ input o có gì)
  const [search, setSearch] = useState('block')

  // Nội dung trong thẻ input
  const [valueInput, setValueInput] = useState('')

  // Hiện frame2
  const handleClickAcc = (clickAcc) => {
    setClickAcc(!clickAcc)
    if (clickAcc) {
      document.getElementById('hehe').style.right = "3px";
      document.getElementById('div1').style.width = "100vw";
      document.getElementById('div1').style.height = "100vh";

    } else {
      document.getElementById('hehe').style.right = "-300px";
      document.getElementById('div1').style.width = "0%";
      document.getElementById('div1').style.height = "0%";
    }
  }

  // Focus vào input khi nhấn vào icon + text
  const focusInput = () => {
    const input = document.getElementById("myInput");
    input.focus();
    setSearch('none')
  };

  const inputClicked = () => {
    setSearch('none')
  }

  const inputUnClicked = () => {
    if (valueInput !== '') {
      setSearch('none')
    } else {
      setSearch('block')
    }
  }


  useEffect(() => {

    if (valueInput !== '') {
      UserApi.FindByKeyword(valueInput).then(res => {
        setListSearch(res.data?.content)
      })
    } else {
      setListSearch([])

    }

  }, [valueInput])

  const [guest, setGuest] = useState(true)
  const [listSearch, setListSearch] = useState([])
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('w15store_user');
    const storedAvatar = localStorage.getItem('w15store_avatar');
    setAvatar(storedAvatar);
    setUser(storedUser);
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    localStorage.removeItem('w15store_user');
    localStorage.removeItem('w15store_avatar');
    setUser(null);
  };
  return (
    <div>
      <div className='wrap_header'>
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
              <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 70 70" fill="none" class="icon"><g clip-path="url(#clip0_1_3)"><path d="M3.28125 70H33.9062C34.1963 70 34.4745 69.8848 34.6796 69.6796C34.8848 69.4745 35 69.1963 35 68.9062C35 68.6162 34.8848 68.338 34.6796 68.1329C34.4745 67.9277 34.1963 67.8125 33.9062 67.8125H3.28125C2.99117 67.8125 2.71297 67.6973 2.50785 67.4921C2.30273 67.287 2.1875 67.0088 2.1875 66.7188V3.28125C2.1875 2.99117 2.30273 2.71297 2.50785 2.50785C2.71297 2.30273 2.99117 2.1875 3.28125 2.1875H49.2188C49.5088 2.1875 49.787 2.30273 49.9921 2.50785C50.1973 2.71297 50.3125 2.99117 50.3125 3.28125V14.2188C50.3125 14.5088 50.4277 14.787 50.6329 14.9921C50.838 15.1973 51.1162 15.3125 51.4062 15.3125C51.6963 15.3125 51.9745 15.1973 52.1796 14.9921C52.3848 14.787 52.5 14.5088 52.5 14.2188V3.28125C52.5 1.47219 51.0278 0 49.2188 0H3.28125C1.47219 0 0 1.47219 0 3.28125V66.7188C0 68.5278 1.47219 70 3.28125 70Z" fill="black"></path><path d="M39.375 22.9688V66.7188C39.375 68.5278 40.8472 70 42.6562 70H66.7188C68.5278 70 70 68.5278 70 66.7188V22.9688C70 21.1597 68.5278 19.6875 66.7188 19.6875H42.6562C40.8472 19.6875 39.375 21.1597 39.375 22.9688ZM67.8125 22.9688V66.7188C67.8125 67.0088 67.6973 67.287 67.4921 67.4921C67.287 67.6973 67.0088 67.8125 66.7188 67.8125H42.6562C42.3662 67.8125 42.088 67.6973 41.8829 67.4921C41.6777 67.287 41.5625 67.0088 41.5625 66.7188V22.9688C41.5625 22.6787 41.6777 22.4005 41.8829 22.1954C42.088 21.9902 42.3662 21.875 42.6562 21.875H66.7188C67.0088 21.875 67.287 21.9902 67.4921 22.1954C67.6973 22.4005 67.8125 22.6787 67.8125 22.9688Z" fill="black"></path><path d="M26.25 63.4375C27.4581 63.4375 28.4375 62.4581 28.4375 61.25C28.4375 60.0419 27.4581 59.0625 26.25 59.0625C25.0419 59.0625 24.0625 60.0419 24.0625 61.25C24.0625 62.4581 25.0419 63.4375 26.25 63.4375Z" fill="black"></path><path d="M54.6875 63.4375C55.8956 63.4375 56.875 62.4581 56.875 61.25C56.875 60.0419 55.8956 59.0625 54.6875 59.0625C53.4794 59.0625 52.5 60.0419 52.5 61.25C52.5 62.4581 53.4794 63.4375 54.6875 63.4375Z" fill="black"></path></g><defs><clipPath id="clip0_1_3"><rect width="70" height="70" fill="white"></rect></clipPath></defs></svg>
                <span style={{ position: 'relative', left: '-6px', top: '-5px' }}>W15Store</span>
              </div>
            </Link>
            <nav className="nav-links">
              <Link to="/mobile">Điện thoại</Link>
              <Link to="/laptop">Laptop</Link>
              <Link to="/watch">Đồng hồ</Link>
              <Link to="/accessory">Phụ kiện</Link>
            </nav>
          </div>
          <div className="icon-group">
            {user &&
              <>
                <div className='search-container'>
                  <input type="text" className="search-input" placeholder="Tìm kiếm..." value={valueInput} onChange={e => setValueInput(e.target.value)} onFocus={inputClicked} onBlur={inputUnClicked} />
                  <FaSearch className="icon search-icon-laptop" />
                  <FaSearch className="icon search-icon" onClick={toggleSearch} />
                  {
                    listSearch.length > 0 && <div className='find_box'>
                      {
                        listSearch.map((item, index) => {
                          return (
                            <div key={index} className='find_item'>
                              <a href={`/product-detail/${item.id}`} style={{ textDecoration: 'none', color: '#000000', display: 'flex' }}>
                                <img className='find_img' src={item.images[0].url} alt='find_img' />
                                <div className='find_text'>
                                  <p className='find_name'>{item.name}</p>
                                  <p className='find_price'>{item.cost.toLocaleString()}</p>
                                </div>
                              </a>
                            </div>
                          )
                        })
                      }
                    </div>
                  }
                </div>
                <Link to='/livestream'>
                  <MdLiveTv style={{ fontSize: '28px', color: 'red' }} />
                </Link>
                <Link to='/shoppingList'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 54" fill="none">
                    <path d="M12.5 4.5L6.25 13.5V45C6.25 46.1935 6.68899 47.3381 7.47039 48.182C8.25179 49.0259 9.3116 49.5 10.4167 49.5H39.5833C40.6884 49.5 41.7482 49.0259 42.5296 48.182C43.311 47.3381 43.75 46.1935 43.75 45V13.5L37.5 4.5H12.5Z" stroke="#6B6B6B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.25 13.5H43.75" stroke="#6B6B6B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M33.3334 22.5C33.3334 24.887 32.4554 27.1761 30.8926 28.864C29.3298 30.5518 27.2102 31.5 25 31.5C22.7899 31.5 20.6703 30.5518 19.1075 28.864C17.5447 27.1761 16.6667 24.887 16.6667 22.5" stroke="#6B6B6B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div className={cx("nav-cart-count")}>0</div>
                </Link>
              </>
            }
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }} className='user' >
                <img
                  src={avatar != "null" ? avatar : "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"}
                  alt="avatar"
                  className="avatar"
                />                <div >
                  {notifications.length > 0 && <div className='notifinumber'>{notifications.length}</div>}
                </div>
                <div className="user-menu">
                  <Link to="/user/profile" style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.6" height="18" viewBox="0 0 47 45" fill="none">
                      <path d="M39.1666 39.8162V36.0662C39.1666 34.0771 38.3413 32.1694 36.8723 30.7629C35.4033 29.3564 33.4108 28.5662 31.3333 28.5662H15.6666C13.5891 28.5662 11.5967 29.3564 10.1276 30.7629C8.65861 32.1694 7.83331 34.0771 7.83331 36.0662V39.8162" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M23.5 20.625C27.8262 20.625 31.3333 17.2671 31.3333 13.125C31.3333 8.98286 27.8262 5.625 23.5 5.625C19.1738 5.625 15.6667 8.98286 15.6667 13.125C15.6667 17.2671 19.1738 20.625 23.5 20.625Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Tài khoản</Link>
                  <Link to="/user/notification" style={{ display: 'flex', alignItems: 'center' }} >
                    <div className='wrap_notifi' style={{ display: 'flex', alignItems: 'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18.6" height="17.6" viewBox="0 0 47 42" fill="none">
                        <path d="M35.25 14C35.25 11.2152 34.0121 8.54451 31.8085 6.57538C29.605 4.60625 26.6163 3.5 23.5 3.5C20.3837 3.5 17.395 4.60625 15.1915 6.57538C12.9879 8.54451 11.75 11.2152 11.75 14C11.75 26.25 5.875 29.75 5.875 29.75H41.125C41.125 29.75 35.25 26.25 35.25 14Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M26.8879 36.75C26.5436 37.2804 26.0494 37.7206 25.4549 38.0267C24.8603 38.3327 24.1862 38.4938 23.5 38.4938C22.8138 38.4938 22.1397 38.3327 21.5451 38.0267C20.9506 37.7206 20.4564 37.2804 20.1121 36.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      {notifications.length > 0 && <span className='notification' style={{ right: '10px', top: '-10px' }}></span>}
                    </div>
                    Thông báo</Link>
                  <Link to="/login" onClick={logout} style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.6" height="15.6" viewBox="0 0 37 37" fill="none">
                      <path d="M13.875 32.375H7.70833C6.89058 32.375 6.10632 32.0501 5.52809 31.4719C4.94985 30.8937 4.625 30.1094 4.625 29.2917V7.70833C4.625 6.89058 4.94985 6.10632 5.52809 5.52809C6.10632 4.94985 6.89058 4.625 7.70833 4.625H13.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M24.6667 26.2083L32.375 18.5L24.6667 10.7917" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M32.375 18.5H13.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Đăng xuất</Link>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to='/login'><button>Đăng nhập</button></Link>
                <Link to='/register'><button>Đăng ký</button></Link>
              </div>
            )}
            <FaBars className="icon menu-icon" onClick={toggleMenu} />
          </div>

        </header>
        {searchOpen && (
          <div className="mobile-search">
            <input type="text" className="mobile-search-input" placeholder="Tìm kiếm..." value={valueInput} onChange={e => setValueInput(e.target.value)} onFocus={inputClicked} onBlur={inputUnClicked} />
            {
              listSearch.length > 0 && <div className='find_box_2'>
                {
                  listSearch.map((item, index) => {
                    return (
                      <div key={index} className='find_item'>
                        <a href={`/product-detail/${item.id}`} style={{ textDecoration: 'none', color: '#000000', display: 'flex' }}>
                          <img className='find_img' src={item.images[0].url} alt='find_img' />
                          <div className='find_text'>
                            <p className='find_name'>{item.name}</p>
                            <p className='find_price'>{item.cost.toLocaleString()}</p>
                          </div>
                        </a>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        )}
        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/mobile">Điện thoại</Link>
            <Link to="/laptop">Laptop</Link>
            <Link to="/watch">Đồng hồ</Link>
            <Link to="/accessory">Phụ kiện</Link>
          </div>
        )}
      </div>
      <div className='clear'></div>
    </div>
  );
}

export default Header;