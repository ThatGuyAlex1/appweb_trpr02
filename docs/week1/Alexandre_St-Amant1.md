# Revue du code de William par Alexandre St-Amant (semaine 1)

## Commentaires sur l'ensemble du code

- Beaucoup de commentaires sont restant dans le code qui aurait dû être suprimé **avant** la remise. 
- Il n'y pas a de dossier *doc* qui contient la grille de correction. 
- Rien est présent pour afficher les erreurs a l'utilisateur. 

## songPlayer + (les trois fichiers sous songPlayer) + songInfos

Non complet, Ces fichiers n'affiche pas les informations demandé, ces fichiers manque principalement l'utilisation de [props](https://vuejs.org/guide/components/props.html)

## songsList

*songs* et *currentSong* ne sont **pas** typé. Plusieurs façons possible existe de les *typé*. Par exemple *songs* pourait être typé comme cela: 

```ts{}
let songs: { [key: string]: string }[] = await songsService.getSongs();
```

La technique utilisé pour afficher les musiques est intéressante mais il manque l'utilation de *uv* dans le template:

```template{}
<ul>
  <li v-for="song of songs" id="songList">
    <button @click="$emit('getSong',song)" class="btn btn-secondary">
      {{ song.songName + " - " + song.artistName}}
    </button>
  </li>
</ul>
```