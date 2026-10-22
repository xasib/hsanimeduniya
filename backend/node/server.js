const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const OWNER_EMAIL = 'hshasibhasan@gmail.com';

// MongoDB Models
const VideoSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    thumb: String,
    category: String,
    language: String,
    year: String,
    status: { type: String, default: 'pending' },
    ownerEmail: String
});
const Video = mongoose.model('Video', VideoSchema);

const ChannelSchema = new mongoose.Schema({
    name: String,
    handle: String,
    avatar: String,
    bio: String,
    status: { type: String, default: 'pending' },
    ownerEmail: String
});
const Channel = mongoose.model('Channel', ChannelSchema);

// REST API Endpoints
app.get('/api/videos', async (req, res) => {
    const videos = await Video.find({ status: 'approved' });
    res.json(videos);
});

app.post('/api/videos', async (req, res) => {
    const newVideo = new Video(req.body);
    if (req.body.ownerEmail === OWNER_EMAIL) {
        newVideo.status = 'approved';
    }
    await newVideo.save();
    res.status(201).json(newVideo);
});

app.get('/api/admin/pending', async (req, res) => {
    const pendingVideos = await Video.find({ status: 'pending' });
    const pendingChannels = await Channel.find({ status: 'pending' });
    res.json({ videos: pendingVideos, channels: pendingChannels });
});

app.post('/api/admin/approve/:type/:id', async (req, res) => {
    const { type, id } = req.params;
    if (type === 'video') {
        await Video.findByIdAndUpdate(id, { status: 'approved' });
    } else {
        await Channel.findByIdAndUpdate(id, { status: 'approved' });
    }
    res.json({ message: 'Approved successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hs Anime Duniya Backend running on port ${PORT}`));
