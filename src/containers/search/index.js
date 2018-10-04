import React, {Component} from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/lib/Async'
import originalMoment from 'moment'
import { extendMoment } from 'moment-range'
import DateRangePicker from 'react-daterange-picker'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
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
const moment = extendMoment(originalMoment);

class Search extends Component {
  	constructor(...args) {
  	  super(...args);
  	  const today = moment();
  	  this.state = {isOpen: false, dates: null, data: [], value: moment.range(today.clone().subtract(7, "days"), today.clone()), isDateRangeSelected: false, errorMsg: ''}
  	  this.onSelect = this.onSelect.bind(this);
  	  this.getPortData = this.getPortData.bind(this);
  	}

  	onSelect = (value, states) => {
    	this.setState({ value, states });
    	this.setState({ isDateRangeSelected: true, isOpen: false });
    	this.props.updateOnwardDate(moment(value.start).format('YYYY-MM-DD'));
    	this.props.updateReturnDate(moment(value.end).format('YYYY-MM-DD'))
  	};

  	onToggle = () => {
    	this.setState({ isOpen: !this.state.isOpen });
  	};

  	getPortData = async (inputValue) => {
  		const response = await fetch('/api/ports/search/'+inputValue);
  		const respJSON = await response.json();
  		for (let toBeReturnedObject of respJSON.results) {
  		  console.log(toBeReturnedObject);
		  toBeReturnedObject.value = toBeReturnedObject.name;
		  toBeReturnedObject.label = toBeReturnedObject.name;
		}
  		return respJSON.results; //TODO: Implement a Trie search for faster lookup. Ref: https://johnresig.com/blog/javascript-trie-performance-analysis/
  	};


  	handleSrcChange = (newValue, actionMeta) => {
	    console.group('Value Changed');
	    console.log(newValue);
	    console.log(`action: ${actionMeta.action}`);
	    console.groupEnd();
	    this.props.updateSrc(newValue);
	};

  	handleDestChange = (newValue, actionMeta) => {
	    console.group('Value Changed');
	    console.log(newValue);
	    console.log(`action: ${actionMeta.action}`);
	    console.groupEnd();
	    this.props.updateDest(newValue);
	    console.log(this.props);
	};	

  	handleInputChange = (inputValue, actionMeta) => {
	    console.group('Input Changed');
	    console.log(`action: ${actionMeta.action}`);
	    console.groupEnd();
	};

	startSearch = async () => {
		const { src, dest, onward_date, return_date, updateSearchCompleted, updateError, updateSearchData } = this.props;
		updateError(false);
		if (!!src.id && !!dest.id && onward_date !== '' && return_date !== '') {
			updateSearchData([]);
			const response = await fetch('/api/rates/'+src.id+'/'+dest.id+'/'+onward_date+'/'+return_date);
			const respJSON = await response.json();
			const respArray = [];
			if (!respJSON.rates.length) {
				updateError(true);
				this.setState({ 'errorMsg': 'Freight data is only available from 2017-08-30 to 2018-06-30.'});
				return;
			}
			for (let data of respJSON.rates) {
				const tempObj = {'date': data[0], 'price': data[1]};
				respArray.push(tempObj);
			}
			updateSearchCompleted(true);
			updateSearchData(respArray);
			this.setState({
				data: respArray
			});
		} else {
			updateError(true);
			this.setState({ 'errorMsg': 'Please fill all the fields.'});
		}
	};

	render() {
	  return (
		  <div>
		    <Header />

			<section className="booking-area">
				<div className="container">
					<div className="row d-flex justify-content-center">
						<div className="col-lg-12">
							<ul className="nav nav-tabs" role="tablist">
								  <li className="nav-item">
								    <a className="nav-link" href="#flights" role="tab" data-toggle="tab">Ocean Freight</a>
								  </li>
							</ul>
							<div className="tab-content">
							  <div role="tabpanel">
							  	<h4 style={{'marginBottom': '20px'}}>Search Ocean Freight Rates</h4>
									 <div className="row">
									    <div className="col-md-4">
									      <AsyncSelect
									        cacheOptions 
									        defaultOptions 
									        isClearable
        									onChange={this.handleSrcChange}
        									onInputChange={this.handleInputChange}
									      	loadOptions={this.getPortData} 
									      	placeholder={'Source'}
									      />
									    </div>
									    <div className="col-md-4">
									      <AsyncSelect
									        cacheOptions 
									        defaultOptions 
									        isClearable
        									onChange={this.handleDestChange}
        									onInputChange={this.handleInputChange}
									      	loadOptions={this.getPortData} 
									      	placeholder={'Destination'}
									      />
									    </div>
									    <div className="col-md-4">
									      <input id="datepicker" name="start" className="single-in form-control" type="text" placeholder="Select Date Range" value={(this.state.isDateRangeSelected ? (moment(this.state.value.start).format('YYYY/MM/DD') + ' - ' + moment(this.state.value.end).format('YYYY/MM/DD')) : '')} onClick={this.onToggle} required readOnly></input>
								          {this.state.isOpen && (
								          	<DateRangePicker
								            	value={this.state.value}
								            	onSelect={this.onSelect}
								            	singleDateRange={true}
								          	/>
								           )}
									    </div>
									    <div className="col-lg-12 d-flex justify-content-end">
											<button className="primary-btn mt-20" onClick={this.startSearch}>Search<span className="lnr lnr-arrow-right"></span></button>
										</div>
										{this.props.ifError && <div className="alert-msg">{this.state.errorMsg}</div>}
									  </div>
							  </div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="chart-area feature-area section-gap" id="container">
				{this.props.searchData.length ? <ResponsiveContainer>
				        <AreaChart data={this.props.searchData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
				          <CartesianGrid strokeDasharray="1 1"/>
				          <XAxis dataKey="date"/>
				          <YAxis/>
				          <Tooltip/>
				          <Area type='monotone' dataKey='price' stroke='#8884d8' fill='#8884d8' />
				        </AreaChart>
			        </ResponsiveContainer> : ''}
			</section>
		  </div>
	  )
	}
}

const mapStateToProps = ({ action }) => ({
  src: action.src,
  dest: action.dest,
  onward_date: action.onward_date,
  return_date: action.return_date,
  isSearchCompleted: action.isSearchCompleted,
  ifError: action.ifError,
  searchData: action.searchData
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
      updateSearchData,
      changePage: () => push('/')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
