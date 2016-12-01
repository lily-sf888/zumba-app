import YouTube from 'youtube-node'
import { ref } from './base'

 var youTube = new YouTube();

 youTube.setKey(process.env.REACT_APP_YOUTUBE_API);

 youTube.search('zumba', 3, function(error, result) {
   if (error) {
    console.log("ERROR", error);
   }
   else {
     //mapping over the result so we only store the ids in our firebase database
     var videoIds = result.items.map(video => video.id.videoId)
     //adding a child to our database called youtube and setting the ids there
     ref.child('/youtube').set({videoIds})
   }
});

export default youTube