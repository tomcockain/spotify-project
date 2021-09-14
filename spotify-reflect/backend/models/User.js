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
    song:
    {      
      name: { 
        type: String
      },
      image: {
        type: String
      },
      popularity: {
        type: Number
      },
      preview: {
        type: String
      }
    }
  },  
  longTopSongs: {
    type:[],
    song: {      
      name: { 
        type: String
      },
      image: {
        type: String
      },
      popularity: {
        type: Number
      },
      preview: {
        type: String
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
  longTopArtists: {
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
  recentlyPlayed: {
    type:[],
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