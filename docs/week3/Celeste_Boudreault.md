# Revue du code de William Villeneuve par Céleste Boudreault (Semaine 3)

## Commentaires généraux sur le code

- Le code est lisible et relativement facile à comprendre comparé à ce qu'il était par le passé.
- William a beaucoup aidé avec la gestion du projet sur github et a été indispensable pour le nettoyage du code.
- Il a aussi beaucoup aidé à réparer l'affichage de plusieurs composants qui étaient problématiques.

## GameService.ts

William a rajouté la fonction postRanking pour pouvoir enfin rajouter des joueurs au classement, ce qui était la dernière partie des récits utilisateurs à terminer. Le code est assez simple et fonctionne très bien.

```typescript
async function postRanking (name : string, score : number) {
  const dataSent = {
    name: name,
    score: score
  };
  const { data } = await axios.post(`${API_URL}/ranking`, dataSent)
  return data
}
```

## GameEnemy.vue

William a réparé le code d'affichage de l'information de l'ennemi en modifiant la façon dont le programme allait chercher l'expérience. Une modification assez simple, mais très utile, puisqu'elle fonctionne !!!

```typescript
let ennemyExperienceName = setupExperienceName(props.ennemyExperience!); // [!code --]
const ennemyExperienceName = computed(() => { // [!code ++]
  return setupExperienceName(props.ennemyExperience ?? 0); // [!code ++]
}); // [!code ++]
```

William a aussi beaucoup aidé avec la base du CSS dans les composants, dont GameEnemy et tous les autres.

## Mot de la fin

Malgré les difficultées au début du travail, nous avons réussi à le compléter dans le délai attendu. La communication était beaucoup plus complexe étant dans une équipe composée de 3 membres, mais ce défi a été surmonté. Notre code est fonctionel et nous avons bien travaillé ensemble, je suis fière de nous tous !
