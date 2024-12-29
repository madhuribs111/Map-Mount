import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from "react-map-gl";
import Star from "@mui/icons-material/Star";
import "./App.css";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  //const markerRef = useRef();
  const myStorage  = window.localStorage;
  const [viewport, setViewport] = useState({
    longitude: 2.2,
    latitude: 48,
    zoom: 6,
  });
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  // const [showPopup, setShowPopup] = useState(true);
  const [currentPlaceId, setCurrentPlaceId] = useState();
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [star, setStar] = useState(0);
  const [newPlace, setNewPlace] = useState(null);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("https://map-mount.vercel.app/pins/get");
        console.log(res.data);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    console.log(e);
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("https://map-mount.vercel.app/pins/create", newPin,{ withCredentials: true });
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout =(e)=>{
    e.preventDefault();
myStorage.removeItem("user");
setCurrentUser(null)
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="App">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onMove={(event) => setViewport(event.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ width: "100%", height: "100%" }} // Ensure map fills the div
        transitionDuration="200"
        onDblClick={currentUser && handleAddClick}
      >
        {pins.map((p) => (
          <>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 8,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              ></Room>
            </Marker>

            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label className="label">Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label className="label">Review</label>
                  <p className="desc">{p.desc}</p>
                  <label className="label">Rating </label>
                  <div className="stars">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>
                  <label className="label">Information</label>
                  <span className="username">
                    <i>
                      Created by <b>{p.username}</b>
                    </i>
                  </span>
                  <span className="date">
                    <i>{format(p.createdAt)}</i>
                  </span>
           

                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              longitude={newPlace.long}
              latitude={newPlace.lat}
              anchor="left"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label className="label">Title</label>
                  <input
                    placeholder="Enter a title"
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                  <label className="label">Review</label>
                  <textarea
                    placeholder="Say something about this place"
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                  <label className="label">Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
        {currentUser ? (
          <button className="button logout" onClick= {handleLogout}>Log out</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && (
          <Register setShowRegister={setShowRegister}></Register>
        )}
        {showLogin && (
          <Login setCurrentUser={setCurrentUser} setShowLogin={setShowLogin} myStorage={myStorage}/>
        )}
      </ReactMapGL>
    </div>
  );
}

export { App };
