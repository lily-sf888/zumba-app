require('dotenv').config();
var YouTube = require('youtube-node');

import { ref } from './base'

 var youTube = new YouTube();

 youTube.setKey(process.env.REACT_APP_SECRET_CODE);

 youTube.search('zumba', 2, function(error, result) {
   if (error) {
    console.log("ERROR", error);
   }
   else {
     var videoIds = result.items.map(video => video.id.videoId)

     ref.child('/youtube').set({videoIds})
   }


 });

 exports.youTube = youTube;


 //console.log('YOUTUBE', youTube)
