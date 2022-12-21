Here is my custom pool-game using only js.

Run this command in terminal first: npm install sweetalert --save

\===================================RULES===================================/
1.Game is for two players.
2.Players have the following properties:
	1.Health = 3;
	2.Attempts = 5 (at the very beginning);
	3.Score = 0 (at the beginning of the round);
	4.Player number = first or second player.
3. There are 1 main (white ball) and 6 balls dif colors.
4. Try to drive the balls into the holes using white one.
5. Each ur white ball kick is -1 to attempt.
6. White ball into the holes is -1 to health.
7. Any other ball in hole is +1 to score.
8. Round finished if:
	1.There are no more attempts for both players;
	2.There are no health for one of the players;
	3.All balls are in holes, then checks the score.
9. After round ended, starts new one, but now attempts is -1 for both.
10. There are 3 round, and minimum of the attemps is equal to 3.
11. After game restart at the first round.
\================================Game control================================/
Stick is following ur cursor, so use it to give an direction to main ball.
Hold down left button on mouse to increase power.
Unpress the left button on mouse to make a shot.

\========================Have a good time, good luck!=========================/
