import * as j5 from 'johnny-five';
import { Mechanism, Simulation, Utils } from 'stewart-platform-simulator';
import * as THREE from 'three';
import { Bot, Config } from '../src';

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

const board = new j5.Board({
  port: 'COM5',
});

board.on('ready', () => {
  const bot = new Bot.Bot();

  // Track Target
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
    // console.log(getServoDebugString());

    // Update the bot's stewart platform
    bot.stewartPlatform.applyMechanismState(mech, servoOffsetAngles);
  }, 10);
});
