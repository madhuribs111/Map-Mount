import Pin from "../models/Pin.js";

export const createPin = async (req, res) => {
  const newPin = new Pin({
    username: req.body.username,
    title: req.body.title,
    desc: req.body.desc,
    lat: req.body.lat,
    long: req.body.long,
  });
  try {
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPins = async (req,res)=>{
    try{
const foundPins = await Pin.find();
if(!foundPins){
    return res.status(404).json("Pins not found");
}
res.status(200).json(foundPins);
    }catch(err){
        res.status(500).json(err);
    }
}