const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, 'public')));

// --- GAME LOGIC ---
class ThullaGame {
    constructor(roomId) {
        this.roomId = roomId;
        this.players = [];       
        this.gameStarted = false;
        
        this.deck = [];
        this.table = [];         
        this.currentRoundCards = []; 
        
        this.currentPlayerIndex = 0;
        this.leadingSuit = null;
        
        this.roundClearing = false;
        this.winners = [];
        this.isFirstMove = true; 
    }

    addPlayer(id, name) {
        if (this.gameStarted) return false;
        if (this.players.length >= 6) return false;
        
        const existing = this.players.find(p => p.id === id);
        if (existing) {
            existing.name = name;
            return true;
        }

        this.players.push({
            id: id,
            name: name,
            hand: [],
            cardCount: 0,
            isActive: true
        });
        return true;
    }

    removePlayer(id) {
        this.players = this.players.filter(p => p.id !== id);
    }

    startGame() {
        if (this.players.length < 1) return false;

        this.gameStarted = true;
        this.isFirstMove = true; 
        this.createDeck();
        this.dealCards();
        
        let starter = this.players.findIndex(p => p.hand.some(c => c.suit === 'spades' && c.rank === 'ace'));
        if (starter === -1) starter = 0;
        this.currentPlayerIndex = starter;
        return true;
    }

    createDeck() {
        const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
        const ranks = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
        this.deck = [];
        suits.forEach(s => {
            ranks.forEach(r => {
                this.deck.push({
                    id: `${s}_${r}`,
                    suit: s,
                    rank: r,
                    value: ranks.indexOf(r) + 2
                });
            });
        });
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    dealCards() {
        const pCount = this.players.length;
        const cardsPerPlayer = Math.floor(52 / pCount);
        const dealDeck = this.deck.slice(0, cardsPerPlayer * pCount);

        this.players.forEach((p, i) => {
            p.hand = dealDeck.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer);
            p.cardCount = p.hand.length;
        });
    }

    playCard(playerId, cardId) {
        if (this.roundClearing) return { success: false, message: "Wait for round to clear" };
        
        const pIndex = this.players.findIndex(p => p.id === playerId);
        if (pIndex !== this.currentPlayerIndex) return { success: false, message: "Not your turn" };

        const player = this.players[pIndex];
        const cardIdx = player.hand.findIndex(c => c.id === cardId);
        
        if (cardIdx === -1) return { success: false, message: "Card not in hand" };
        const cardObj = player.hand[cardIdx];

        if (this.isFirstMove) {
            if (cardObj.suit !== 'spades' || cardObj.rank !== 'ace') {
                return { success: false, message: "First move must be Ace of Spades!" };
            }
            this.isFirstMove = false;
        }

        if (this.currentRoundCards.length > 0) {
            const hasSuit = player.hand.some(c => c.suit === this.leadingSuit);
            if (hasSuit && cardObj.suit !== this.leadingSuit) {
                return { success: false, message: `Must play ${this.leadingSuit}` };
            }
        } else {
            this.leadingSuit = cardObj.suit;
        }

        player.hand.splice(cardIdx, 1);
        player.cardCount--;
        
        this.currentRoundCards.push({
            card: cardObj,
            playerId: playerId,
            playerIndex: pIndex
        });

        // --- UPDATED WIN LOGIC ---
        let isGameOver = false;
        if (player.cardCount === 0) {
            player.isActive = false;
            this.winners.push(player.name);
            
            // Check if only 1 (or 0) players are left active
            const activeCount = this.players.filter(p => p.isActive).length;
            if (activeCount < 2) {
                isGameOver = true;
            }
        }

        // Return the gameOver flag
        return { success: true, card: cardObj, playerIndex: pIndex, gameOver: isGameOver };
    }

    checkRoundEnd() {
            // 1. CRITICAL FIX: Check Thulla FIRST (Before checking if round is full)
            // If the last card played does NOT match the leading suit, it is immediately Thulla.
            const lastMove = this.currentRoundCards[this.currentRoundCards.length - 1];
            if (lastMove.card.suit !== this.leadingSuit) {
                return { type: 'thulla' };
            }

            // 2. If suits match, THEN check if round is full
            const activePlayers = this.players.filter(p => p.isActive);
            if (this.currentRoundCards.length >= activePlayers.length) {
                return { type: 'normal' };
            }

            return { type: 'continue' };
        }

