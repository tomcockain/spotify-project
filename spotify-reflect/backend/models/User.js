const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  profileImage: {
    type: String,
    require: true
  },
  shortTopSongs: {
    type: [],
    artist:
    {      
      name: { 
        type: String
      },
      image: {
        type: String
      },
      popularity: {
        type: Number
      }
    }
  },  
  longTopSongs: {
    song: {      
      name: { 
        type: String
      },
      image: {
        type: String
      },
      popularity: {
        type: Number
      }
    }
  },
  shortTopArtists: {
      type: [],
      artist: {
        name: { 
          type: String
        },
        image: {
          type: String
        },
        popularity: {
          type: Number
        },
        genres: {
          type: [String]
        }
      }  
    },
  longTopArtists: [{}],
  recentlyPlayed: {

  },
  followers: {
    type: Number,
    require: true
  },
  Playlists: {
    playlist: {
      name: String,
      image: String
    }
  }
});

module.exports = mongoose.model('User', UserSchema);