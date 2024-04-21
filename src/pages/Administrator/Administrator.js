import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { GiHamburgerMenu, IoIosAddCircle } from "react-icons/gi";
import './administrator.css';

const Administrator = () => {
    const [ showNav, setShowNav ] = useState(false);
    const [toggleState, setToggleState] = useState(1);
    return (
        <div>
            <header>
                <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
                <div className='name'>
                    <div>TRƯỜNG ĐẠI HỌC BÁCH KHOA</div>
                    <div>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</div>
                </div>
                <img src='https://upload.wikimedia.org/wikipedia/vi/5/5f/H%E1%BB%99i_Ch%E1%BB%AF_th%E1%BA%ADp_%C4%91%E1%BB%8F_Vi%E1%BB%87t_Nam.svg' alt="logo" className="logo_2"></img>
            </header>
            <div className='center'>
                <Navbar show={showNav} toggleState={toggleState} setToggleState={setToggleState}/>
                <Content show={showNav} show_content={toggleState}/>
            </div>
        </div>
    );
}
export default Administrator