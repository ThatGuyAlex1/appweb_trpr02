# Revue du code de Céleste Boudreault par William Villeneuve de la semaine 1

## Commentaires sur l'ensemble du code

- Le code en général suit bien les normes Clean Code en ce qui concerne les noms significatifs et l'indentation du code.
- Les commentaires présents sont pertinents.

## Homeview

La page principale s'affiche, mais le formulaire n'envoie pas correctement les informations à la page du jeu.

Il faudra trouver un moyen d'envoyer les informations correctement avec le formulaire.

```template{}
<form action="game"  method="get">
    <label for="name">Player name :</label><br>
    <input type="text" id="name" name="name" value=""><br>
    <label for="ship-select">Choose a ship :</label><br>
    <select name="ships" id="ship-select"><br>
        <option v-for="ship in ships" v-bind:key="ship.id">
            {{ ship.name }}
        </option>
    </select><br><br>
    <input type="submit" class="btn btn-primary mb-2" value="Start your adventure">
</form>
```

## Progression du projet

Le projet avance bien, mais il y nous reste encore quelque soucis en ce qui concerne la communication et la réparation des taches. Outre cela, je suis confiant de notre équipe.
