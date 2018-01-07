import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import YTsearch from 'youtube-api-search'
import _ from 'lodash'

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDp5v5l6gn_EbVPPA4kgC4WiPhU_Mrit-s'

class App extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            videos : [],
            SelectedVideo : null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTsearch({key:API_KEY, term : term}, (videos) => {
            this.setState({videos:videos, SelectedVideo : videos[0]});
            //given that the parameter and the prop have the same name, that can be done. else: this.setState({videos:videos})
        });
    }
    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},500);

        return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch} />
            <VideoDetail video={this.state.SelectedVideo} />
            <VideoList 
                onVideoSelect ={SelectedVideo => this.setState({SelectedVideo})}
                videos={this.state.videos}/>
        </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));