    resolveRound(type) {
        const validCards = this.currentRoundCards.filter(c => c.card.suit === this.leadingSuit);
        validCards.sort((a, b) => b.card.value - a.card.value); 
        
        if (type === 'normal') {
            const winner = validCards[0];
            this.currentPlayerIndex = winner.playerIndex;
            this.currentRoundCards = []; 
            this.leadingSuit = null;
            return { winnerId: winner.playerId };
        } 
        else if (type === 'thulla') {
            const victimEntry = validCards[0];
            const victim = this.players[victimEntry.playerIndex];

            const pickup = this.currentRoundCards.map(c => c.card);
            victim.hand.push(...pickup);
            victim.cardCount = victim.hand.length;

            this.currentPlayerIndex = victimEntry.playerIndex; 
            this.currentRoundCards = [];
            this.leadingSuit = null;
            
            return { victimId: victim.id };
        }
    }

    advanceTurn() {
        let next = (this.currentPlayerIndex + 1) % this.players.length;
        while(!this.players[next].isActive) {
            next = (next + 1) % this.players.length;
        }
        this.currentPlayerIndex = next;
    }

    getGameState() {
        const currP = this.players[this.currentPlayerIndex];
        return {
            roomId: this.roomId,
            gameStarted: this.gameStarted,
            players: this.players.map(p => ({
                id: p.id,
                name: p.name,
                cardCount: p.cardCount,
                isActive: p.isActive,
                hand: p.hand 
            })),
            table: this.currentRoundCards.map(c => c.card),
            currentPlayerId: currP ? currP.id : null,
            leadingSuit: this.leadingSuit
        };
    }
}

const games = {};

io.on('connection', (socket) => {
    socket.on('create-game', ({ name }, cb) => {
        const id = Math.random().toString(36).substring(2, 7).toUpperCase();
        const game = new ThullaGame(id);
        game.addPlayer(socket.id, name);
        games[id] = game;
        socket.join(id); socket.gameId = id;
        cb({ success: true, gameId: id });
        io.to(id).emit('game-state', game.getGameState());
    });

    socket.on('join-game', ({ name, gameId }, cb) => {
        const game = games[gameId];
        if (!game) return cb({ success: false, message: "Game not found" });
        game.addPlayer(socket.id, name);
        socket.join(gameId); socket.gameId = gameId;
        cb({ success: true });
        io.to(gameId).emit('game-state', game.getGameState());
    });

    socket.on('start-game', (cb) => {
        const game = games[socket.gameId];
        if (game && game.startGame()) {
            io.to(socket.gameId).emit('game-started');
            io.to(socket.gameId).emit('game-state', game.getGameState());
            if (cb) cb({ success: true });
        } else {
            if (cb) cb({ success: false, message: "Cannot start" });
        }
    });

// --- BOTTOM OF server.js ---
    socket.on('play-card', ({ card }, cb) => {
        const game = games[socket.gameId];
        if (!game) return;

        const res = game.playCard(socket.id, card.id);
        if (!res.success) return cb(res);

        // 1. Emit Move (Animation)
        io.to(socket.gameId).emit('player-action', { 
            type: 'play', 
            playerId: socket.id, 
            card: res.card 
        });

        // 2. NEW: CHECK GAME OVER
        if (res.gameOver) {
            // Game is over! Wait 1 second for animation, then declare winner
            setTimeout(() => {
                const loser = game.players.find(p => p.isActive);
                io.to(socket.gameId).emit('game-over', { 
                    winners: game.winners,
                    loser: loser ? loser.name : "Everyone else"
                });
            }, 1000);
            return; // Stop round processing
        }

        // 3. Normal Round Logic (Only runs if game is NOT over)
        const roundStatus = game.checkRoundEnd();

        if (roundStatus.type === 'continue') {
            game.advanceTurn();
            io.to(socket.gameId).emit('game-state', game.getGameState());
        } else {
            game.roundClearing = true;
            io.to(socket.gameId).emit('game-state', game.getGameState());

            setTimeout(() => {
                const outcome = game.resolveRound(roundStatus.type);
                io.to(socket.gameId).emit('round-end', { 
                    type: roundStatus.type, 
                    ...outcome 
                });
                game.roundClearing = false;
                io.to(socket.gameId).emit('game-state', game.getGameState());
            }, 4000); 
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));