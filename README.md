# Steam Viewer 

## Live Demo: https://steam-viewer.netlify.app/

<p align='center'>
  <img src="https://github.com/user-attachments/assets/a96bbfbc-e378-4863-a673-378a1f47ba23" alt="Someones CS Source achievements" height=500px>
   <img src="https://github.com/user-attachments/assets/45ce66ff-e568-4587-843a-836d7c8a98df" alt="Team Fortress 2 News" height=500px>
</p>


## An extremely basic frontend for interacting with the Valve Steam API

This is the frontend for the Steam Viewer project, this project relies on 3 other projects:

- Steam Viewer Backend:
  - https://github.com/Dot-Rhs/steam-viewer-backend

- Steam Viewer Player Microservice
  - https://github.com/Dot-Rhs/steam-viewer-player-service
 
- Steam Viewer Games Microservice
  - https://github.com/Dot-Rhs/steam-viewer-games-service
 
(I'm currently resolving a Docker issue preventing the services from communicating, so for now, the services will have to be run manually)

## Runnning the application

### Manually
Open each repository in a separate terminal:
- You can install each repo's dependencies with the standard ``npm i``.
- Steam Viewer Frontend can be started with ``npm run dev`` or ``npm run preview``.
- The other 3 server and service projects can all be started with ``npm run server``.


### With Docker
~~All 4 repo's should be in the same parent folder, as such, you shouldn't need to make any changes. If you have the repo's in different folders, or most importantly, not in the same parent folder, please adjust the context path in the docker-compose.yml.
In the terminal, from the steamviewer folder, run the following ``docker-compose up --build``~~

## Using the application
As I stated, this is a very basic application, and if you don't have access to a Steam player ID or know any of the millions of Steam application ID's then you're going to be a bit stumped as to what this is. 
If you're a Steam user, you can find your player account number in your account settings in the top left.

### Some app ID's
- 440: Team Fortress 2
- 70: Half Life
- 10: Counter-Strike
- 300: DoD Source
- 500: Left 4 Dead


Well... Have... fun?


<p align='center'>
  <img src="https://github.com/user-attachments/assets/4582434d-58fd-43eb-a7e3-e9e40f218c17" alt="Counter Strike 2 Information" height=500px>
  <img src="https://github.com/user-attachments/assets/b36f73d7-0bf3-4ed5-8134-67492ddb1240" alt="Some crusty old guy steam profile" height=500px>
</p>
