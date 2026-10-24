import React from "react";

import { Link } from "react-router-dom";



function Header() {
    return (
        <div>
            <center>
                <Link to="/">
                    <button style={{ marginRight: "10px" }}>
                        Resumen
                    </button>
                </Link>

                <Link to="/clubes">
                    <button style={{ marginRight: "10px" }}>
                        Clubes
                    </button>
                </Link>
            </center>
        </div>
    );
}

export default Header;
