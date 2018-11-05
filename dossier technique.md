En terme de technologies utilisées voici le liste ainsi que leurs arguments respectifs :

	-Node JS ainsi qu'un moteur de template associé ( ejs, slm, pug ) : 
	Une technologie comme node js permet une interaction serveur-client et est donc plus sécurisé car le client à moins accès à certaines informations qui sont traitées par le serveur, d'autant que ce mode de fonctionnement ne gêne en aucun cas le déploiement d'une PWA ( sans offline ) et peut être pensé mobile-first. Le moteur de template viendra compléter en grande partie nodejs pour un traitement coté client, permettra aussi une surcouche de protection ( plus importante que dans une simple balise script ).

Node js permet donc l'utilisations de frameworks :

	-Express : Documentation importante, beaucoup d'utilisateurs, utile dans le cas où certains problèmes seraient rencontrées, peu être utilisé de paire avec
	-Express-session qui permettra une persistence de connexion de façon sécurisée, 
	-b-crypt pour un hashage reconnu sur les mots de passe à envoyer en BDD
	-blbl() pour les inputs et eviter les injections de script 
	-Framework css au choix ( Il peut autant être Bootstrap que Semantic [Interdiction d'utiliser Materialize]) avec une légère préference pour Semantic UI pour ses formes plus arrondis et agréables à l'oeil en général
	-Socket io pour le fil en vrac où les alumnis echangeront en direct , les messages seront supprimés chaque semaine pour ne pas surcharger les serveurs

En terme moins technique en ce qui concerne les performances / Accessiblités vu que nous avons déjà évoqué la sécurité :

Nous allons utiliser les outils à notre disposition pour évaluer et améliorer du mieux que l'on peut nos notes , Lighthouse par exemple, le but étant d'avoir un focus sur l'accessibilité en priorité.
Nous pouvons aussi prendre des décisions qui auront un impact sur l'environnement, je propose celle qui suit : 
Un fichier envoyé sur le serveur autre que CV sera maintenu pour une durée de 14jours et il sera supprimé, seul les CV seront conservés et dans un format Lien qui ramènera vers un CV en pdf via des tier (cjoint) nous prenons la responsabilité d'informer l'utilisateur une semaine avant la suppression de son lien sur le tiers afin qu'il le réactualise. Nous pouvons aussi supprimer les comptes de personnes qui seraient inactives depuis trop longtemps : 3Mois, 6Mois ? Et ainsi libérer les informations qui leurs seront liées.

Pour le coeur du projet :

J'ai donc pensé à une application qui se base sur le système réseau social Twitter :
Il y aura donc de manière segmenté les parties suivantes détaillées :
	-Un fil d'actualité en vrac , dans ce fil tout le monde peut discuter de tout et de rien, partager des memes, des vidéos drôles provenants d'autres sites par le biais de liens
	-Un espace profil pour chaque utilisateur, cet espace sera disponible à tout les utilisateurs de l'application , nous pouvons choisir de laisser visible ou non certaines informations pour les autres utilisateurs. Sur ce profil il y aura donc deux onglets de plus, un onglet CV depuis lequel on peut voir le Cv de la personne et el télécharger , et sur l'autre un arbre de compétence qui liste les compétences de la personne et donc une possibilité de témoigner des compétences de cette personne en y attribuant une note.
	-Un espace pour chaque necessité de la plateforme , un pour les offre de stages, offres d'emploi, faire sa promo de cv lors d'une recherche d'emploi.
	-Un espace création d'information, avec catégorie OBLIGATOIRE , partager son cv ? Faire une offre de stage ou en partager une ? etc..
	-Une interaction de message privé entre les différents utilisateurs 
	-La possibilité sur l'accueil de choisir sur quel fil nous voulons naviguer ? Celui où se trouve les offres de stages, le fil en vrac ? Tous sont accessibles.

Précision technique : Pour le partage de cv pour éviter le surstock d'information cette option permettra simplement d'ajouter un petit paragraphe pour se vendre et le lien du cv renverra sur le profil de la personne

Petit bonus : 
Gamification de l'application : 
	-Les utilisateurs auront des levels, l'expérience gagnée sera en fonction de l'activité sur le site, l'expérience sera cappé de manière journalière pour toutes les catégories sauf pour la partie "HELP" où les gens demandent de l'aide, il sera donc possible de gagner de l'expérience en continu si un utilisateur décide d'aider les autres utilisateurs pour motiver l'entraide.
