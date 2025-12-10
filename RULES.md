# 🎯 Thulla Card Game - Complete Rules

## Overview
Thulla is a multiplayer card game for 2-6 players where the objective is to be the first to get rid of all your cards. The last player holding cards loses.

## Setup

### Deck & Cards
- Use a standard deck of **52 playing cards**
- Card values (Ace is highest):
  - **Ace** = 14 (highest)
  - **King** = 13
  - **Queen** = 12
  - **Jack** = 11
  - **10** = 10
  - **9** = 9
  - **8** = 8
  - **7** = 7
  - **6** = 6
  - **5** = 5
  - **4** = 4
  - **3** = 3
  - **2** = 2 (lowest)

### Players
- **Minimum**: 2 players
- **Maximum**: 6 players
- **Optimal**: 3-5 players

### Dealing
1. Count total cards in deck (52)
2. Divide by number of players (integer division)
3. If remainder exists, remove low cards (2s and 3s) until distribution is equal
4. Deal cards one at a time to each player clockwise
5. All players should have exactly the same number of cards

**Example**: 3 players
- 52 ÷ 3 = 17 remainder 1
- Remove one card (e.g., 2 of clubs)
- Deal 51 cards: 17 cards to each player

## Game Start

### Finding the Starting Player
1. After dealing, scan all hands for the **Ace of Spades** 🂡
2. The player holding the Ace of Spades **must** start the game
3. Play passes **clockwise** (to the left)

### First Move (Special Rule)
- The starting player is **forced** to play the **Ace of Spades**
- They cannot play any other card
- This is the ONLY mandatory card in the entire game
- After this, normal rules apply

## Turn Structure

### A Standard Round Consists Of:

#### 1. Leading (First Player Plays)
- The player whose turn it is plays any card from their hand
- This card's **suit** becomes the **Leading Suit** for the round
- Example: Player plays "7 of Hearts" → Hearts is now the leading suit

#### 2. Following (Subsequent Players)
- Each player in turn must play a card of the **leading suit** if they have one
- If you have a card matching the leading suit, you **must** play it
- If you have multiple leading suit cards, you can choose which one
- **Exception**: See "Thulla" section below

#### 3. Round Conclusion (Clean Round)
**If everyone follows the leading suit:**
- All cards played in that round are removed from the game
- The player who played the **highest card of the leading suit** wins the trick
- That player **leads the next round** (plays first)
- Round ends, cards are cleared from table

## The Thulla (Cut) Mechanic - CRITICAL!

### What is a Thulla?
A **Thulla** (pronounced "tool-ah") happens when a player cannot follow the leading suit and plays a different suit instead.

### When Thulla Occurs
- A player is supposed to follow the leading suit
- They have cards in their hand
- BUT they don't have ANY cards of the leading suit
- They play a card of a different suit
- This card is called the "Thulla" or "Cut"

### What Happens
1. **Round stops immediately** - No other players play cards
2. The "Thulla" card is examined (but remains on table)
3. All cards currently on the table (of the leading suit) are examined
4. Find the **highest-value leading suit card** on the table
5. The player who played that high card **must pick up ALL cards** on the table
6. This includes the Thulla card they just played
7. That player adds all picked-up cards to their hand

### After Thulla
- The player who picked up cards **leads the next round**
- They play any card from their expanded hand
- Play continues normally

### Example Thulla Situation
```
Table:       Hearts (leading suit)
Player 1:    Plays 7♥ (Hearts 7)
Player 2:    Plays K♥ (King of Hearts)
Player 3:    Has no Hearts! Plays 4♦ (Diamond 4) - THULLA!

Resolution:
- Round stops
- Look at Hearts on table: 7♥ and K♥
- Highest is K♥ (King = 13 points)
- Player 2 played the K♥, so Player 2 picks up:
  - The 7♥
  - The K♥
  - The 4♦ (the Thulla)
- Player 2 now has 3 extra cards
- Player 2 leads the next round
```

## Winning & Losing

### Winning
- When you play your **last card**, you are immediately **"Safe"** and a **Winner**
- You stop playing further rounds
- Your cards are no longer involved
- You sit out the rest of the game

### The Game Continues
- With fewer players, rounds continue normally
- Players still take turns (but skip winners)
- Thulla rules still apply

### Losing
- The game ends when only **one player** remains with cards
- That final player is the **Loser**
- All other players are ranked by when they went out:
  - 1st out = Winner (🥇 Gold)
  - 2nd out = Second place (🥈 Silver)
  - 3rd out = Third place (🥉 Bronze)
  - Last out = Loser (🔴)

### Final Rankings
```
1. Winner #1 (first out)
2. Winner #2 (second out)
3. Winner #3 (third out)
4. Loser (last out)
```

## Rules Summary

### You MUST Do:
1. ✅ Follow the leading suit if you have it
2. ✅ Play a card on your turn (unless out of cards)
3. ✅ Play Ace of Spades first (starting player only)

### You CAN Do:
1. ✅ Play any card if you don't have the leading suit
2. ✅ Choose which leading suit card to play (if you have multiple)
3. ✅ Play any card when leading a round

### You CANNOT Do:
1. ❌ Play a different suit if you have the leading suit
2. ❌ Skip your turn (unless you have no cards left)
3. ❌ Pick up cards (except Thulla scenario)

## Common Questions

### Q: Can I play a card of the leading suit on purpose to lose it?
**A**: No, the Thulla mechanic only works when you DON'T have the leading suit. If you have it, you must play it.

### Q: What if everyone passes before it's my turn?
**A**: You still play your turn. Thulla only ends the round if someone plays a different suit. If everyone follows suit, the round ends normally.

### Q: Who decides the order of cards on the table?
**A**: The order they were played. The first card played is the lowest, the last is on top. This matters when determining the "highest" card of the leading suit.

### Q: Can I refuse to play the Ace of Spades at the start?
**A**: No, it's mandatory. The server will not allow any other card.

### Q: What if it's the last round and only 2 players left?
**A**: Same rules apply. One player leads, the other follows (or plays Thulla). Winner leads next round until someone goes out.

### Q: Can I take back a played card?
**A**: No, once played, the card cannot be returned.

## Strategy Tips

1. **Getting Rid of High Cards**: Try to lead with high cards to force others to play high cards, then pick up during Thulla
2. **Watching Other Hands**: Pay attention to how many cards other players have
3. **Saving Thulla Moments**: If you don't have the leading suit, choose which card to play wisely
4. **Predicting Thullas**: Remember who has which suits from previous rounds

## Scoring (Optional)
Some variations add scoring:
- 1 point for each card remaining when you go out
- Loser gets points for all remaining cards
- Play multiple rounds, lowest total score wins

(This implementation doesn't use scoring - just tracks who wins/loses)

## Game Variants

### Variant 1: No Forced Ace of Spades
- Start with random player or dealer button
- No special first-move rule

### Variant 2: Multiple Rounds
- Play best-of-3 or best-of-5 games
- Track cumulative wins

### Variant 3: Scoring System
- Assign points to cards (Ace=11, Face=10, etc.)
- Loser scores points for remaining cards

### Variant 4: Thulla Reversal
- Player who plays Thulla picks up cards instead
- Adds different strategy

(Our implementation uses classic Thulla rules)

## Cheating Prevention

The server prevents:
- Playing cards you don't have
- Playing out of turn
- Not following suit when required
- Playing wrong starting card

All moves are validated server-side!

---

**Now you're ready to play! May the cards be in your favor! 🎴**
