var YouTube = require('youtube-node');

require('dotenv').config();

//console.log('key' + process.env.MY_KEY);

 var youTube = new YouTube();

 youTube.setKey(process.env.MY_KEY);

 youTube.search('zumba', 2, function(error, result) {
   if (error) {
    console.log(error);
   }
   else {
      JSON.stringify(result, null, 2);
   }


 });

 exports.youTube = youTube;


 //console.log('YOUTUBE', youTube)
