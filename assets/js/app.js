const OWNER_EMAIL = 'hshasibhasan@gmail.com';

const initialChannels = [
    { id: 'c1', name: 'Hs Anime Studio', handle: '@hsanimeduniya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', subs: 185000, bio: 'Official Hs Anime Duniya releases, dubs & edits.', status: 'approved', ownerEmail: OWNER_EMAIL },
    { id: 'c2', name: 'Shonen Pulse', handle: '@shonenpulse', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', subs: 89000, bio: 'Action and Shonen anime releases.', status: 'approved', ownerEmail: OWNER_EMAIL }
];

const initialVideos = [
    {
        id: 'v1',
        channelId: 'c1',
        title: 'Demon Slayer: Infinity Castle',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumb: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
        category: 'Shonen',
        language: 'Hindi',
        year: '2026',
        trendingRank: '1',
        views: 942000,
        likes: 84500,
        date: '2026',
        desc: 'The epic climax of Demon Slayer begins in high-bitrate Hs Anime Duniya streaming.',
        status: 'approved'
    },
    {
        id: 'v2',
        channelId: 'c1',
        title: 'Black Clover: Sword of the Wizard King',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumb: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
        category: 'Action',
        language: 'Hindi',
        year: '2026',
        trendingRank: '2',
        views: 689000,
        likes: 54200,
        date: '2026',
        desc: 'Asta faces past wizard kings to defend the kingdom.',
        status: 'approved'
    },
    {
        id: 'v3',
        channelId: 'c2',
        title: 'Jujutsu Kaisen 0',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
        category: 'Shonen',
        language: 'Hindi',
        year: '2022',
        trendingRank: '3',
        views: 512000,
        likes: 42100,
        date: '2022',
        desc: 'Yuta Okkotsu battles curse spirits with Gojo Satoru.',
        status: 'approved'
    },
    {
        id: 'v4',
        channelId: 'c1',
        title: 'Weathering With You',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
        category: 'Romance',
        language: 'Hindi',
        year: '2026',
        trendingRank: '4',
        views: 492000,
        likes: 38100,
        date: '2026',
        desc: 'A high school boy runs away to Tokyo and befriends a girl who can manipulate the weather.',
        status: 'approved'
    },
    {
        id: 'v5',
        channelId: 'c2',
        title: 'Your Name (Kimi no Na wa)',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        thumb: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
        category: 'Romance',
        language: 'Hindi',
        year: '2024',
        trendingRank: '5',
        views: 810000,
        likes: 74000,
        date: '2024',
        desc: 'Two strangers find themselves linked in a bizarre way.',
        status: 'approved'
    },
    {
        id: 'v6',
        channelId: 'c2',
        title: 'Mandaadi From Today',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
        category: 'Action',
        language: 'Hindi',
        year: '2026',
        trendingRank: '6',
        views: 410000,
        likes: 39000,
        date: '2026',
        desc: 'High energy action packed movie.',
        status: 'approved'
    }
];

let currentUser = JSON.parse(localStorage.getItem('ap_user')) || { username: 'Hasib', email: OWNER_EMAIL, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop' };
let channels = JSON.parse(localStorage.getItem('ap_channels')) || initialChannels;
let videos = JSON.parse(localStorage.getItem('ap_videos')) || initialVideos;
let userSubs = JSON.parse(localStorage.getItem('ap_subs')) || ['c1'];
let savedVideos = JSON.parse(localStorage.getItem('ap_saved')) || ['v1', 'v5'];
let watchHistory = JSON.parse(localStorage.getItem('ap_history')) || ['v1', 'v2', 'v3'];
let videoComments = JSON.parse(localStorage.getItem('ap_comments')) || {};

let currentActiveVideo = videos[0];

window.addEventListener('DOMContentLoaded', () => {
    renderAuthUI();
    renderMostWatchedRow();
    renderVideosGrid(getApprovedVideos());
    renderSavedGrid();
    renderHistoryGrid();
    renderChannelsGrid();
    renderSidebarSubs();
    updateAdminBadge();
    renderEpisodesGrid(1, 24, 1);
});

function getApprovedVideos() {
    return videos.filter(v => v.status === 'approved');
}

function isOwnerLoggedIn() {
    return currentUser && currentUser.email && currentUser.email.toLowerCase() === OWNER_EMAIL.toLowerCase();
}

function renderAuthUI() {
    const box = document.getElementById('authNavBox');
    const ownerBtn = document.getElementById('ownerAdminBtn');
    
    if (isOwnerLoggedIn()) {
        if (ownerBtn) ownerBtn.classList.remove('hidden');
    } else {
        if (ownerBtn) ownerBtn.classList.add('hidden');
    }

    if (!box) return;

    if (currentUser) {
        box.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}" class="w-8 h-8 rounded-full border border-purple-500/50 object-cover">
                <span class="text-xs font-semibold text-zinc-200 hidden md:inline">${currentUser.username}</span>
                <button onclick="handleLogout()" class="text-xs text-zinc-400 hover:text-rose-400 p-1.5 transition" title="Logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        `;
    } else {
        box.innerHTML = `
            <button onclick="openModal('authModal')" class="bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-semibold px-4 py-2 rounded-full transition">
                Sign In
            </button>
        `;
    }
}

function updateAdminBadge() {
    const badge = document.getElementById('pendingCountBadge');
    if (!badge) return;
    const pendingCh = channels.filter(c => c.status === 'pending').length;
    const pendingVid = videos.filter(v => v.status === 'pending').length;
    const total = pendingCh + pendingVid;
    badge.textContent = total;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('-translate-x-full');
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function renderVideosGrid(videoList) {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;
    renderVideosGridInTarget(videoList, grid);
}

function renderVideosGridInTarget(videoList, targetContainer) {
    targetContainer.innerHTML = '';
    if (videoList.length === 0) {
        targetContainer.innerHTML = `<p class="col-span-full text-sm text-zinc-500 text-center py-8">No anime videos found.</p>`;
        return;
    }

    videoList.forEach(v => {
        const isSaved = savedVideos.includes(v.id);
        const card = document.createElement('div');
        card.className = 'poster-card relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between';
        card.innerHTML = `
            <div onclick="watchVideo('${v.id}')" class="relative aspect-[2/3] w-full overflow-hidden bg-black">
                <img src="${v.thumb}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <span class="absolute top-2 left-2 bg-purple-600/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    ${v.language || 'Hindi'}
                </span>
                <button onclick="event.stopPropagation(); toggleSaveAnime('${v.id}')" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur text-amber-400 flex items-center justify-center hover:scale-110 transition">
                    <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark text-xs"></i>
                </button>
                <div class="absolute bottom-2 left-2 right-2 text-left">
                    <span class="text-[10px] font-medium text-cyan-400 block">${v.category}</span>
                    <h4 class="text-xs font-bold text-white truncate leading-snug">${v.title}</h4>
                </div>
            </div>
        `;
        targetContainer.appendChild(card);
    });
}

function renderSavedGrid() {
    const grid = document.getElementById('savedGrid');
    if (!grid) return;
    const items = videos.filter(v => savedVideos.includes(v.id));
    if (items.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-sm text-zinc-500 text-center py-12">No saved anime videos yet!</p>`;
        return;
    }
    renderVideosGridInTarget(items, grid);
}

function toggleSaveAnime(vidId) {
    if (savedVideos.includes(vidId)) {
        savedVideos = savedVideos.filter(id => id !== vidId);
        showToast('Removed from saved');
    } else {
        savedVideos.push(vidId);
        showToast('Saved to collection!');
    }
    saveState();
    renderSavedGrid();
    if (currentActiveVideo && currentActiveVideo.id === vidId) {
        renderVideosGrid(getApprovedVideos());
    }
}

function requestUploadModal() {
    if (!currentUser) {
        openModal('authModal');
        return;
    }
    const userChs = channels.filter(c => c.status === 'approved');
    const select = document.getElementById('upChannelSelect');
    if (select) {
        select.innerHTML = userChs.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
    openModal('uploadModal');
}

function requestChannelModal() {
    if (!currentUser) {
        openModal('authModal');
        return;
    }
    openModal('channelModal');
}

function handleRequestChannel(e) {
    e.preventDefault();
    const name = document.getElementById('chName').value;
    const handle = document.getElementById('chHandle').value;
    const avatar = document.getElementById('chAvatar').value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
    const bio = document.getElementById('chBio').value;

    const newCh = {
        id: 'c_' + Date.now(),
        name,
        handle,
        avatar,
        bio,
        subs: 0,
        status: isOwnerLoggedIn() ? 'approved' : 'pending',
        ownerEmail: currentUser.email
    };

    channels.push(newCh);
    saveState();
    closeModal('channelModal');
    e.target.reset();

    if (newCh.status === 'approved') {
        showToast('Channel created and approved!');
        renderChannelsGrid();
    } else {
        showToast('Channel submitted for owner approval!');
    }
}

function handleRequestUpload(e) {
    e.preventDefault();
    const channelId = document.getElementById('upChannelSelect').value || (channels[0] && channels[0].id);
    const title = document.getElementById('upTitle').value;
    const videoUrl = document.getElementById('upVideoUrl').value;
    const thumb = document.getElementById('upThumb').value || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop';
    const lang = document.getElementById('upLang').value || 'Hindi';
    const year = document.getElementById('upYear').value || '2026';
    const category = document.getElementById('upCategory').value || 'Shonen';

    const newVid = {
        id: 'v_' + Date.now(),
        channelId,
        title,
        videoUrl,
        thumb,
        category,
        language: lang,
        year,
        views: 0,
        likes: 0,
        date: '2026',
        desc: 'User uploaded anime content.',
        status: isOwnerLoggedIn() ? 'approved' : 'pending'
    };

    videos.push(newVid);
    saveState();
    closeModal('uploadModal');
    e.target.reset();

    if (newVid.status === 'approved') {
        showToast('Video published successfully!');
        renderVideosGrid(getApprovedVideos());
        renderMostWatchedRow();
    } else {
        showToast('Upload sent to owner for approval!');
    }
}

function handleBottomNav(type, btnElement) {
    const indicator = document.getElementById('navActiveIndicator');
    if (indicator && btnElement) {
        btnElement.appendChild(indicator);
    }

    if (type === 'Home') {
        switchTab('homeTab');
        renderVideosGrid(getApprovedVideos());
        showToast('Welcome to Home');
    } else if (type === 'Movies') {
        switchTab('homeTab');
        const movies = getApprovedVideos().filter(v => v.category === 'Romance' || v.category === 'Action' || v.title.toLowerCase().includes('movie'));
        renderVideosGrid(movies.length ? movies : getApprovedVideos());
        showToast('Showing Movies');
    } else if (type === 'Series') {
        switchTab('homeTab');
        const series = getApprovedVideos().filter(v => v.category === 'Shonen' || v.category === 'Isekai');
        renderVideosGrid(series.length ? series : getApprovedVideos());
        showToast('Showing Anime Series');
    } else if (type === 'Anime') {
        switchTab('homeTab');
        renderVideosGrid(getApprovedVideos());
        showToast('All Anime Library');
    } else if (type === 'Search') {
        switchTab('homeTab');
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        showToast('Search bar active');
    }
}

function openAdminPanel() {
    if (!isOwnerLoggedIn()) return;
    renderAdminDashboard();
    openModal('adminModal');
}

function renderAdminDashboard() {
    const chBox = document.getElementById('adminChannelRequests');
    const upBox = document.getElementById('adminUploadRequests');
    
    const pendingCh = channels.filter(c => c.status === 'pending');
    const pendingVid = videos.filter(v => v.status === 'pending');

    if (chBox) {
        if (pendingCh.length === 0) {
            chBox.innerHTML = `<p class="text-xs text-zinc-500">No pending channel requests.</p>`;
        } else {
            chBox.innerHTML = pendingCh.map(c => `
                <div class="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between text-xs">
                    <div>
                        <h5 class="font-bold text-white">${c.name} (${c.handle})</h5>
                        <p class="text-zinc-400">${c.ownerEmail}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="approveChannel('${c.id}')" class="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg">Approve</button>
                        <button onclick="rejectChannel('${c.id}')" class="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg">Reject</button>
                    </div>
                </div>
            `).join('');
        }
    }

    if (upBox) {
        if (pendingVid.length === 0) {
            upBox.innerHTML = `<p class="text-xs text-zinc-500">No pending video upload requests.</p>`;
        } else {
            upBox.innerHTML = pendingVid.map(v => `
                <div class="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between text-xs">
                    <div>
                        <h5 class="font-bold text-white">${v.title}</h5>
                        <p class="text-zinc-400">Category: ${v.category} | Lang: ${v.language}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="approveVideo('${v.id}')" class="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg">Approve</button>
                        <button onclick="rejectVideo('${v.id}')" class="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg">Reject</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function approveChannel(id) {
    const ch = channels.find(c => c.id === id);
    if (ch) ch.status = 'approved';
    saveState();
    renderAdminDashboard();
    renderChannelsGrid();
    showToast('Channel approved!');
}

function rejectChannel(id) {
    channels = channels.filter(c => c.id !== id);
    saveState();
    renderAdminDashboard();
    showToast('Channel request rejected');
}

function approveVideo(id) {
    const v = videos.find(item => item.id === id);
    if (v) v.status = 'approved';
    saveState();
    renderAdminDashboard();
    renderVideosGrid(getApprovedVideos());
    renderMostWatchedRow();
    showToast('Video approved & published!');
}

function rejectVideo(id) {
    videos = videos.filter(v => v.id !== id);
    saveState();
    renderAdminDashboard();
    showToast('Video request rejected');
}

function saveState() {
    localStorage.setItem('ap_user', JSON.stringify(currentUser));
    localStorage.setItem('ap_channels', JSON.stringify(channels));
    localStorage.setItem('ap_videos', JSON.stringify(videos));
    localStorage.setItem('ap_subs', JSON.stringify(userSubs));
    localStorage.setItem('ap_saved', JSON.stringify(savedVideos));
    localStorage.setItem('ap_history', JSON.stringify(watchHistory));
    localStorage.setItem('ap_comments', JSON.stringify(videoComments));
    updateAdminBadge();
}

function renderMostWatchedRow() {
    const row = document.getElementById('mostWatchedRow');
    if(!row) return;

    const topVids = getApprovedVideos().slice(0, 5);
    row.innerHTML = '';

    topVids.forEach((v, index) => {
        const rank = index + 1;
        const item = document.createElement('div');
        item.className = 'relative flex-none w-44 sm:w-52 h-64 sm:h-72 cursor-pointer group select-none pr-4';
        
        item.innerHTML = `
            <div onclick="watchVideo('${v.id}')" class="w-full h-full relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-purple-500/50">
                <img src="${v.thumb}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-80"></div>
                
                <div class="absolute bottom-3 left-3 right-3 text-left">
                    <span class="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">${v.language || 'Hindi'}</span>
                    <h4 class="text-xs font-bold text-white leading-tight truncate group-hover:text-cyan-300 transition-colors">${v.title}</h4>
                </div>

                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                    <div class="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
                        <i class="fa-solid fa-play ml-0.5 text-sm"></i>
                    </div>
                </div>
            </div>

            <div class="absolute -left-3 bottom-0 text-[95px] sm:text-[110px] font-black leading-none pointer-events-none select-none tracking-tighter"
                 style="-webkit-text-stroke: 3px rgba(255, 255, 255, 0.95); color: #08080c; text-shadow: 0 10px 20px rgba(0,0,0,0.9); font-family: 'Inter', sans-serif;">
                ${rank}
            </div>
        `;
        row.appendChild(item);
    });
}

function addToHistory(vid) {
    watchHistory = watchHistory.filter(id => id !== vid);
    watchHistory.unshift(vid);
    saveState();
    renderHistoryGrid();
}

function clearHistory() {
    watchHistory = [];
    saveState();
    renderHistoryGrid();
    showToast('Watch History cleared!');
}

function renderHistoryGrid() {
    const grid = document.getElementById('historyGrid');
    if(!grid) return;
    const items = videos.filter(v => watchHistory.includes(v.id));

    if(items.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-sm text-zinc-500 text-center py-12">No watch history yet. Videos you watch will automatically show up here!</p>`;
        return;
    }
    renderVideosGridInTarget(items, grid);
}

function watchVideo(videoId) {
    const v = videos.find(item => item.id === videoId);
    if(!v) return;

    currentActiveVideo = v;
    addToHistory(v.id);

    const ch = channels.find(c => c.id === v.channelId) || channels[0];

    document.getElementById('playerTitle').textContent = v.title;
    document.getElementById('playerChannelName').innerHTML = `${ch.name} <i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i>`;
    document.getElementById('playerChannelAvatar').src = ch.avatar;
    document.getElementById('playerSubCount').textContent = `${(ch.subs / 1000).toFixed(1)}K subscribers`;
    document.getElementById('playerLikeCount').textContent = v.likes;
    document.getElementById('playerViews').textContent = `${v.views.toLocaleString()} views`;
    document.getElementById('playerDate').textContent = v.date;
    document.getElementById('playerCategory').textContent = `#${v.category}`;
    document.getElementById('playerDesc').textContent = v.desc || 'Watch anime and AMV content in high bitrate streaming.';

    const player = document.getElementById('activeVideoPlayer');
    player.src = v.videoUrl;
    player.play().catch(() => {});

    renderEpisodesGrid(1, 24, 1);
    switchTab('watchTab');
}

let activeEpisode = 1;

function renderEpisodesGrid(seasonNum, totalEpisodes = 24, activeEp = 1) {
    const grid = document.getElementById('episodesGrid');
    if(!grid) return;
    grid.innerHTML = '';

    for (let i = 1; i <= totalEpisodes; i++) {
        const epNumStr = i < 10 ? `0${i}` : `${i}`;
        const isActive = i === activeEp;

        const epBtn = document.createElement('button');
        epBtn.onclick = () => selectEpisode(i);
        epBtn.className = `relative flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition duration-200 border ${
            isActive 
            ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/40 scale-105' 
            : 'bg-zinc-800/90 text-zinc-300 border-zinc-700/80 hover:bg-zinc-700 hover:text-white'
        }`;

        epBtn.innerHTML = `
            <div class="absolute top-1 left-1.5 opacity-60">
                <i class="fa-solid fa-crown text-[8px] text-amber-400"></i>
            </div>
            <span class="mt-1">${epNumStr}</span>
        `;
        grid.appendChild(epBtn);
    }
}

function selectEpisode(epNum) {
    activeEpisode = epNum;
    const season = document.getElementById('seasonSelect').value || 1;
    renderEpisodesGrid(season, 24, activeEpisode);
    showToast(`Loading Episode ${epNum < 10 ? '0' + epNum : epNum}...`);

    const player = document.getElementById('activeVideoPlayer');
    if (player) {
        player.currentTime = 0;
        player.play().catch(() => {});
    }
}

function changeSeason(seasonVal) {
    activeEpisode = 1;
    const epCount = seasonVal === '1' ? 24 : seasonVal === '2' ? 12 : 25;
    renderEpisodesGrid(seasonVal, epCount, 1);
    showToast(`Switched to Season ${seasonVal}`);
}

function changeEpisodeAudio(lang) {
    showToast(`Audio changed to ${lang}`);
}

function renderChannelsGrid() {
    const grid = document.getElementById('channelsGrid');
    if(!grid) return;
    grid.innerHTML = '';

    const approvedCh = channels.filter(c => c.status === 'approved');

    approvedCh.forEach(ch => {
        const isSubbed = userSubs.includes(ch.id);
        const card = document.createElement('div');
        card.className = 'glass-card p-5 rounded-2xl flex flex-col items-center text-center space-y-3 cursor-pointer group';
        card.innerHTML = `
            <img onclick="openChannelProfile('${ch.id}')" src="${ch.avatar}" class="w-16 h-16 rounded-full object-cover border-2 border-purple-500/40 group-hover:scale-105 transition-transform">
            <div onclick="openChannelProfile('${ch.id}')">
                <h4 class="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">${ch.name}</h4>
                <p class="text-xs text-purple-400 font-mono">${ch.handle}</p>
            </div>
            <p class="text-xs text-zinc-400 line-clamp-2">${ch.bio}</p>
            <button onclick="event.stopPropagation(); toggleChannelSub('${ch.id}')" class="w-full py-2 rounded-xl text-xs font-semibold ${isSubbed ? 'bg-zinc-800 text-zinc-300' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'} transition">
                ${isSubbed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
        `;
        grid.appendChild(card);
    });
}

function openChannelProfile(channelId) {
    const ch = channels.find(c => c.id === channelId);
    if (!ch) return;

    const chVids = getApprovedVideos().filter(v => v.channelId === channelId);

    document.getElementById('cpName').innerHTML = `${ch.name} <i class="fa-solid fa-circle-check text-cyan-400 text-sm"></i>`;
    document.getElementById('cpHandle').textContent = ch.handle;
    document.getElementById('cpAvatar').src = ch.avatar;
    document.getElementById('cpBio').textContent = ch.bio || 'Official channel on Hs Anime Duniya.';
    document.getElementById('cpSubCount').textContent = `${(ch.subs / 1000).toFixed(1)}K Subscribers`;
    document.getElementById('cpVidCount').textContent = `${chVids.length} Videos`;

    const subBtn = document.getElementById('cpSubBtn');
    const isSubbed = userSubs.includes(ch.id);
    subBtn.textContent = isSubbed ? 'Subscribed ✓' : 'Subscribe';
    subBtn.className = isSubbed 
        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm px-6 py-2.5 rounded-full transition'
        : 'bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-purple-600/30 transition';
    
    subBtn.onclick = () => {
        toggleChannelSub(ch.id);
        openChannelProfile(ch.id);
    };

    const grid = document.getElementById('channelVideosGrid');
    renderVideosGridInTarget(chVids, grid);

    switchTab('channelProfileTab');
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.add('-translate-x-full');
    }
}

function toggleChannelSub(channelId) {
    if(userSubs.includes(channelId)) {
        userSubs = userSubs.filter(id => id !== channelId);
        showToast('Unsubscribed');
    } else {
        userSubs.push(channelId);
        showToast('Subscribed to channel!');
    }
    saveState();
    renderChannelsGrid();
    renderSidebarSubs();
}

function renderSidebarSubs() {
    const box = document.getElementById('sidebarSubsList');
    if(!box) return;
    box.innerHTML = '';

    userSubs.forEach(id => {
        const ch = channels.find(c => c.id === id);
        if(ch) {
            const btn = document.createElement('button');
            btn.onclick = () => openChannelProfile(ch.id);
            btn.className = 'w-full flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs text-zinc-300 hover:bg-purple-500/10 hover:text-purple-300 transition group';
            btn.innerHTML = `
                <img src="${ch.avatar}" class="w-5 h-5 rounded-full object-cover border border-purple-500/40">
                <span class="truncate group-hover:font-semibold">${ch.name}</span>
            `;
            box.appendChild(btn);
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const username = document.getElementById('loginUsername').value;

    currentUser = { email, username, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop' };
    saveState();
    renderAuthUI();
    closeModal('authModal');
    showToast(`Signed in as ${username} (${email})`);
}

function handleLogout() {
    currentUser = null;
    saveState();
    renderAuthUI();
    showToast('Signed out');
}

function filterCategory(cat) {
    document.querySelectorAll('.cat-chip').forEach(c => {
        c.className = 'cat-chip px-4 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap transition';
    });
    event.target.className = 'cat-chip px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-600 text-white shadow-lg shadow-purple-600/30 whitespace-nowrap transition';

    const approved = getApprovedVideos();
    if(cat === 'All') {
        renderVideosGrid(approved);
    } else {
        renderVideosGrid(approved.filter(v => v.category === cat));
    }
}

function executeSearch() {
    const q = document.getElementById('searchInput').value.toLowerCase().trim();
    const approved = getApprovedVideos();
    if(!q) {
        renderVideosGrid(approved);
        return;
    }
    renderVideosGrid(approved.filter(v => v.title.toLowerCase().includes(q) || v.category.toLowerCase().includes(q)));
    switchTab('homeTab');
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        executeSearch();
    } else {
        executeSearch();
    }
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function openShareModal() { openModal('shareModal'); }

function copyShareUrl() {
    const input = document.getElementById('shareUrlInput');
    input.select();
    document.execCommand('copy');
    showToast('Poster link copied to clipboard!');
    closeModal('shareModal');
}

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    }, 3000);
}
