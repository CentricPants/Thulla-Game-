#  Thulla - Multiplayer Card Game

A fully functional, multiplayer card game for 2-6 players that runs on a local server (LAN). Thulla is a fast-paced card game where players try to run out of cards first.

##  Game Rules

### Setup
- **Players**: 2-6
- **Deck**: Standard 52-card deck
- **Distribution**: All cards are dealt equally. If not perfectly divisible, low-ranking cards (2s and 3s) are removed.
- **Card Ranking**: Ace (High) > K > Q > J > 10 > ... > 2 (Low)

### First Round
- The player holding the **Ace of Spades** must start the game.
- They are **forced** to play the Ace of Spades on their first turn.

### General Turn Logic
- **Leading**: The first player of a round throws a card, setting the Leading Suit.
- **Following**: Subsequent players must play a card of the Leading Suit if they have one.
- **Clean Round**: If all players follow suit (or run out of cards and pass), the cards are cleared and the highest card wins the trick.
- **Next Leader**: The winner of the trick leads the next round.

### The "Thulla" (Cut) Mechanic
- If a player cannot follow the Leading Suit, they play a card of a different suit.
- The round **stops immediately** - no more players play.
- The player who played the **Highest Card of the Leading Suit** picks up **ALL cards** currently on the table.
- That player leads the next round.

### Win/Loss Condition
- **Winning**: As soon as a player plays their last card, they are "Safe/Winner" and stop playing.
- **Continuing**: The game continues with remaining players.
- **Game End**: The game ends when only one player remains with cards. That player is the Loser.

##  Getting Started

### Prerequisites
- Node.js (v12 or higher)
- npm

### Installation & Running

1. Navigate to the project directory:
```bash
cd Game
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

### Access on LAN
To play on your local network, use your computer's IP address instead of `localhost`:
```
http://<your-ip>:3000
```

Find your IP address:
- **Windows**: `ipconfig` in PowerShell, look for IPv4 Address
- **Mac/Linux**: `ifconfig` or `hostname -I`

##  How to Play

### Host Setup
1. Open the game on your computer
2. Click "Host Game"
3. Enter your name
4. Share the Game ID with other players

### Joining
1. Open the game in a browser
2. Click "Join Game"
3. Enter your name and the Game ID from the host
4. Wait for the host to start the game

### During Game
1. Cards appear in your hand at the bottom
2. When it's your turn, click a card to play it
3. Cards animate to the center table
4. Hover over the table pile to see all played cards
5. Follow the Thulla rules!

##  Project Structure

```
Game/
├── server.js                 # Node.js/Express/Socket.io backend
├── package.json             # Dependencies
├── public/
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Styles + animations
│   ├── client.js           # Frontend logic
│   └── *.png               # Card images (52 cards + jokers)
└── png_96_dpi/             # Original card image source
```

##  Technical Architecture

### Backend (server.js)
- **Express.js**: Web server
- **Socket.io**: Real-time game state synchronization
- **ThullaGame Class**: Core game logic engine
  - Card deck creation and shuffling
  - Deal cards equally to players
  - Track whose turn it is
  - Validate card plays
  - Handle Thulla mechanics
  - Track winners/losers

### Frontend (client.js)
- **Lobby System**: Create/join games
- **Waiting Screen**: Show players, start button
- **Game Screen**: Render opponent info, table, hand
- **Card Animations**: Throw, flip, land, pickup
- **Socket.io Client**: Sync with server state

### Styling (style.css)
- Dark green poker table theme
- 3D card flip animations
- Card throw animation (arc, flip, land)
- Pile hover fan-out effect
- Responsive design

##  Animation Features

1. **Throw Animation**: Cards fly from hand to table center, flipping mid-air
2. **Land Animation**: Cards land on the table with random rotation
3. **Pile Peek**: Hover over the table to see cards fan out horizontally
4. **Pickup Animation**: When picking up cards (Thulla), they animate away
5. **Opponent Status**: Opponent cards show count, current turn indicator, winner status

##  Game Logic Highlights

### Ace of Spades Enforcement
- Server scans all hands to find who has the Ace of Spades
- On first turn, server validates that ONLY the Ace of Spades can be played
- After that, normal rules apply

### Thulla Detection
- After each card is played, server checks if it matches the leading suit
- If not, it's a Thulla
- Server immediately calculates the highest card and penalty
- All cards go to the player with the highest leading suit card

### Equal Distribution
- If 52 cards don't divide equally by player count:
  - Calculate cards per player: 52 / playerCount (integer division)
  - Remove lowest cards (2s and 3s) to fit
  - Deal remaining cards equally

### State Synchronization
- Server is the "source of truth"
- All state changes go through server validation
- All clients receive updated game state
- Prevents cheating (playing multiple cards, playing others' cards, etc.)

##  Browser Compatibility
- Chrome/Edge (Recommended)
- Firefox
- Safari

##  Troubleshooting

### Can't connect to server
- Make sure server is running: `npm start`
- Check firewall settings (port 3000)
- Use correct IP address for LAN play

### Cards not showing
- Check that PNG files are in `public/` folder
- Verify file names match (e.g., `spades_ace.png`)

### Game freezes
- Disconnect and reconnect
- Refresh browser page
- Restart server

## Notes

- The game handles 2-6 players
- Each player gets an equal number of cards
- The game is turn-based with real-time synchronization
- Animations are smooth and responsive
- All game state is validated on the server

##  Future Enhancements

Possible features for future versions:
- Chat/emotes during game
- Replay save/export
- Player avatars
- Tournament mode
- Mobile app version

---

**Enjoy the game!**
