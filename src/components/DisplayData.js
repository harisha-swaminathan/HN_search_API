import React from 'react'
import axios from 'axios';

export default class DisplayData extends React.Component{
    state={
        news:undefined,
        search:'story',
        sort:this.props.sort==='date'?'search_by_date':'search'
    }
    fetchData(){
        
        if(this.props.search==='author'){
            axios.get(`http://hn.algolia.com/api/v1/${this.state.sort}?tags=story,author_${this.props.query}&hitsPerPage=20&page=${this.props.page}`).then((data)=>{
            this.setState({news:data.data.hits,search:'author'})
        })
        }else if(this.props.search==='comment'){
            axios.get(`http://hn.algolia.com/api/v1/${this.state.sort}?query=${this.props.query}&tags=comment&hitsPerPage=20&page=${this.props.page}`).then((data)=>{
                
                this.setState({news:data.data.hits,search:'comment'})
            })
        }else{
            axios.get(`http://hn.algolia.com/api/v1/${this.state.sort}?query=${this.props.query}&hitsPerPage=20&page=${this.props.page}`).then((data)=>{
            this.setState({news:data.data.hits})
        })
        }
        
    }
   
    render(){
        this.fetchData()
        const news=!!this.state.news?this.state.news:undefined
        return(
            <>

                {!!this.state.news && this.state.news.length!==0 && <div>
                   {this.state.search==='story' && news.map((eachNews,index)=>{
                       const date=eachNews.created_at.split('T')[0]
                       return(
                           <div key={index}>
                           <a href={eachNews.url} target="_blank" rel="noopener noreferrer"><h1 className="title">{eachNews.title}</h1></a>
                            <p>{`${eachNews.points} | ${eachNews.author} | ${date}`}</p>
                           </div>
                       )
                   })}
                   {this.state.search==='comment' && news.map((eachNews,index)=>{
                       const date=eachNews.created_at.split('T')[0]
                       return(
                           <div key={index}>
                           <a href={eachNews.story_url} target="_blank" rel="noopener noreferrer"><h1 className="title">{eachNews.story_title}</h1></a>
                            <p>{`${eachNews.points} | ${eachNews.author} |  ${date}`}</p>
                            <p align="justify">{eachNews.comment_text}</p>
                           </div>
                       )
                   })}

                   {this.state.search==='author' && news.map((eachNews,index)=>{
                       const date=eachNews.created_at.split('T')[0]
                       return( 
                           <div key={index}>
                            <h1 className="title">{eachNews.title}</h1>
                            <p>{`${eachNews.points} | ${eachNews.author} |  ${date}`}</p>
                            <p align="justify">{eachNews.story_text}</p>
                           </div>
                       )
                   })}
                </div>
            }
             {!!this.state.news && this.state.news.length===0 && <> No data found</>} 
            </>
        )
    }
}
