import YouTube from 'youtube-node'

require('dotenv').config();

//console.log('key' + process.env.MY_KEY);

 var youTube = new YouTube();

 youTube.setKey(process.env.MY_KEY);

 youTube.search('zumba', 2, function(error, result) {
   if (error) {
    console.log(error);
   }
   else {
     console.log(JSON.stringify(result, null, 2));
   }
 });
