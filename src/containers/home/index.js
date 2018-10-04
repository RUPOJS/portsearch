import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import {
  updateSrc,
  updateDest,
  updateOnwardDate,
  updateReturnDate,
  updateSearchCompleted,
  updateError,
  updateSearchData
} from '../../action/action'

const Home = props => (
  <div>
    <Header />
    <section className="banner-area relative" id="home">
        <div className="overlay overlay-bg"></div>
        <div className="container">
            <div className="row fullscreen align-items-center justify-content-start" style={{'height': '915px'}}>
              <div className="banner-content col-lg-9 col-md-12">
                <h1>
                  Increase your negotiation power during ocean freight tendering season
                </h1>
                <p>Discover how you can access reliable ocean freight rates with a click and use this data to make your tendering process efficient</p>
                <a href="javascript:void(0)" className="primary-btn" onClick={() => props.changePage()}>Search Ocean Freight Rates<span className="lnr lnr-arrow-right"></span></a>
              </div>
            </div>
        </div>
      </section>
  </div>
)

const mapStateToProps = ({ action }) => ({
  src: action.src,
  dest: action.dest,
  onward_date: action.onward_date,
  return_date: action.return_date,
  isSearchCompleted: action.isSearchCompleted,
  ifError: action.ifError
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateSrc,
      updateDest,
      updateOnwardDate,
      updateReturnDate,
      updateSearchCompleted,
      updateError,
      changePage: () => push('/search')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
