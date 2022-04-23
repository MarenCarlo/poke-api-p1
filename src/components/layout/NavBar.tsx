import { Fragment } from 'react';
export const NavBar = () => {
    return (
        <Fragment>
            <div className='navbar-fixed'>
                <nav>
                    <div className='nav-wrapper red darken-2'>
                        <a href="#!" className='brand-logo center'>Pokedex</a>
                    </div>
                </nav>
            </div>
        </Fragment>
    );
}