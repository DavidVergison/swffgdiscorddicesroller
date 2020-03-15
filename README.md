## CONSTRUCTION
```
docker build -t swffgdices:latest .
```
## UTILISATION
1) ajouter les images du répertoire "dices" aux emoji du serveur
2) lancer le conteneur
```
docker run -d \
  --name diceroller \
  --env TOKEN=discord-bot-token \
  -P \
  swffgdices:latest
```
3) pour voir les dés disponibles, taper :
```
!D
```
4) pour déclencher un jet, taper (par exemple) :
```
!D:green::green::yellow::purple::purple::blue::white::white:
```