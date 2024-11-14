
//Récupération des travaux de l'api,
const apiUrlWorks = "http://localhost:5678/api/works"; 
console.log(apiUrlWorks)

async function getWorks() {
    try {
        const response = await fetch(apiUrlWorks);
        console.log("réponse reçue: ", response);
     
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status : ${response.status}`);
        }
        const works = await response.json();  // la méthode json() de l'objet response permet de transformer les données reçues en json et await permet d'attendre la fin de la transformation avant de continuer le code de la fonction 
        console.log("Travaux récupérés : ", works);
    return works;
    } catch (error){
        console.error("Erreur lors de la récupération des travaux : ", error);
        return [] 
    }
}
 //getWorks();


//  async function addWorksGallery () {
//     const works = await getWorks();  // récupération des travaux
//    // console.log("Travaux ajouter à la gallerie : ", works);
//     const WorksContainer = document.querySelector(".gallery");
//   WorksContainer.innerHTML = ''; // vide le container actuel dans le html avant d'ajouter les travaux

//     for (const work of works) {  // la boucle for..of me permet de parcourir le tableau works des travaux et de les ajouter dans le container de la gallerie
//         const workElement = document.createElement('figure');
//         workElement.className = 'work';
//         workElement.innerHTML =`
//         <img src="${work.imageUrl}" alt="${work.title}"/>
//         <figcaption>${work.title}</figcaption>
//         `;

//         WorksContainer.appendChild(workElement);  // ajout de workElement a son parent worksContainer
//     }
//     console.log("Tous les travaux ont été ajouté : ", WorksContainer);  
//  }
// //addWorksGallery();  



 function addWorksGallery (works) {
    console.log("Ajout des travaux à la gallerie : ", works);
    
    const WorksContainer = document.querySelector(".gallery");
      WorksContainer.innerHTML = ''; 

    for (let i = 0; i < works.length; i++) { 
        const work = works[i]; 
        console.log('travail actuel : ', work);
        
        const workElement = document.createElement('figure');
        workElement.className = 'work';
        workElement.innerHTML =`
        <img src="${work.imageUrl}" alt="${work.title}"/>
        <figcaption>${work.title}</figcaption>
        `;
         console.log('élément crée : ', workElement);
         
        WorksContainer.appendChild(workElement);  // ajout de workElement a son parent worksContainer
    }
    console.log("Tous les travaux ont été ajouté : ", WorksContainer);  
 }
// addWorksGallery()

 // extrait les catégories des travaux, je veux ensuite les afficher en fonction du bouton surlequel on click
function extractCategories(works) {               
    const categories = ["Tous", ...new Set(works.map(work =>work.category.name))];  // la méthode map() permet de parcourir le tableau works et de récupérer les catégories de chaque travail, la méthode Set() permet de créer un objet Set qui permet de stocker des valeurs uniques, et la méthode new Set() permet de créer un nouvel objet Set, et la méthode ... permet de déstructurer l'objet Set pour le transformer en tableau. donc ici je crée un tableau de catégories uniques en utilisant la méthode Set() et la méthode map() pour parcourir le tableau works et récupérer les catégories de chaque travail
        console.log("categories extraites fn : ", categories);
        return categories;
}

// fonctions qui filtre les travaux par catégorie,(création du container des bouttons, ) création des buttons, ajout de ceux-ci dans leur container, et ajout de l'écouteur d'événement sur chaque bouton pour filtrer les travaux par catégorie 

// function filterWorksByCategory(category, works) {
//     if (category === 'Appartements') {
//         return works.filter(work => work.category.name === 'Appartements');
//     } else if (category === 'Hotels & Restaurants') {
//         return works.filter(work => work.category.name === 'Hotels & Restaurants');
//     } else if (category === 'Objets') {
//         return works.filter(work => work.category.name === 'Objets');
//     } else {
//         return works
//     }                                    
// console.log('Travaux filtrés par catégorie : ', works);

//
function filterWorksByCategory(works, category) {
    if (category === 'Tous') {
        return works;
    }
return works.filter(work => work.category.name === category);
}

function createFilterButton(category, works) {  // fonction qui crée les boutons de filtre
    const button = document.createElement('button'); 
     button.textContent = category.name;
     button.className = 'btnFilter';
     button.id = `btn-${category.id}`;

    button.addEventListener('click', () => {  // j'ajoute un écouteur d'événement sur chaque bouton pour filtrer les travaux par catégorie quand le bouton est cliqué les travaux correspondant s'affichent dans la gallerie 
      console.log(`Bouton ${category.name} cliqué`);  // j'affiche dans la console le bouton cliqué
      const filteredWorks = filterWorksByCategory(works, category.name);   // je crée une variable filteredWorks qui contient les travaux filtrés par catégorie en utilisant la fonction filterWorksByCategories et en lui passant en paramètre les travaux et la catégorie qui sont récupérés dans le tableau works   category.name 
      addWorksGallery(filteredWorks);  // j'ajoute les travaux filtrés à la gallerie en utilisant la fonction addWorksGallery et en lui passant en paramètre les travaux filtrés ce qui permet de les afficher dans la gallerie 
    });
  console.log('bouton créé : ', button);  // affiche dans la console le bouton créé
  styleFilterButton(button);  // j'ajoute le style sur les boutons de filtre en utilisant la fonction styleFilterButton et en lui passant en paramètre le bouton  (!!!ne pas oublier d'appeler les fonctions si tu veux qu'elles fonctionent!!!)

  return button; 
 } // je retourne le bouton créé }
//ajout du style sur les buttons de filtre  (voir, s'il y a un moyen moins repétitif d'ajouter le style avec js ou peut être le mettre directement en css (dder a jean baptiste))
function styleFilterButton(button) {
    button.style.display = 'inline-block';
    button.style.width = '100px';
    button.style.height = '37px';
    button.style.border = '1px solid #1D6164';
    button.style.borderRadius = '60px';
    button.style.margin = '50px auto';
    button.style.padding = '9px, 30px';
    button.style.bacgroundColor = '#fff';
    button.style.fontFamily = 'Syne';
    button.style.weight = '700';
    button.style.fontSize = '16px';
    button.style.textAlign = 'center';
    button.style.color = '#1D6164';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease';

    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#1D6164';
        button.style.color = '#fff';
    });
     button.addEventListener('mouseout', () => {
        button.style.background = '#fff';
        button.style.color = '#1D6164';
    })
   return button;
}

