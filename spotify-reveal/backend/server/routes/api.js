const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
const axios = require('axios');
const { resolveModuleNameFromCache, resolveModuleName } = require('typescript');
const { AsyncResource } = require('async_hooks');
const { send } = require('process');

router.get('/user/profile', (req, res) => {

    axios('https://api.spotify.com/v1/me',{
      headers: {
        'Authorization': req.header('Authorization'),
      }})
    .then(response => {
      res.send(response.data);
    });
    
});

router.get('/user/topArtistShort', (req, res) => {

  axios('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=20',{
      headers: {
        'Authorization': req.header('Authorization'),
      }})
      .then(response => {
        res.send(response.data);
      });
});

router.get('/user/topArtistLong', (req, res) => {

  axios('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50',{
    headers: {
      'Authorization': req.header('Authorization'),
    }})
    .then(response => {
      res.send(response.data);
    });
});
router.get('/user/topSongShort', (req, res) => {

  axios('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50',{
    headers: {
      'Authorization': req.header('Authorization'),
    }})
    .then(response => {
      res.send(response.data);
    });
});
router.get('/user/topSongLong', (req, res) => {

  axios('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',{
    headers: {
      'Authorization': req.header('Authorization'),
    }})
    .then(response => {
      res.send(response.data);
    });
});

router.get('/user/recentlyPlayed', (req, res) => {

  axios('https://api.spotify.com/v1/me/player/recently-played?limit=25&after=1484811043508',{
    headers: {
      'Authorization': req.header('Authorization'),
    }})
    .then(response => {
      res.send(response.data);
    });
});
router.get('/user/playlists', (req, res) => {

  axios('https://api.spotify.com/v1/me/playlists?limit=50',{
    headers: {
      'Authorization': req.header('Authorization'),
    }})
    .then(response => {
      res.send(response.data);
    });
});
router.post('/user', async (req, res) => {

  const user = new User({
    name: req.body.name,
    profileImage: req.body.profileImage,
    shortTopArtists: req.body.shortTopArtists,
    shortTopSongs: req.body.shortTopSongs,
    longTopArtists: req.body.longTopArtists,
    longTopSongs: req.body.longTopSongs,
    followers: req.body.followers,
    recentlyPlayed: req.body.recentlyPlayed,
    playlists: req.body.playlists
  });
  try{  
    const savedUser = await user.save();
    res.json(savedUser);  
  }catch(err){
    res.json({message: err});
  }

});

router.delete('/user', async (req, res) => {
  
  try{
    const user = await User.deleteMany({
      name: req.body.name
    });
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(user));
  }catch(err){
    res.json({message: err});
  }
  
});

router.get('/user', async (req, res) => {

  try{
    console.log(req.query.name);
    const user = await User.findOne({
      name: req.query.name
    });
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(user));
  }catch(err){
    res.json({message: err});
  }
});

router.get('/user/longTopSongs', async (req, res) => {

  try{
    console.log(req.query.name);
    const user = await User.findOne({
      name: req.query.name
    });
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(user));
  }catch(err){
    res.json({message: err});
  }
})


module.exports = router; 