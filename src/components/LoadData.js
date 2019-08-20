import React from 'react';
import { connect } from 'react-redux';
import {addSearchTerm} from '../actions/searchTerms'
import DisplayData from './DisplayData';

class LoadData extends React.Component{
  state={
    query:undefined,
    search:'stories',
    sort:'search',
    page:1
  }

  onNextClick=()=>{
    this.setState((prevState)=>{
      return{
        page:prevState.page+1
      }
    })
  }

  onPrevClick=()=>{
    this.setState((prevState)=>{
      return{
        page:prevState.page-1
      }
    })
  }

  onSearch=(e)=>{
    const query=e.target.value;
    if(e.KeyCode===13||e.which===13){
        this.props.addSearchTerm(query)
        this.setState({query})
      e.target.value='';
    }
  }
  onSearchChange=(e) => {
    if (e.target.value ==='stories') {
      this.setState({search:'stories'})
    } else if (e.target.value ==='author') {
      this.setState({search:'author'})
    }else{
      this.setState({search:'comment'})
    }
  };
  onSortChange=(e)=>{
    if (e.target.value ==='date') {
     
      this.setState({sort:'date'})
    } else {
    
      this.setState({sort:'popularity'})
    }
  }
  render(){
    return(
      <>
    <input
    type="text"
    placeholder="Search stories by title, url or author"
    onKeyDown={this.onSearch}>
    </input>
     
    <div className="news">
     <div className="select">
     Search <select value={this.state.search}
    onChange={this.onSearchChange}>
              <option value="stories" >Stories</option>
              <option value="comment">Comments</option>
              <option value="author">Author</option>
            </select> by <select value={this.state.sort}
            onChange={this.onSortChange}>
              <option value="popularity" >popularity</option>
              <option value="date">Date</option>
            </select>
     </div>
      {!!this.state.query && <div>
        <DisplayData query={this.state.query} page={this.state.page} search={this.state.search} sort={this.state.sort}/>
        <div className="button"><button onClick={this.onPrevClick}> Previous </button> <button onClick={this.onNextClick}> Next</button></div>
      </div>
    }
    </div>
    
    </>
    )
  }
}

const mapDispatchToProps=(dispatch)=>({
  addSearchTerm:(search)=>dispatch(addSearchTerm(search))
});

export default connect(undefined, mapDispatchToProps)(LoadData);



