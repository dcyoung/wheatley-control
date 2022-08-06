import { Mechanism, Simulation, Utils } from 'stewart-platform-simulator';
import * as THREE from 'three';
import { Config } from '../src';
import { getServoDebugString } from './utils';

const targetUp = new THREE.Vector3(0, 25, 100);
const targetDown = new THREE.Vector3(0, -25, 100);

const clock = new THREE.Clock();
const servoOffsetAngles = Config.DEFAULT_SIM_TO_BOT_SERVO_OFFSET_ANGLES;
const mech = new Mechanism.Mechanism3Dof(Config.DEFAULT_MECHANISM_PARAMS);
const sim = new Simulation.HeadlessSimulation(mech);

function updateSimForTrackedTarget(targetPosition) {
  sim.setTargetWorldPosition(targetPosition);
  sim.animateMechanism();
}

console.log(getServoDebugString(mech, servoOffsetAngles));
sim.setSimulationMode(Simulation.SimulationMode.TRACK_TARGET);
const interval = setInterval(function () {
  // Move target up and down
  const targetPosition = Utils.sinBetweenVectors(
    targetUp,
    targetDown,
    clock.getElapsedTime(),
    1.5
  );

  // Update the sim
  updateSimForTrackedTarget(targetPosition);

  // Debug
  console.log(getServoDebugString(mech, servoOffsetAngles));
}, 200);
