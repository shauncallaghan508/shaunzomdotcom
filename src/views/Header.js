import React from "react";

const Header = props => (
    <header className="header--main">
        <section className="container header--main__wrap">
            <div className="header__branding">
                <img src="/images/branding/head-icon.png" alt="ShaunZom" width="30px"/>
                <span>Shaun Zom dot Com</span>
            </div>
            <nav className="nav--main">
                <ul>
                    <li><a href="/darwin">Darwin Project</a></li>
                    <li><a href="/darwin/create">Tournament Maker</a></li>
                </ul>
            </nav>
        </section>
    </header>
);

export default Header;