import React, {Component} from 'react'

class Header extends Component {
    constructor(...args) {
      super(...args);
      this.state = {isMenuExpanded: false};
      this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu = () => {
      console.log('expand Menu now');
      this.setState({ isMenuExpanded: !this.state.isMenuExpanded });
    }

    render() {
      return (
        <header className="default-header">
          <div className="container">
            <div className="header-wrap">
              <div className="header-top d-flex justify-content-between align-items-center">
                <div className="logo">
                  <a href="/">
                    <svg width="200px" height="42px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1406 302">
                      <path d="M106.411 146.85L29.377 22h51.466l51.47 84.01L183.779 22h51.137l-77.034 124.85L240.228 281h-50.803l-57.445-92.643L74.867 281H23.731l82.68-134.15zM448.332 22l-17.324 41H340v65h63v41h-63v71h108v41H293V22h155.332zM948.332 22l-17.324 41H840v65h63v41h-63v71h108v41H793V22h155.332zM670.063 22H715v259h-34.593L563 109.327 563.062 281H518V22h34.256L670.25 193.673 670.063 22zM1169.67 22H997v41h60v218h46V63h49.223zM1384.051 281L1274.269 22h-.918l-109.227 258h46.8c2.967-.023 41.443-7.46 74.666-30.929 13.596-9.604 27.729-8.831 34.608-7.637L1336.925 281h47.126zm-122.673-66.201c-9.335 6.594-19.673 11.659-29.073 15.447l41.434-98.184 28.586 67.296c-12.978 1.436-27.35 5.837-40.947 15.441z"></path>
                    </svg>
                  </a>
                </div>
                <div className="main-menubar d-flex align-items-center" onClick={this.toggleMenu}>
                  <nav className={this.state.isMenuExpanded ? 'show' : 'hide'}>
                    <a href="/">Home</a>
                    <a href="//www.xeneta.com/shippers-bco-analysts">Shippers</a>
                    <a href="//www.xeneta.com/products">Products</a>
                    <a href="//www.xeneta.com/contact">Contact</a>
                  </nav>
                  <div className="menu-bar" onClick={this.toggleMenu}><span className={this.state.isMenuExpanded ? 'lnr lnr-cross' : 'lnr lnr-menu'}></span></div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )
    }
}



export default Header
