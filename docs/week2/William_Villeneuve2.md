# Revue du code d'Alexandre St-Amant par William Villeneuve de la semaine 2

## Commentaires sur l'ensemble du code

- Le code en général suit bien les normes Clean Code en ce qui concerne les noms significatifs et l'indentation du code.
- Les commentaires présents sont pertinents.

## GameView et GameActions

C'est Alex qui a codé la logique du jeu.

## GameView

Le vaisseau du joueur et les ennemies sont bien initialisés et les erreurs sont gérées et c'est là que les méthodes qui mettent à jour le jeu se trouvent. Ces informations sont ensuite envoyées dans les componants des différentes parties du jeu.

Le seul commentaire constructif que je peux faire est que dans `fetchEnnemies()` il y a des chiffres "magiques" tels que les indices et la longueur sans commentaires explicatifs.

## GameView

```typescript
async function fetchEnnemies(){
  try {
  const gameResponse: Character[] = await gameService.getCharacters();
  const selectedEnnemies: Character[] = [];
  //aidé par chatGPT
  const indices: number[] = [];
    while (indices.length < 5) {
      const randomIndex = Math.floor(Math.random() * gameResponse.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
        selectedEnnemies.push(gameResponse[randomIndex]);
      }
    }
  ennemiesRef.value = selectedEnnemies;
  } catch (error) {
  errorMessage = 'Error fetching ennemies:' + error
  }
}
```

## GameActions

C'est là que la logique du jeu se trouve. Il y a une séparation claire des responsabilités et les émissions d'événements sont utilisées afin que **GameView** appelle les fonctions qui met à jour l'état du jeu.

Par contre cela veut dire que le composant **GameActions.vue** a beaucoup de responsabilités et il serait pertinent d'essayer de déplacé certain de ses responsabilités dans les autres composants.

## Progression du projet

Le projet avance bien. Ils restent peu de choses à faire, mais ce qui nous manque surtout c'est les tests.
