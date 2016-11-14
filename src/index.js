import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import YTSearch from 'youtube-api-search';

const YOUTUBE_API_KEY = 'AIzaSyBBpiorx3wB-tEkJ5KIhJOLeT52YqZoWFA';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {videos:[],
                  selectedVideo:null};
    this.videoSearch('rafa de villa dominico',10);
    this.videoSearch('avelino daleleo',10);
    this.videoSearch('damian soundsystem',10);
  }

  videoSearch(termSearch,maxResults){

    if(maxResults === null ){
      maxResults=10;
    }
    YTSearch({key:YOUTUBE_API_KEY,term:termSearch,maxResults:maxResults},(newVideos) => {

      let videos2 = this.state.videos;

      newVideos.map((video)=>videos2.push(video));

      this.setState({videos:videos2,
                    selectedVideo:newVideos[0]});
    });
  }

  render(){
    console.log("state.videos: "+this.state.videos.length);

    const videoSearchDebounce = _.debounce((term) => {this.videoSearch(term)},400);


    return (
      <div>
        <SearchBar onSearchTermChange={term => videoSearchDebounce(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
      </div>
    );
  }

}
ReactDOM.render(<App/>,document.querySelector('.container '));
