import React, { useEffect, useReducer, useState } from 'react'
// import './Homecss.css';
// import styles from './Homecss.module.css';
import styles from './Stylesmodule/Homecss.module.css';
import Data from '../Data.json'
import Productitem from './Productitem';

function Home({ searchQuery }) {
  let ref = useReducer(null)
  const [next, setnext] = useState(0)
  const handleNext = () => {
    setnext((previouValue) => {
      if (previouValue == Data.length - 1) {
        return 0
      }
      return previouValue + 1
    })
  }
  const handlePre = () => {
    if (next == 0) {
      setnext(Data.length - 1)
    } else {
      setnext(next - 1)
    }
  }
  useEffect(() => {
    ref.current = setInterval(handleNext, 2000);
    return (() => {
      clearInterval(ref.current)
    })
  })
  return <>

    {/* <div className={styles.containers} onMouseEnter={() => clearInterval(ref.current)} onMouseLeave={() => ref.current = setInterval(handleNext, 2000)}>
      <div className={styles['left-btn']}>
        <button className='' onClick={handlePre}>{"<"}</button>
      </div>
      <img src={Data[next].imgpath} alt="" className={styles['container-img']} />
      <div className={styles['right-btn']}>
        <button className='' onClick={handleNext}>{">"}</button>
      </div>
    </div> */}
    <div className='text-center'>
      <span className='text-2xl font-bebas'>New Collection</span>
      <h1 class="__className_6a3ae9 text-6xl text-white font-bebas md:font-bebas">BRING IT ON</h1>
    </div>

<Productitem searchQuery={searchQuery}/>
  </>
}

export default Home