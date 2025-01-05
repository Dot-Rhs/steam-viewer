# Steam Viewer 
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
