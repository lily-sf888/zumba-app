var YouTube = require('youtube-node');

import { ref } from './base'

 var youTube = new YouTube();

 console.log('key', process.env.REACT_APP_YOUTUBE_API)

 youTube.setKey(process.env.REACT_APP_YOUTUBE_API);

 youTube.search('zumba', 2, function(error, result) {
   if (error) {
    console.log("ERROR", error);
   }
   else {
     console.log('result:', result);
     var videoIds = result.items.map(video => video.id.videoId)

     ref.child('/youtube').set({videoIds})
   }


 });

 exports.youTube = youTube;
