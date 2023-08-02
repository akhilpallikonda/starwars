import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useState, useEffect } from 'react';

function Spinner(){
  return <div className={styles.loader}></div>
}

function TrophyIcon(){
  return <img className={styles.icon} width="24" height="24" src="https://img.icons8.com/color/96/trophy.png" alt="trophy"/>
}

function Starship({index,starship, maxFilms}){
  return <li key={"title-" + index} className={styles.card}>
    <h3> {starship.name}  <span> {maxFilms==starship.films.length &&  <TrophyIcon/> } </span> </h3>
    <div className={styles.rowgrid}>
    <div className={styles.grid}> <div>Model </div> <div>{starship.model} </div></div>
    <div className={styles.grid}> <div>Number of films </div> <div>{starship.films.length} </div></div>
    </div>
    </li>
}

export default function Home() {
  const [starships, setStarships] = useState([]);
  const [maxFilms,setMaxFilms] = useState(0);
  const [loading,setLoading] = useState(false);

  const url="https://swapi.dev/api/starships/";
  
  const getStarships = async () => {
    let response = await fetch(url);
    let data = await response.json();
    const filteredStarships = data.results.filter((item) => parseInt(item.crew) != NaN && parseInt(item.crew) < 10).sort((a,d)=> d-a);
    setStarships(filteredStarships);
    const max = Math.max(...filteredStarships.map(o => o.films.length), 0);
    setMaxFilms(max);
    setLoading(false);
  }
  const handleClick = () =>{
    setLoading(true);
    getStarships();
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Starwars</title>
        <link rel="icon" href="https://img.icons8.com/ios/50/star-wars.png" />
      </Head>

      <main>
        <img src="/starwars.svg" alt="Starwars" className={styles.logo} />
        <div className={styles.title}>
          Sample React JS project using SWAPI API
        </div>
        <h2>
        Results are filtered to starships with a crew size lesser than 10 and sorted by crew size
        </h2>
        <p className={styles.description}>
          
        The star ship that has featured in the most films will show a <span> <img className={styles.icon} width="48" height="48" src="https://img.icons8.com/color/48/trophy.png" alt="trophy"/></span>
        </p>
        <button className={styles.fetchButton} onClick={handleClick}> Get Starships</button>
        { loading ? <Spinner/> :        
        <ul className={styles.grid}>
          {starships.map((starship, index) => {
            return (
              <Starship index={index} starship={starship} maxFilms={maxFilms}/>
            )
          })}
        </ul>}
      </main>
    </div>
  )
}
