import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './app.scss';
import Fridge from './components/Fridge.jsx';
import Wasted from './components/Wasted.jsx';
import Tasted from './components/Tasted.jsx';
import { dummyData } from './dummyData';
import AddFoodModal from './components/AddFoodModal.jsx';

function App() {

  const [fridge, setFridge] = useState([]); // returns an array [fride, setFridge] = [pieceOfState, functionForUPdatingThatPieceOfState]
  const [wasted, setWasted] = useState([]);
  const [tasted, setTasted] = useState([]);
  const [addFoodModalDisplay, setAddFoodModalDisplay] = useState(false);


  const createNewFood = (name, quantity, price, datePurchased, useByDate) => {
    return {
      name: name,
      quanity: quantity,
      price: price,
      datePurchased, 
      useByDate
    }
  }

  const handleAddNewFood = (newFood) => {
    const newFridge = [...fridge, newFood];
    setFridge(newFridge);
  }
  
  const toggleAddFoodModalDisplay = () => {
    setAddFoodModalDisplay(!addFoodModalDisplay);
  }


  //componenDidMount
    // run this function once when the componenet mounts
  //componenetDidUpdate
    // run this function every time there's an update to the component
  //componentWillUnmount

  useEffect(() => {
    // fetch('/wasted')
    //   .then(res => res.json())
    //   .then(stuff => console.log(stuff));
    // get /user --> everything
    // post /user --> 
    // username in body
    const {
      username,
      fridge,
      wasted,
      tasted,
    } = dummyData;

    setFridge(fridge);
    setWasted(wasted);
    setTasted(tasted);

  }, [])


  return (
    <div className="test">
      Hello World
      <Link to="/wasted">Wasted</Link>
      <Link to="/tasted">Tasted</Link>
      <Link to="/fridge">Fridge</Link>

      <Switch>
        <Route exact path="/fridge">
          <div>fridge</div>
          <Fridge 
            fridge={fridge}
            toggleAddFoodModalDisplay={toggleAddFoodModalDisplay}
          />

        </Route>
        <Route exact path="/wasted">
          <div>Wasted</div>
          <Wasted   
            wasted={wasted}
          />
        </Route>
        <Route exact path="/tasted">
          <div>Tasted</div>
          <Tasted tasted = {tasted}/>
        </Route>
      </Switch>
      <AddFoodModal 
        addFoodModalDisplay={addFoodModalDisplay}
        toggleAddFoodModalDisplay={toggleAddFoodModalDisplay}
      />
    </div>
  )
}

export default App