async function initGallery() {
        console.log('Initialisation de la gallerie');
    const works = await getWorks();
    const categories = extractCategories(works);  // je crée une variable categories qui contient les catégories extraites des travaux en utilisant la fonction extractCategories 
       console.log('Catégories extraites : ', categories);

    const portefolioSection = document.getElementById('portfolio')  // ensuite je récupère les éléments depuis le dom et je ajoute le container et les btn-filter, et je les ajoute dans le dom 
    const h2Portefolio = document.querySelector('#portfolio h2');
    const galleryDiv = document.querySelector('.gallery');
    console.log('Eléments récupérés : ', portefolioSection, h2Portefolio);

    const buttonsFiltersContainer  = document.createElement('div');
    buttonsFiltersContainer.classList.add('btn-filter'); // comme sa classe est déjà dans le css je lui ajoute la class existante btn-filter (avec classLsit.add)
           
    //ensuite donc j'ajoute les boutons entre le h2 de portefolio et l'élement div qui a la classe gallery donc
      portefolioSection.insertBefore(buttonsFiltersContainer, galleryDiv);
        console.log('Container des boutons de filtre créé et inséré dans le DOM : ', buttonsFiltersContainer);
          

        // et donc ici je crée une boucle qui va parcourir le tableau des catégories et pour chaque catégorie je crée un bouton de filtre en utilisant la fonction createFliterButton et en lui passant en paramètre le nom de la catégorie, la catégorie et les travaux donc 
     for ( let i = 0; i < categories.length; i++) {
            const category = { name: categories[i]};  // je crée un objet category qui contient le nom de la catégorie (categories[i] repésentant chaque catégorie du tableau categories)
            console.log('Catégorie actuelle : ', category);

            const btnCategory = createFilterButton(category, works); // je crée un bouton de filtre en utilisant la fonction createFilterButton et en lui passant en paramètre la catégorie et les travaux 
            buttonsFiltersContainer.appendChild(btnCategory); // j'ajoute le bouton de filtre à son parent filtersContainer

         console.log(`Bouton ${category.name} crée et ajouté.`); // si le bouton est créé je l'affiche dans la console
        
        }

        addWorksGallery(works);
 }  
 

document.addEventListener('DOMContentLoaded', initGallery);  // j'ajoute un écouteur d'événement sur le document pour attendre que le contenu html soit chargé avant d'exécuter la fonction initGallery qui initialise la gallerie, 

console.log('Script executé jusqu\'au bout');  // j'affiche dans la console que le script a été exécuté jusqu'à la fin (et visiblement c'est la cas mais il y a un souci...)












