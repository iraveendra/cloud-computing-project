import express from "express";
import {
    test,
    auth,
    getLights,
    getLight,
    setLightStateById,
    powerOffAllLights,
    powerOnAllLights,
    setBrightnessById,
    setColorById,
    turnOnById,
    turnOffById
} from "../controllers/lifx.controller.js";

const router = express.Router();

router.route("/").get(test);
router.route("/auth").get(auth);
router.route("/lights").get(getLights);
router.route("/lights/:id").get(getLight);
router.route("/lights/:id/state").put(setLightStateById);
router.route("/lights/power/off").put(powerOffAllLights);
router.route("/lights/power/on").put(powerOnAllLights);
router.route("/lights/:id/brightness").put(setBrightnessById);
router.route("/lights/:id/color").put(setColorById);
router.route("/lights/:id/turnon").put(turnOnById);
router.route("/lights/:id/turnoff").put(turnOffById);

export default router;
